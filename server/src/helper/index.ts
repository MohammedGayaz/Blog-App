import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

export const getClient = async (c: any) => {
    const prisma = new PrismaClient({datasourceUrl: c.env?.DATABASE_URL}).$extends(withAccelerate())
    return prisma
}
