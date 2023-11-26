import { Client, Collection, Events, GatewayIntentBits } from "discord.js"
import { post } from "./commands"

const { TOKEN, CHANNEL_ID, GUILD_ID } = process.env

console.log(TOKEN, CHANNEL_ID, GUILD_ID)

if (!TOKEN || !CHANNEL_ID || !GUILD_ID) throw Error("Token not set.")

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

client.commands = new Collection()

const command = post
// Set a new item in the Collection with the key as the command name and the value as the exported module
if ("data" in command && "execute" in command) {
  client.commands.set(command.data.name as any, command)
} else {
  console.log(command)
  console.log(
    `[WARNING] The command is missing a required "data" or "execute" property.`
  )
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  const user = client.users.cache.find(
    (user) => user.id === interaction.user.id
  )

  console.table(`${user?.id} has made a request`)

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
})

// Log in to Discord with your client's token
client.login(TOKEN)
