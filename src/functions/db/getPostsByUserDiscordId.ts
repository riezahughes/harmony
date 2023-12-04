import { PrismaClient } from "@prisma/client"
import getGuildByDiscordId from "./getGuildByDiscordId"

const getPostsByUserDiscordId = async (
  client: PrismaClient,
  id: string,
  guild: string
) => {
  const guildRecord = await getGuildByDiscordId(client, guild)

  const record = await client.discordUser.findFirst({
    where: {
      did: id,
      guildId: guildRecord?.id,
      posts: {
        every: {
          enabled: true
        }
      }
    },
    include: {
      posts: true
    }
  })
  return record?.posts
}
export default getPostsByUserDiscordId
