import { Client, Collection, Events, GatewayIntentBits } from "discord.js"
import { help } from "./commands"
import { createthread } from "./commands/createthread"
import { submitmodal } from "./commands/submitmodal"
import {
  createGuild,
  prismaClient,
  updateGuild,
  getTimeForPrisma,
  getGuildByDiscordId
} from "./functions"
import { botJoin, botReturn } from "./templates"

const { TOKEN, CHANNEL_ID, GUILD_ID } = process.env

console.log(TOKEN, CHANNEL_ID, GUILD_ID)

if (!TOKEN || !CHANNEL_ID || !GUILD_ID) throw Error("Token not set.")

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

const prisma = prismaClient()

client.commands = new Collection()

// Set a new item in the Collection with the key as the command name and the value as the exported module

client.commands.set(help.data.name, help)
client.commands.set(createthread.data.name, createthread)
client.commands.set(submitmodal.data.name, submitmodal)

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.on(Events.GuildCreate, async (event) => {
  // check if the guild exists
  const existance = await getGuildByDiscordId(prisma, event.id)

  // search for the audit log of being added to the server
  const auditEvent = await event.fetchAuditLogs({ limit: 1, type: 28 })

  // get the user object from the audit logs.
  const user = auditEvent?.entries?.first()?.executor

  if (existance?.did && existance.timesAdded) {
    await updateGuild(prisma, {
      did: event.id,
      name: event.name,
      addedBy: event.ownerId,
      timesAdded: existance?.timesAdded + 1,
      enabled: true
    })
  } else {
    await createGuild(prisma, {
      did: event.id,
      name: event.name,
      addedBy: event.ownerId,
      timesAdded: 1
    })
  }

  const joinCommand = existance ? botReturn() : botJoin()

  user?.send(joinCommand)
})

client.on(Events.GuildDelete, async (event) => {
  const currentDateTime = getTimeForPrisma()
  await updateGuild(prisma, {
    did: event.id,
    name: event.name,
    enabled: false,
    dateRemoved: currentDateTime,
    addedBy: event.ownerId
  })
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isButton) return

  const guild = interaction.guild // Assuming you're using interactions

  const targetChannel = guild?.channels.cache.find(
    (channel) => channel.id === CHANNEL_ID
  )

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
    const command = interaction.client.commands.get(interaction.customId)

    console.log("Modal Submission " + interaction.customId)

    const thread = await command.execute(interaction, targetChannel)

    const link = `https://discord.com/channels/${targetChannel?.id}/${thread.thread}`

    interaction.reply(`Thank you. Your thread has been created. ${link}`)
  }
})

// Log in to Discord with your client's token
client.login(TOKEN)
