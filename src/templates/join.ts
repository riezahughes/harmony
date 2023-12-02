const botJoin = (guildId: string) => {
  return {
    content: "Hi there! Thanks for adding me. 👋",
    tts: false,
    embeds: [
      {
        title: "Setting me up",
        description:
          "I'm built to help your community voice their thoughts in a safe and calm environment. Please choose how you'd like to set me up ",
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
            label: "Join an Existing Channel",
            customId: `joinchannel~${guildId}`
          }
        ]
      }
    ]
  }
}

export default botJoin
