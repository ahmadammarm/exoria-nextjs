/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Authentication check
        const session = await auth();
        const user = session?.user;

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized - Please login" },
                { status: 401 }
            );
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Forbidden - Admin access required" },
                { status: 403 }
            );
        }

        // Validate product ID
        const productId = params.id;

        if (!productId || typeof productId !== "string") {
            return NextResponse.json(
                { message: "Invalid product ID" },
                { status: 400 }
            );
        }

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!existingProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        // Delete image from Vercel Blob if it exists
        if (existingProduct.imageUrl) {
            try {
                await del(existingProduct.imageUrl);
                console.log(`Deleted image: ${existingProduct.imageUrl}`);
            } catch (blobError) {
                console.error("Error deleting image from blob:", blobError);
                // Continue with product deletion even if blob deletion fails
            }
        }

        // Delete product from database
        await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json(
            {
                message: "Product deleted successfully",
                data: {
                    id: existingProduct.id,
                    name: existingProduct.name
                }
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("DELETE /api/products/[id] error:", error);

        // Handle Prisma specific errors
        if (error.code === "P2025") {
            return NextResponse.json(
                { message: "Product not found or already deleted" },
                { status: 404 }
            );
        }

        if (error.code === "P2003") {
            return NextResponse.json(
                { message: "Cannot delete product - it has related records" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                message: error.message || "An error occurred while deleting the product",
                error: process.env.NODE_ENV === "development" ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}