import { PrismaClient } from "@prisma/client"

const getGuildByDiscordId = async (client: PrismaClient, id: string) => {
  console.log(id)
  return await client.discordGuild.findFirst({
    where: {
      did: id
    }
  })
}
export default getGuildByDiscordId
