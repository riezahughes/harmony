import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  User,
  Guild
} from "discord.js"

import { help as helpCommand } from "../templates"
import { createUser, generatedName, getGuildByDiscordId } from "../functions"
import { PrismaClient } from "@prisma/client"

const help = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Whats on your mind?"),
  async execute(
    interaction: ChatInputCommandInteraction,
    client: PrismaClient,
    guild: string,
    user: User
  ) {
    const json = helpCommand(guild)

    await user.send(json)

    const alias = generatedName()
    console.log(guild)
    const foundGuild = await getGuildByDiscordId(client, guild)

    console.log(foundGuild)

    if (!foundGuild)
      interaction.reply({
        content: "There's a small hiccup! Sorry.",
        ephemeral: true
      })

    await createUser(client, {
      did: user.id,
      alias,
      guilds: {
        connect: {
          id: foundGuild?.id
        }
      }
    })

    await interaction.reply({
      content: "You have summoned a friend",
      ephemeral: true
    })
  }
}
export { help }
