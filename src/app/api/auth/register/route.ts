import prisma from "@/lib/prisma";
import { SignupSchema } from "@/schemas/SignupSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = SignupSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 422 }
            );
        }

        const { email, name, password, confirmPassword } = parsed.data;
        const normalizedEmail = email.trim().toLowerCase();

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: normalizedEmail,
                name,
                password: hashedPassword,
                role: "USER",
                subscriptionStatus: "INACTIVE",
            },
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
