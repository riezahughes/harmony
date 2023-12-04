import { Prisma, PrismaClient } from "@prisma/client"

const updateThread = async (
  client: PrismaClient,
  did: string,
  data: Prisma.DiscordThreadUpdateInput,
  where: Prisma.DiscordThreadWhereInput = { did: did }
) => {
  try {
    console.log("Attempting to save user...")

    const findRecord = await client.discordThread.findFirst({
      where
    })

    const record = await client.discordThread.update({
      where: {
        id: findRecord?.id
      },
      data: data
    })

    if (!record) throw Error("Could not save")

    return record
  } catch (e) {
    throw Error("Could not get guild: " + e)
  }
}
export default updateThread
