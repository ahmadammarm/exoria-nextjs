import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id: productId } = await context.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Product fetched successfully", data: product },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id: productId } = await context.params;

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
        const { name, description, price, driveLink } = body;

        const updateData: any = {};

        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) {
            const priceNum = Number(price);
            if (isNaN(priceNum) || priceNum < 0) {
                return NextResponse.json(
                    { message: "Price must be a valid positive number" },
                    { status: 400 }
                );
            }
            updateData.price = priceNum;
        }
        if (driveLink !== undefined) updateData.driveLink = driveLink;

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: updateData,
        });

        return NextResponse.json(
            { message: "Product updated successfully", data: updatedProduct },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating product:", error);
        if (error.code === "P2025") {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id: productId } = await context.params;

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NextResponse.json({ message: "Unauthorized - Please login" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden - Admin access required" }, { status: 403 });
    }

    if (!productId) {
        return NextResponse.json(
            { message: "Product ID is required" },
            { status: 400 }
        );
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { message: error.message || "An error occurred while deleting the product" },
            { status: 500 }
        );
    }
}
