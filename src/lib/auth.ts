import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, getServerSession } from "next-auth";
import { compare } from "bcryptjs";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "./prisma";
import { SigninSchema } from "@/schemas/SigninSchema";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET ?? process.env.NEXT_AUTH_SECRET,

    pages: {
        signIn: "/auth/sign-in",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@mail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const validation = SigninSchema.safeParse(credentials);
                if (!validation.success) {
                    return null;
                }

                const { email, password } = credentials as z.infer<typeof SigninSchema>;
                const normalizedEmail = email.trim().toLowerCase();

                const user = await prisma.user.findFirst({
                    where: {
                        email: {
                            equals: normalizedEmail,
                            mode: "insensitive",
                        },
                    },
                });

                if (!user) return null;

                const isPasswordCorrect = await compare(password, user.password);
                if (!isPasswordCorrect) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    subscriptionStatus: user.subscriptionStatus,
                } satisfies { id: string; email: string; name: string | null; role?: string; subscriptionStatus?: string };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.subscriptionStatus = user.subscriptionStatus;
            }

            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                name: token.name as string,
                email: token.email as string,
                role: token.role as string | undefined,
                subscriptionStatus: token.subscriptionStatus as string | undefined,
            };

            return session;
        },
    },
};

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions);
}