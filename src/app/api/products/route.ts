/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateProductSchemaServer } from "@/schemas/CreateProductSchema";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(
            { message: "Products fetched successfully", data: products },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("GET /api/products error:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
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

        const formData = await request.formData();

        const name = formData.get("name");
        const description = formData.get("description");
        const priceStr = formData.get("price");
        const imageFile = formData.get("imageUrl");
        const driveLink = formData.get("driveLink");

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { message: "Name is required and must be a string" },
                { status: 400 }
            );
        }

        if (!description || typeof description !== "string") {
            return NextResponse.json(
                { message: "Description is required and must be a string" },
                { status: 400 }
            );
        }

        if (!priceStr) {
            return NextResponse.json(
                { message: "Price is required" },
                { status: 400 }
            );
        }

        const price = Number(priceStr);

        if (isNaN(price) || price < 0) {
            return NextResponse.json(
                { message: "Price must be a valid positive number" },
                { status: 400 }
            );
        }

        if (!(imageFile instanceof File)) {
            return NextResponse.json(
                { message: "Image is required and must be a file" },
                { status: 400 }
            );
        }

        const dataToValidate = {
            name: name.trim(),
            description: description.trim(),
            price,
            imageUrl: imageFile,
            driveLink: driveLink && typeof driveLink === "string" && driveLink.trim() !== ""
                ? driveLink.trim()
                : undefined
        };

        const parsedBody = CreateProductSchemaServer.safeParse(dataToValidate);

        if (!parsedBody.success) {
            console.error("Validation errors:", parsedBody.error.issues);

            const firstError = parsedBody.error.issues[0];
            return NextResponse.json(
                {
                    message: firstError.message || "Validation failed",
                    field: firstError.path.join("."),
                    errors: parsedBody.error.issues.map(issue => ({
                        field: issue.path.join("."),
                        message: issue.message
                    }))
                },
                { status: 400 }
            );
        }

        const extension = imageFile.name.split(".").pop() || "jpg";
        const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const imageName = `${sanitizedName}-${Date.now()}.${extension}`;

        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const blob = await put(`products/${imageName}`, buffer, {
            access: "public",
            contentType: imageFile.type,
        });

        const baseSlug = parsedBody.data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        let slug = baseSlug;
        let counter = 1;

        while (await prisma.product.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        const newProduct = await prisma.product.create({
            data: {
                name: parsedBody.data.name,
                description: parsedBody.data.description,
                price: parsedBody.data.price,
                slug,
                imageUrl: blob.url,
                driveLink: parsedBody.data.driveLink || "",
            },
        });

        return NextResponse.json(
            {
                message: "Product created successfully",
                data: newProduct
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("POST /api/products error:", error);

        if (error.code === "P2002") {
            return NextResponse.json(
                { message: "A product with this name already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                message: error.message || "Internal Server Error",
                error: process.env.NODE_ENV === "development" ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}