import { Client, Collection, Events, GatewayIntentBits } from "discord.js"
import { help } from "./commands"
import { createthread } from "./commands/createThread"

const { TOKEN, CHANNEL_ID, GUILD_ID } = process.env

console.log(TOKEN, CHANNEL_ID, GUILD_ID)

if (!TOKEN || !CHANNEL_ID || !GUILD_ID) throw Error("Token not set.")

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

client.commands = new Collection()

const commands = [help, createthread]
// Set a new item in the Collection with the key as the command name and the value as the exported module

client.commands.set(help.data.name as any, help)
client.commands.set(createthread.data.name, createthread)

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isButton) return

  const user = client.users.cache.find(
    (user) => user.id === interaction.user.id
  )

  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    console.log("Button: " + interaction.commandName)

    try {
      await command.execute(interaction, user)
    } catch (error) {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true
        })
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true
        })
      }
    }
  }

  if (interaction.isButton()) {
    console.log("Button: " + interaction.customId)
    const command = interaction.client.commands.get(interaction.customId)
    try {
      await command.execute(interaction, user)
    } catch (error) {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true
        })
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true
        })
      }
    }
  }

  if (interaction.isModalSubmit()) {
    console.log("Modal Submission" + interaction.customId)
    interaction.reply("Thank you. Your thread has been created.")
  }
})

// Log in to Discord with your client's token
client.login(TOKEN)
