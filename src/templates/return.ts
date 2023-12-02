const botReturn = (guildId: string) => {
  return {
    content: "Hello again! Thanks for adding me. 👋",
    tts: false,
    embeds: [
      {
        title: "Re-doing setup.",
        description:
          "I'm built to help your community voice their thoughts in a safe and calm environment. Just like before, please pick an option for where you want me.",
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
            label: "Create a new channel to use",
            customId: `createchannel~${guildId}`
          },
          {
            type: 2,
            style: 1,
            label: `Join an Existing Channel-${guildId}`,
            customId: `joinchannel`
          }
        ]
      }
    ]
  }
}
export default botReturn
