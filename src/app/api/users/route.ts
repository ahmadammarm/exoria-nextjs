/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateUser } from "@/schemas/CreateUserSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const session = await auth();
    const user = session?.user;

    if (user?.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden - Admin access required" }, { status: 403 });
    }

    try {
        const users = await prisma.user.findMany();

        if (!users || users.length === 0) {
            return NextResponse.json({ message: "No users found", data: [] }, { status: 200 });
        }

        return NextResponse.json({ message: "Users fetched successfully", data: users }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: error.message || "An error occurred while fetching users" }, { status: 500 });
    }

}

export async function POST(request: NextRequest) {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NextResponse.json({ message: "Unauthorized - Please login" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden - Admin access required" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const parsedBody = CreateUser.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({ message: "Validation failed", errors: parsedBody.error.issues }, { status: 400 });
        }

        const { email, name, password } = parsedBody.data;

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

    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: error.message || "An error occurred while creating the user" }, { status: 500 });
    }
}