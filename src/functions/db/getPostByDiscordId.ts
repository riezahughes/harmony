import { PrismaClient } from "@prisma/client"

const getPostByDiscordId = async (client: PrismaClient, id: string) => {
  return await client.discordUser.findFirst({
    where: {
      did: id
    }
  })
}
export default getPostByDiscordId
