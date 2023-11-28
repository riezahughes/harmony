import { PrismaClient } from "@prisma/client"

const getGuildByDiscordId = async (client: PrismaClient, id: string) => {
  return await client.discordGuild.findFirst({
    where: {
      did: id
    }
  })
}
export default getGuildByDiscordId
