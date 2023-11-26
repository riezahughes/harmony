import { ModalMessageModalSubmitInteraction, TextChannel } from "discord.js"
import { generatedName } from "../functions/"

const submitmodal = {
  data: { name: "submitmodal" },
  async execute(
    interaction: ModalMessageModalSubmitInteraction,
    channel: TextChannel
  ) {
    const title =
      interaction.fields.getTextInputValue("titleInput") || undefined
    const text = interaction.fields.getTextInputValue("infoInput") || undefined
    const name = generatedName()

    const newPost = await channel.send({
      content: "",
      tts: false,
      embeds: [
        {
          title: title,
          description: text,
          color: 2326507,
          fields: [],
          author: {
            name: name
          }
        }
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 4,
              label: "Report Thread",
              disabled: true,
              emoji: {
                name: "⚠️",
                animated: false
              },
              customId: "reportthread"
            }
          ]
        }
      ]
    })
    const newThread = await newPost.startThread({
      name: `${name}-${newPost.createdTimestamp}`,
      autoArchiveDuration: 60
    })

    return {
      channel: channel,
      thread: newThread.id
    }
  }
}

export { submitmodal }
