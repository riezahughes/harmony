import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  User
} from "discord.js"

import { help as helpCommand } from "../templates"

const help = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Whats on your mind?"),
  async execute(interaction: ChatInputCommandInteraction, user: User) {
    const json = helpCommand()
    await user.send(json)

    await interaction.reply({
      content: "You have summoned a friend",
      ephemeral: true
    })
  }
}
export { help }
