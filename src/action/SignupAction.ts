/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { SignupSchema } from "@/schemas/SignupSchema";
import bcrypt from "bcryptjs";

export async function SignupAction(email: string, name: string, password: string, confirmPassword: string) {
    try {
        const parsedBody = SignupSchema.safeParse({ email, name, password, confirmPassword });
        if (!parsedBody.success) {
            throw new Error("Validation failed");
        }

        const { email: validatedEmail, name: validatedName, password: validatedPassword, confirmPassword: validatedConfirmPassword } = parsedBody.data;

        if (validatedPassword !== validatedConfirmPassword) {
            throw new Error("Passwords do not match");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: validatedEmail },
        });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(validatedPassword, 10);

        const newUser = await prisma.user.create({
            data: {
                email: validatedEmail,
                name: validatedName,
                password: hashedPassword,
                subscriptionStatus: "INACTIVE",
                role: "USER",
            },
        });

        return newUser;


    } catch (error: any) {
        throw new Error("An error occurred during signup: " + error.message);
    }
}