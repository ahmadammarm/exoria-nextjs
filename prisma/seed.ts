import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

    const hashedPassword = await bcrypt.hash("exoria123", 10);

    await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            subscriptionStatus: "ACTIVE",
            role: "ADMIN",
        },
    });

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