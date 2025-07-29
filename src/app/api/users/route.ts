/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
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