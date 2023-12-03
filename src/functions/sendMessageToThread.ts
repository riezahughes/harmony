import {
  ThreadChannel,
  ModalMessageModalSubmitInteraction,
  ModalSubmitInteraction
} from "discord.js"
import { reply } from "../templates"
import sendMessageToGPT from "./gpt/sendMessagetoGPT"
import { DiscordUser, PrismaClient } from "@prisma/client"

const sendMessageToThread = async (
  interaction: ModalSubmitInteraction,
  prisma: PrismaClient,
  channel: ThreadChannel,
  alias: string
) => {
  const value = interaction.fields.getTextInputValue("replyInput")

  interaction.reply("Sorted and sending your message...")

  const msg = await sendMessageToGPT(value)

  const json = reply(msg, alias)

  const newPost = await channel.send(json)

  return newPost
}

export default sendMessageToThread
