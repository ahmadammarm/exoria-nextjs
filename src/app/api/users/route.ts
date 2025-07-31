/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateUser } from "@/schemas/CreateUserSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const session = await auth();
    const user = session?.user;

    if (user?.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const users = await prisma.user.findMany();

        if (!users) {
            return NextResponse.json({ error: "No users found" }, { status: 404 });
        }

        return NextResponse.json(users);

    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "An error occurred while fetching users" }, { status: 500 });
    }

}

export async function POST(request: NextRequest) {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const parsedBody = CreateUser.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({ error: "Validation failed" }, { status: 400 });
        }

        const { email, name, password } = parsedBody.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                subscriptionStatus: "INACTIVE",
                role: "USER",
            },
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "An error occurred while creating the user" }, { status: 500 });
    }
}