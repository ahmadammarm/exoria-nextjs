import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function AdminSeed() {

    const hashedPassword = await bcrypt.hash("exoria123", 10);

    await prisma.user.upsert({
        where: {
            email: "admin@example.com",
        },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            subscriptionStatus: "ACTIVE",
            role: "ADMIN",
        },
    });

}

async function ProductSeed() {
    await prisma.product.createMany({
        data: [
            {
                name: "Proshow Web Template",
                description: "Proshow web template",
                price: 30000,
                imageUrl: "https://rakjq0y4hyiacsg9.public.blob.vercel-storage.com/products/1754129968661.jpg",
                slug: "proshow-web-template",
                driveLink: "https://drive.google.com/file/d/11Dir1IGYNCGWbfAc0H_blrMQVvL0_aPt/view?usp=drivesdk"
            },
            {
                name: "Purwa Landing Page",
                description: "Purwa landing page",
                price: 30000,
                imageUrl: "https://rakjq0y4hyiacsg9.public.blob.vercel-storage.com/products/1754129945748.jpg",
                slug: "purwa-landing-page",
                driveLink: "https://drive.google.com/file/d/1Z3abMHMd947RdH0uhoiGF5Z7fReqUJkI/view?usp=drivesdk"
            },
            {
                name: "Chain Landing Page",
                description: "Chain landing page",
                price: 30000,
                imageUrl: "https://rakjq0y4hyiacsg9.public.blob.vercel-storage.com/products/1754129989151.jpg",
                slug: "chain-landing-page",
                driveLink: "https://drive.google.com/file/d/1wWpEsR2DZE70ldSXEWmxZeEpvpkF71Nz/view?usp=drivesdk"
            },
        ]
    })
}

async function main() {
    await prisma.$connect();
    await AdminSeed();
    await ProductSeed();
}


main()
    .then(() => {
        console.log("Seeding completed successfully!");
    })
    .catch((e) => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });