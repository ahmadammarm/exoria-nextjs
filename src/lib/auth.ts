/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { compare } from "bcryptjs";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "./prisma";
import { SigninSchema } from "@/schemas/SigninSchema";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXT_AUTH_SECRET,

    pages: {
        signIn: "/sign-in",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@mail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) throw new Error("Credentials undefined");

                const validation = SigninSchema.safeParse(credentials);
                if (!validation.success) {
                    throw new Error("Invalid email or password");
                }

                const { email, password } = credentials as z.infer<typeof SigninSchema>;

                const user = await prisma.user.findUnique({ where: { email } });

                if (!user) throw new Error("Incorrect email");

                const isPasswordCorrect = await compare(password, user.password);
                if (!isPasswordCorrect) throw new Error("Incorrect password");

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                } satisfies { id: string; email: string; name: string | null; role?: string };
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
            }

            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                name: token.name as string,
                email: token.email as string,
                role: token.role as string | undefined,
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