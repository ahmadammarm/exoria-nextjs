/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateProductSchemaServer } from "@/schemas/CreateProductSchema";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";


export async function GET(request: NextRequest) {
    try {
        const products = await prisma.product.findMany();

        return NextResponse.json(
            { message: "Products fetched successfully", data: products },
            { status: 200 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const formData = await request.formData();

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = Number(formData.get("price"));
        const imageFile = formData.get("imageUrl") as File;

        const parsedBody = CreateProductSchemaServer.safeParse({
            name,
            description,
            price,
            imageUrl: imageFile,
        });

        if (!parsedBody.success) {
            return NextResponse.json(
                { message: parsedBody.error.issues[0].message || "Invalid request" },
                { status: 400 }
            );
        }

        const extension = imageFile.name.split(".").pop();
        const imageName = `${Date.now()}.${extension}`;
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        // Upload ke Vercel Blob
        const blob = await put(`products/${imageName}`, buffer, {
            access: "public",
        });

        const newProduct = await prisma.product.create({
            data: {
                name: parsedBody.data.name,
                description: parsedBody.data.description,
                price: parsedBody.data.price,
                slug: name.toLowerCase().replace(/\s+/g, "-"),
                imageUrl: blob.url, // Simpan URL dari Vercel Blob
            },
        });

        return NextResponse.json(
            { message: "A new product successfully created", data: newProduct },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
}
