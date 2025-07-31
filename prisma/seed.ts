import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.POSTGRES_URL,
        },
    },
});

async function main() {
    const hashedPassword = await bcrypt.hash("adminexoria123", 10);

    const adminUser = await prisma.user.upsert({
        where: {
            email: "admin@mail.com",
        },
        update: {
            name: "Admin Exoria",
            password: hashedPassword,
            subscriptionStatus: "ACTIVE",
            role: "ADMIN",
        },
        create: {
            email: "admin@mail.com",
            name: "Admin Exoria",
            password: hashedPassword,
            subscriptionStatus: "ACTIVE",
            role: "ADMIN",
        },
    });

    console.log("Admin user created/updated:", adminUser);
}

main()
    .then(() => {
        console.log("✅ Seeding completed successfully!");
    })
    .catch((e) => {
        console.error("❌ Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });