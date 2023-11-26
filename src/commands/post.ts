import {
  SlashCommandBuilder,
  TextChannel,
  EmbedBuilder,
  ChatInputCommandInteraction
} from "discord.js"
import { generatedName } from "../functions"

const post = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Whats on your mind?"),
  async execute(interaction: ChatInputCommandInteraction, user: any) {
    await user.send({
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
          id: 599186864,
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
      ],
      actions: {
        createthread: {
          actions: []
        },
        closethread: {
          actions: []
        },
        deletethread: {
          actions: []
        }
      }
    })

    await interaction.reply({
      content: "You have summoned a friend",
      ephemeral: true
    })

    //   // inside a command, event listener, etc.
    //   const title = interaction.options.getString("title")
    //   const text = interaction.options.getString("text")
    //   const name = generatedName()
    //   const exampleEmbed = new EmbedBuilder()
    //     .setColor(0x0099ff)
    //     .setTitle(title)
    //     .setAuthor({
    //       name: `Written by: ${name}`
    //     })
    //     .setDescription(text)
    //     .setTimestamp()
    //     .setFooter({
    //       text: "pass with ❤️"
    //     })
    //   const post = await channel.send({
    //     embeds: [exampleEmbed]
    //   })
    //   console.log(`Created post: ${post}`)
    //   // create thread from post
    //   // const thread = await interaction.client.channel.threads.create({
    //   //   name: "food-talk",
    //   //   autoArchiveDuration: 60,
    //   //   reason: "Needed a separate thread for food"
    //   // })
    //   // console.log(`Created thread: ${thread.name}`)
    //   await interaction.reply({
    //     embeds: [
    //       {
    //         title: `Thank you.`,
    //         description: `I know that talking is hard. But it is always a first step.`,
    //         color: 555555
    //       }
    //     ],
    //     //this is the important part
    //     ephemeral: true
    //   })
    //   // await interaction.reply(
    //   //   `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    //   // )
  }
}
export { post }
