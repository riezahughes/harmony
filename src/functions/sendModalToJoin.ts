import {
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  ModalActionRowComponentBuilder
} from "@discordjs/builders"

import { ButtonInteraction, TextInputStyle } from "discord.js"

const sendModalToJoin = async (
  interaction: ButtonInteraction,
  guildId: string
) => {
  console.log("building modal")
  const modal = new ModalBuilder()
    .setCustomId(`submitchannel~${guildId}~${interaction.user.id}`)
    .setTitle("Please Enter Channel ID: ")

  const channelInput = new TextInputBuilder()
    .setCustomId("channelInput")
    .setLabel("Right Click > Copy Channel ID")
    .setStyle(TextInputStyle.Short)
    .setMinLength(1)
    .setMaxLength(50)

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      channelInput
    )

  modal.addComponents(firstActionRow)

  return await interaction.showModal(modal)
}

export default sendModalToJoin
