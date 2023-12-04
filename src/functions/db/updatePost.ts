import { Prisma, PrismaClient } from "@prisma/client"

const updatePost = async (
  client: PrismaClient,
  did: string,
  data: Prisma.DiscordPostUpdateInput,
  where: Prisma.DiscordPostWhereInput = { did: did }
) => {
  try {
    console.log("Attempting to save user...")

    const findRecord = await client.discordPost.findFirst({
      where
    })

    const record = await client.discordPost.update({
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
export default updatePost
