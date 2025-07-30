/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { CreateUser } from "@/schemas/UsersAction";
import bcrypt from "bcryptjs";

export async function UsersAction(email: string, name: string, password: string) {
    try {
        const parsedBody = CreateUser.safeParse({ email, name, password });
        if (!parsedBody.success) {
            throw new Error("Validation failed");
        }

        const { email: validatedEmail, name: validatedName, password: validatedPassword } = parsedBody.data;

        const existingUser = await prisma.user.findUnique({
            where: { email: validatedEmail },
        });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(validatedPassword, 10);

        await prisma.user.create({
            data: {
                email: validatedEmail,
                name: validatedName,
                password: hashedPassword,
                subscriptionStatus: "INACTIVE",
                role: "USER",
            },
        });

        return { success: true };

    } catch (error: any) {
        throw new Error("An error occurred during user creation: " + error.message);
    }
}