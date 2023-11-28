import {
  ModalMessageModalSubmitInteraction,
  TextChannel,
  ThreadAutoArchiveDuration
} from "discord.js"
import { create } from "../templates"
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

    // name will be stored against the post
    const name = generatedName()

    const json = create(title, text, name)

    const newPost = await channel.send(json)

    const newThread = await newPost.startThread({
      name: `${title} - asked by ${name}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek
    })

    return {
      channel: channel,
      thread: newThread.id
    }
  }
}

export { submitmodal }
