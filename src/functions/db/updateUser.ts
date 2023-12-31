import { Prisma, PrismaClient } from "@prisma/client"

const updateUser = async (
  client: PrismaClient,
  did: string,
  data: Prisma.DiscordUserUpdateInput,
  where: Prisma.DiscordUserWhereInput = { did: did }
) => {
  try {
    console.log("Attempting to save user...")

    const findRecord = await client.discordUser.findFirst({
      where
    })

    const record = await client.discordUser.update({
      where: {
        id: findRecord?.id,
        guildId: findRecord?.guildId
      },
      data: data
    })

    if (!record) throw Error("Could not save")

    return record
  } catch (e) {
    throw Error("Could not get guild: " + e)
  }
}
export default updateUser
