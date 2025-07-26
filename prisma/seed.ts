import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('adminexoria123', 10)

    await prisma.user.create({
        data: {
            email: 'admin@mail.com',
            name: 'Admin Exoria',
            password: hashedPassword,
            subscriptionStatus: 'ACTIVE',
            role: 'ADMIN',
        },
    })
}

main()
    .then(() => console.log('Seeding selesai!'))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })