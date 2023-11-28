import { Prisma, PrismaClient } from "@prisma/client"

const createPost = async (
  client: PrismaClient,
  data: Prisma.DiscordPostCreateInput
) => {
  return await client.discordPost.create({
    data
  })
}
export default createPost
