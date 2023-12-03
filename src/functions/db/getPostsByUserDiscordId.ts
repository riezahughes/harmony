import { PrismaClient } from "@prisma/client"

const getPostsByUserDiscordId = async (client: PrismaClient, id: string) => {
  const record = await client.discordUser.findFirst({
    where: {
      did: id
    },
    include: {
      posts: true
    }
  })
  return record?.posts
}
export default getPostsByUserDiscordId
