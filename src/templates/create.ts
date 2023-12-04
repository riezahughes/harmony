const create = (
  title: string | undefined,
  text: string | undefined,
  name: string,
  guildId: string,
  threadId: string
) => {
  if (!title || !text || !name) {
    console.error("Missing attributes in create function")
    throw Error("Missing attributeas for create")
  }
  return {
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
            style: 2,
            label: "OP Reply",
            emoji: {
              name: "💬",
              animated: false
            },
            customId: `replythread~${guildId}~${threadId}`
          },
          {
            type: 2,
            style: 2,
            label: "Close Thread",
            customId: `closethread~${guildId}~${threadId}`
          },
          {
            type: 2,
            style: 2,
            label: "Delete Thread",
            customId: `deletethread~${guildId}~${threadId}`
          },
          {
            type: 2,
            style: 4,
            label: "Report Thread",
            disabled: true,
            emoji: {
              name: "⚠️",
              animated: false
            },
            customId: `reportthread~${guildId}~${threadId}`
          }
        ]
      }
    ]
  }
}

export default create
