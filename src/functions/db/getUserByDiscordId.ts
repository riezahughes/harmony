import { PrismaClient } from "@prisma/client"

const getUserByDiscordId = async (client: PrismaClient, id: string) => {
  return await client.discordUser.findFirst({
    where: {
      did: id
    }
  })
}
export default getUserByDiscordId
