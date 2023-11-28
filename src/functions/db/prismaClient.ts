import { PrismaClient } from "@prisma/client"

const prismaClient = () => {
  try {
    const prisma = new PrismaClient()
    return prisma
  } catch (e) {
    throw Error("Could not establish connection with prisma client")
  }
}

export default prismaClient
