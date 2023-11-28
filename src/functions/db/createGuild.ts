import { Prisma, PrismaClient } from "@prisma/client"

const createGuild = async (
  client: PrismaClient,
  data: Prisma.DiscordGuildCreateInput
) => {
  try {
    console.log("Attempting to save...")
    const record = await client.discordGuild.create({
      data
    })

    if (!record) throw Error("Could not save")
    console.log(record)
    return record
  } catch (e) {
    throw Error("Could not get guild: " + e)
  }
}
export default createGuild
