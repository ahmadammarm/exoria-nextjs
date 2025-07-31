/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateProductSchema } from "@/schemas/CreateProductSchema";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });

        const formattedProduct = products.map((product) => {
            if (!product.imageUrl) {
                return { ...product, imageUrl: null }
            }

            if (!product.imageUrl.startsWith("/assets/product/")) {
                return { ...product, imageUrl: `/assets/product/${product.imageUrl}` }
            }

            return product
        })

        return NextResponse.json({ message: "Products fetched successfully", data: formattedProduct }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 })
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

        const name = formData.get("name");
        const description = formData.get("description");
        const price = formData.get("price");
        const imageFile = formData.get("imageUrl") as File;

        const data = {
            name,
            description,
            price,
            imageUrl: imageFile
        }

        const parsedBody = CreateProductSchema.safeParse({
            ...data,
            imageUrl: imageFile
        });

        if (!parsedBody.success) {
            return NextResponse.json({ message: parsedBody.error.issues[0].message || "Invalid request" })
        }

        // Mengekstrak nama file
        const originalImageName = imageFile.name;
        const extension = path.extname(originalImageName);
        const timeStamp = Date.now();
        const imageName = `${timeStamp}${extension}`;

        // Menentukan direktori tujuan
        const uploadDirectory = path.join(process.cwd(), "public", "assets", "product");
        await mkdir(uploadDirectory, { recursive: true });

        // Menyimpan file ke sistem kita
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        await writeFile(path.join(uploadDirectory, imageName), buffer);

        const newProduct = await prisma.product.create({
            data: {
                name: parsedBody.data.name,
                description: parsedBody.data.description,
                price: parsedBody.data.price,
                slug: (name as string).toLowerCase().replace(/\s+/g, "-"),
                imageUrl: `/assets/product/${imageName}`,
            }
        });

        return NextResponse.json({ message: "A new product successfully created", data: newProduct }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
    }
}