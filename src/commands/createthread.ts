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
  async execute(
    interaction: ChatInputCommandInteraction,
    user: any,
    guildId: string
  ) {
    const modal = new ModalBuilder()
      .setCustomId(`submitmodal~${guildId}`)
      .setTitle("My Problem")

    const titleInput = new TextInputBuilder()
      .setCustomId("titleInput")
      .setLabel("Give a title for your post")
      .setStyle(TextInputStyle.Short)
      .setMinLength(1)
      .setMaxLength(4000)

    const infoInput = new TextInputBuilder()
      .setCustomId("infoInput")
      .setLabel("What's going on?")
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
