import {
  ChannelType,
  Client,
  Collection,
  Events,
  GatewayIntentBits
} from "discord.js"
import { help } from "./commands"
import { createthread } from "./commands/createthread"
import { submitmodal } from "./commands/submitmodal"
import {
  createGuild,
  prismaClient,
  updateGuild,
  getTimeForPrisma,
  getGuildByDiscordId,
  getUserByDiscordId
} from "./functions"
import { botJoin, botReturn } from "./templates"
import getGuildFromInteraction from "./functions/getGuildFromInteraction"

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

  // get a list of all guilds you're connected to
  // check against the db
  // if it doesn't exist in the db, add it. (this should only happen due to downtime/crashes
  const guilds = client.guilds.cache

  client.user?.setActivity("/help - We can chat!")

  // Iterate over each guild in the collection
  guilds.forEach(async (guild) => {
    const check = await getGuildByDiscordId(prisma, guild.id)
    console.log(check)
    if (!check) {
      await createGuild(prisma, {
        did: guild.id,
        name: guild.name,
        addedBy: guild.ownerId,
        timesAdded: 1
      })
    }
  })
})

client.on(Events.GuildCreate, async (event) => {
  // check if the guild exists
  const existance = await getGuildByDiscordId(prisma, event.id)

  console.log("Guild doesn't exist")

  // search for the audit log of being added to the server
  const auditEvent = await event.fetchAuditLogs({ limit: 1, type: 28 })

  console.log("Grabbing audit user")

  // get the user object from the audit logs.
  const user = auditEvent?.entries?.first()?.executor

  if (existance?.did && existance.timesAdded) {
    console.log("Updating guild in db")
    await updateGuild(prisma, {
      did: event.id,
      name: event.name,
      addedBy: event.ownerId,
      timesAdded: existance?.timesAdded + 1,
      enabled: false
    })
  } else {
    console.log("Creating new guild record")
    await createGuild(prisma, {
      did: event.id,
      name: event.name,
      addedBy: event.ownerId,
      timesAdded: 1,
      enabled: false
    })
  }

  const joinCommand = existance ? botReturn(event?.id) : botJoin(event?.id)

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

  // as the slash command is coming from a DM, you need to link it to
  // the guild. Possibly having it on the custom id you click?
  // OR as i have a bloody database, just look up the user and get it's guild id?

  // either way, a little bit of thonk is needed here as well as
  // setting up the channel to be set based on the guild as well.

  // const { guild } = interaction.guild

  // console.log(guild)
  // console.log(guild?.id)
  // console.log(guild?.name)

  const user = client.users.cache.find(
    (user) => user.id === interaction.user.id
  )

  if (interaction.isChatInputCommand()) {
    const guild = interaction.guildId

    console.error(guild)

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction, prisma, guild, user)
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
    const action = getGuildFromInteraction(interaction.customId)

    const guildFromDb = await getGuildByDiscordId(
      prisma,
      action.guildId as string
    )

    const guildDiscordObject = client.guilds.cache.find(
      (guild) => guild.id === action.guildId
    )

    if (action.action === "createthread") {
      const command = interaction.client.commands.get("createthread")
      try {
        await command.execute(interaction, user, action.guildId)
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

    if (action.action == "createchannel") {
      const newChannel = await guildDiscordObject?.channels.create({
        name: "the-safe-space",
        topic:
          "A place where people can chat anonymously about anything. `/help` to get started!",
        type: ChannelType.GuildText,
        position: 0
      })

      await updateGuild(prisma, guildFromDb?.did as string, {
        enabled: true,
        channel: newChannel?.id
      })

      await interaction.reply(
        `The channel has been created and you are now set to go! Make sure to move it around and adjust permissions as neccessary! https://discord.com/channels/${guildDiscordObject?.id}/${newChannel?.id}`
      )
    }

    if (action.action == "joinchannel") {
    }
  }

  if (interaction.isModalSubmit()) {
    const action = getGuildFromInteraction(interaction.customId)

    const guildFromDbModal = await getGuildByDiscordId(
      prisma,
      action.guildId as string
    )

    const targetChannel = client?.channels.cache.find(
      (channel) => channel.id === guildFromDbModal?.channel
    )

    const dbUser = await getUserByDiscordId(prisma, interaction.user.id)

    const command = interaction.client.commands.get(action.action)

    const thread = await command.execute(
      interaction,
      prisma,
      targetChannel,
      dbUser
    )

    const link = `https://discord.com/channels/${targetChannel?.id}/${thread.thread}`

    interaction.reply(`Thank you. Your thread has been created. ${link}`)
  }
})

// Log in to Discord with your client's token
client.login(TOKEN)
