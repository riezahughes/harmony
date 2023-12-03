import { PrismaClient } from "@prisma/client"

const getPostByDiscordId = async (client: PrismaClient, id: string) => {
  return await client.discordPost.findFirst({
    where: {
      did: id
    },
    include: {
      thread: true
    }
  })
}
export default getPostByDiscordId
