import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  User,
  Guild
} from "discord.js"

import { help as helpCommand } from "../templates"
import { createUser, generatedName } from "../functions"

const help = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Whats on your mind?"),
  async execute(
    interaction: ChatInputCommandInteraction,
    guild: Guild,
    user: User
  ) {
    const json = helpCommand()

    await user.send(json)

    const alias = generatedName()

    // await createUser(client, {
    //   did: user.id,
    //   guild: guild.id,
    // })

    await interaction.reply({
      content: "You have summoned a friend",
      ephemeral: true
    })
  }
}
export { help }
