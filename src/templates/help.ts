const help = () => {
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
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 3,
            label: "Start a thread",
            customId: "createthread"
          },
          {
            type: 2,
            style: 2,
            label: "Close Existing Thread",
            customId: "closethread",
            disabled: true
          },
          {
            type: 2,
            style: 2,
            label: "Delete Existing Thread",
            customId: "deletethread",
            disabled: true
          }
        ]
      }
    ]
  }
}

export default help
