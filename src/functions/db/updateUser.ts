import { Prisma, PrismaClient } from "@prisma/client"

const updateUser = async (
  client: PrismaClient,
  did: string,
  data: Prisma.DiscordUserUpdateInput
) => {
  try {
    console.log("Attempting to save user...")

    const findRecord = await client.discordUser.findFirst({
      where: {
        did
      }
    })

    const record = await client.discordUser.update({
      where: {
        id: findRecord?.id
      },
      data: data
    })

    if (!record) throw Error("Could not save")
    console.log(record)
    return record
  } catch (e) {
    throw Error("Could not get guild: " + e)
  }
}
export default updateUser
