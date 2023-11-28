import { Prisma, PrismaClient } from "@prisma/client"

const createUser = async (
  client: PrismaClient,
  data: Prisma.DiscordUserCreateInput
) => {
  return await client.discordUser.create({
    data
  })
}
export default createUser
