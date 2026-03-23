/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id: userId } = await context.params;

    try {
        const session = await auth();
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ message: "Unauthorized - Please login" }, { status: 401 });
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json({ message: "Forbidden - Admin access required" }, { status: 403 });
        }

        const userData = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!userData) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User fetched successfully", data: userData }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" }, { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id: userId } = await context.params;

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
        const { name, email, role, subscriptionStatus } = body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
                role,
                subscriptionStatus,
            },
        });
        return NextResponse.json({ message: "User updated successfully", data: updatedUser }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: error.message || "An error occurred while updating the user" }, { status: 500 });
    }

}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id: userId } = await context.params;

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NextResponse.json({ message: "Unauthorized - Please login" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden - Admin access required" }, { status: 403 });
    }

    try {
        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: error.message || "An error occurred while deleting the user" }, { status: 500 });
    }
}