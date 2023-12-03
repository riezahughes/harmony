import { PrismaClient } from "@prisma/client"

const getThreadByDiscordId = async (client: PrismaClient, id: string) => {
  return await client.discordThread.findFirst({
    where: {
      did: id
    },
    include: {
      post: true
    }
  })
}
export default getThreadByDiscordId
