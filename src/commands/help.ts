import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  User
} from "discord.js"

import { help as helpCommand } from "../templates"
import {
  createUser,
  generatedName,
  getGuildByDiscordId,
  getPostsByUserDiscordId
} from "../functions"
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
    const posts = await getPostsByUserDiscordId(client, user.id, guild)

    const passingPosts = posts ? posts : []

    const json = helpCommand(guild, passingPosts)

    await user.send(json)

    const alias = generatedName()

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
