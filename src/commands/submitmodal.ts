import {
  ModalMessageModalSubmitInteraction,
  TextChannel,
  ThreadAutoArchiveDuration
} from "discord.js"
import { DiscordUser, PrismaClient } from "@prisma/client"
import { create } from "../templates"
import {
  createPost,
  updateUser,
  sendMessageToClaude,
  createThread
} from "../functions/"

const submitmodal = {
  data: { name: "submitmodal" },
  async execute(
    interaction: ModalMessageModalSubmitInteraction,
    prisma: PrismaClient,
    channel: TextChannel,
    dbUser: DiscordUser
  ) {
    const title =
      interaction.fields.getTextInputValue("titleInput") || undefined
    const text = interaction.fields.getTextInputValue("infoInput") || undefined

    interaction.reply("I'm working on it! Give me one second...")

    const alteredText = await sendMessageToClaude(text as string)

    // name will be stored against the post

    const newPost = await channel.send("New post incoming...")

    const newThread = await newPost.startThread({
      name: `${title} - asked by ${dbUser.alias}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek
    })

    const json = create(
      title,
      alteredText,
      dbUser.alias,
      channel.guildId,
      newThread.id
    )

    await newPost.edit(json)

    // db stuff

    console.log("DB!", dbUser.id)

    const dbPost = await createPost(prisma, {
      did: newPost.id,
      title: title as string,
      user: {
        connect: {
          id: dbUser.id
        }
      }
    })

    updateUser(
      prisma,
      dbUser.did,
      {
        posts: {
          connect: {
            id: dbPost.id
          }
        }
      },
      {
        did: dbUser.did,
        guildId: dbUser.guildId
      }
    )

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
