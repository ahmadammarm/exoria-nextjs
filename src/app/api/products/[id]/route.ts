/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params: { id: productId } }: any) {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "An error occurred while deleting the product" }, { status: 500 });
    }
}