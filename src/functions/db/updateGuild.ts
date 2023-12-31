import { Prisma, PrismaClient } from "@prisma/client"

const updateGuild = async (
  client: PrismaClient,
  did: string,
  data: Prisma.DiscordGuildUpdateInput
) => {
  try {
    console.log("Attempting to save guild...")

    const findRecord = await client.discordGuild.findFirst({
      where: {
        did
      }
    })

    const record = await client.discordGuild.update({
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
export default updateGuild
