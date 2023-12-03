import { InteractionReplyOptions } from "discord.js"

const adjustThread = (
  threadName: string,
  threadId: string,
  guildId: string
): InteractionReplyOptions => {
  return {
    content: `What would you like to do with ${threadName}`,
    embeds: [],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 3,
            label: "Reply to thread",
            customId: `replythread~${guildId}~${threadId}`
          },
          {
            type: 2,
            style: 1,
            label: "Close Thread ",
            customId: `closethread~${guildId}~${threadId}`
          },
          {
            type: 2,
            style: 4,
            label: "Delete Thread",
            customId: `deletethread~${guildId}~${threadId}`
          }
        ]
      }
    ]
  }
}

export default adjustThread
