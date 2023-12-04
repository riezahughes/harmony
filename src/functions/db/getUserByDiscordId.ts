import { PrismaClient, Prisma } from "@prisma/client"

const getUserByDiscordId = async (
  client: PrismaClient,
  id: string,
  where: Prisma.DiscordUserWhereInput = { did: id }
) => {
  return await client.discordUser.findFirst({
    where,
    include: {
      guilds: true
    }
  })
}
export default getUserByDiscordId
