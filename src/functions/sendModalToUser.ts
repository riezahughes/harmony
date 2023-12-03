import {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  ModalActionRowComponentBuilder
} from "@discordjs/builders"

import { TextInputStyle } from "discord.js"

const sendModalToUser = async (
  interaction: any,
  guildId: string,
  threadId: string
) => {
  const modal = new ModalBuilder()
    .setCustomId(`submitreply~${guildId}~${threadId}`)
    .setTitle("My Reply: ")

  const replyInput = new TextInputBuilder()
    .setCustomId("replyInput")
    .setLabel("Your response")
    .setStyle(TextInputStyle.Paragraph)
    .setMinLength(1)
    .setMaxLength(4000)

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      replyInput
    )

  modal.addComponents(firstActionRow)

  return await interaction.showModal(modal)
}

export default sendModalToUser
