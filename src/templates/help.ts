import { MessageCreateOptions } from "discord.js"
import { DiscordPost } from "@prisma/client"

const help = (
  guildId: string,
  userPosts: Array<DiscordPost> | null
): MessageCreateOptions => {
  const finalArray = []

  const selectedOptions =
    userPosts &&
    userPosts?.map((post) => {
      return {
        label: post.title,
        value: post.did
      }
    })

  const componentArray = selectedOptions?.length && {
    type: 1,
    components: [
      {
        type: 3,
        options: selectedOptions,
        disabled: false,
        placeholder: "Interact with existing threads...",
        customId: `selectingpost~${guildId}`
      }
    ]
  }

  if (componentArray) finalArray.push(componentArray)

  const buttonsRow = {
    type: 1,
    components: [
      {
        type: 2,
        style: 3,
        label: "Start a thread",
        customId: `createthread~${guildId}`
      }
    ]
  }

  finalArray.push(buttonsRow)
  console.log(finalArray)

  return {
    content: "Hi there! Thanks you for reaching out. 👋",
    tts: false,
    embeds: [
      {
        title: "About Me",
        description:
          "I am a bot solely created to help you pass messages between you and your community anonymously and help you with topics you might struggle with that you are unable to talk about openly as yourself.\n\nSome minor notes:\n- I will not save any of the information you send me\n- I will not share any of the information you send me with *anyone*\n- All posts will be completely anonymous\n\nPlease understand that **no personal information should ever be passed around using me**. Anonymity is key. You will be banned not only from my services but also this discord server.\n\nIf you are okay with all of this, please go ahead and start a thread! ",
        color: 2326507,
        fields: []
      }
    ],
    components: finalArray
  }
}

export default help
