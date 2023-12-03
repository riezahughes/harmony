import {
  ModalMessageModalSubmitInteraction,
  TextChannel,
  ThreadAutoArchiveDuration
} from "discord.js"
import { DiscordUser } from "@prisma/client"
import { create } from "../templates"
import {
  createPost,
  updateUser,
  sendMessageToGPT,
  createThread
} from "../functions/"

const submitmodal = {
  data: { name: "submitmodal" },
  async execute(
    interaction: ModalMessageModalSubmitInteraction,
    prisma: any,
    channel: TextChannel,
    dbUser: DiscordUser
  ) {
    const title =
      interaction.fields.getTextInputValue("titleInput") || undefined
    const text = interaction.fields.getTextInputValue("infoInput") || undefined

    interaction.reply("I'm working on it! Give me one second...")

    const alteredText = await sendMessageToGPT(text as string)

    // name will be stored against the post

    const json = create(title, alteredText, dbUser.alias)

    const newPost = await channel.send(json)

    const newThread = await newPost.startThread({
      name: `${title} - asked by ${dbUser.alias}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek
    })

    // db stuff

    const dbPost = await createPost(prisma, {
      did: newPost.id,
      title: title as string,
      user: {
        connect: {
          id: dbUser.id
        }
      }
    })

    updateUser(prisma, dbUser.did, {
      posts: {
        connect: {
          id: dbPost.id
        }
      }
    })

    createThread(prisma, {
      did: newThread.id,
      post: {
        connect: {
          id: dbPost.id
        }
      }
    })

    return {
      channel: channel,
      thread: newThread.id
    }
  }
}

export { submitmodal }
