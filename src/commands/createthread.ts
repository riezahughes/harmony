import {
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalActionRowComponentBuilder
} from "discord.js"

const createthread = {
  data: { name: "createthread" },
  async execute(interaction: ChatInputCommandInteraction) {
    const modal = new ModalBuilder()
      .setCustomId("createThreadModal")
      .setTitle("My Problem")

    const titleInput = new TextInputBuilder()
      .setCustomId("titleInput")
      // The label is the prompt the user sees for this input
      .setLabel("Give a title for your post")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short)
      .setMinLength(1)
      .setMaxLength(4000)

    const infoInput = new TextInputBuilder()
      .setCustomId("infoInput")
      .setLabel("What's going on?")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph)
      .setMinLength(1)
      .setMaxLength(4000)

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        titleInput
      )
    const secondActionRow =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        infoInput
      )

    modal.addComponents(firstActionRow, secondActionRow)

    interaction.showModal(modal)
  }
}

export { createthread }
