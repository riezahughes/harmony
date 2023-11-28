import { Prisma, PrismaClient } from "@prisma/client"

const createThread = async (
  client: PrismaClient,
  data: Prisma.DiscordThreadCreateInput
) => {
  return await client.discordThread.create({
    data
  })
}
export default createThread
