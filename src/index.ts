import {
  ChannelType,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ThreadChannel
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
  getUserByDiscordId,
  sendModalToUser,
  sendMessageToThread,
  getThreadByDiscordId,
  updatePost
} from "./functions"

import { adjustThread, botJoin, botReturn } from "./templates"
import getGuildFromInteraction from "./functions/getGuildFromInteraction"

const { TOKEN, CHANNEL_ID, GUILD_ID } = process.env

console.log(TOKEN, CHANNEL_ID, GUILD_ID)

if (!TOKEN || !CHANNEL_ID || !GUILD_ID) throw Error("Token not set.")

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
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
    await updateGuild(prisma, event.id, {
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
  await updateGuild(prisma, event.id, {
    did: event.id,
    name: event.name,
    enabled: false,
    dateRemoved: currentDateTime,
    addedBy: event.ownerId
  })
})

// on thread message
client.on(Events.MessageCreate, async (msg) => {
  if (msg.channel.type == ChannelType.PublicThread && !msg.author.bot) {
    // const threadInDb = await getThreadByDiscordId(prisma, msg.thread?.id as string)
    // i have recieved a message that was in a thread
    // i will check the thread exists in the db
    // i will get the post details from the db
  }
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (
    !interaction.isChatInputCommand() &&
    !interaction.isButton &&
    !interaction.isAnySelectMenu
  )
    return

  // as the slash command is coming from a DM, you need to link it to
  // the guild. Possibly having it on the custom id you click?
  // OR as i have a bloody database, just look up the user and get it's guild id?

  // either way, a little bit of thonk is needed here as well as
  // setting up the channel to be set based on the guild as well.

  // const { guild } = interaction.guild

  // console.log(guild)
  // console.log(guild?.id)
  // console.log(guild?.name)

  // console.log(interaction?.)

  const user = client.users.cache.find(
    (user) => user.id === interaction.user.id
  )

  if (interaction.isChatInputCommand()) {
    const guild = interaction.guildId

    // console.error(guild)

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

    const user = await getUserByDiscordId(prisma, interaction.user.id, {
      did: interaction.user.id,
      guildId: guildFromDb?.id
    })

    if (action.action == "replythread") {
      const thread = await getThreadByDiscordId(
        prisma,
        action?.threadId as string
      )

      console.log("REPLY")
      // reply as
      if (!interaction.channel?.isDMBased()) {
        console.log("Not coming from a DM")

        if (thread?.post.userId !== user?.id) {
          await interaction.reply({
            content: "Sorry, friend. this isn't your post to reply to.",
            ephemeral: true
          })
          return
        }
      }
      await sendModalToUser(
        interaction,
        guildFromDb?.did as string,
        action.threadId as string
      )
    }

    if (action.action == "closethread") {
      const thread = await getThreadByDiscordId(
        prisma,
        action?.threadId as string
      )

      console.log("CLOSE")

      if (!interaction.channel?.isDMBased()) {
        console.log("Not coming from a DM")

        if (thread?.post.userId !== user?.id) {
          await interaction.reply({
            content: "Sorry, friend. this isn't your post to reply to.",
            ephemeral: true
          })
          return
        }
      }

      const discordThread = await client.channels.fetch(
        action.threadId as string
      )

      if (!discordThread?.isThread()) return

      await discordThread.setLocked(true)

      await updatePost(prisma, thread?.post.did as string, {
        enabled: false,
        thread: {
          update: {
            closed: true
          }
        }
      })

      await interaction.reply({
        ephemeral: true,
        content: "Your thread has been closed."
      })
    }

    if (action.action == "deletethread") {
      const thread = await getThreadByDiscordId(
        prisma,
        action?.threadId as string
      )
      console.log("DELETE")
      const discordThread = await client.channels.fetch(
        action.threadId as string
      )
      if (!discordThread?.isThread()) return
      await discordThread.setArchived(true)
      await discordThread?.delete()

      const message = await discordThread.fetchStarterMessage()

      await message?.delete()

      await updatePost(prisma, thread?.post.did as string, {
        enabled: false,
        thread: {
          update: {
            deleted: true
          }
        }
      })

      interaction.reply({
        ephemeral: true,
        content: "Your thread has been destroyed."
      })
    }

    if (action.action === "createthread") {
      console.log("CREATE")
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
      // join channel goes here
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

    const dbUser = await getUserByDiscordId(prisma, interaction.user.id, {
      did: interaction.user.id,
      guildId: guildFromDbModal?.id
    })

    console.log("GUILD: ", guildFromDbModal?.id)
    console.log("USER: ", dbUser?.id)

    if (action.action == "submitreply") {
      const threadChannel = client?.channels.cache.find(
        (channel) => channel.id === action.threadId
      )

      if (!threadChannel?.isThread) return

      await sendMessageToThread(
        interaction,
        prisma,
        threadChannel as ThreadChannel,
        dbUser?.alias as string
      )

      const link = `https://discord.com/channels/${targetChannel?.id}/${threadChannel.id}`

      const userDiscordObject = await client.users.cache.find(
        (user) => user.id === dbUser?.did
      )

      if (interaction.channel?.isDMBased()) {
        userDiscordObject?.send(`Reply, sent! ${link}`)
      }
    }

    if (action.action == "submitmodal") {
      const command = interaction.client.commands.get(action.action)

      const thread = await command.execute(
        interaction,
        prisma,
        targetChannel,
        dbUser
      )

      const link = `https://discord.com/channels/${targetChannel?.id}/${thread.thread}`

      const userDiscordObject = await client.users.cache.find(
        (user) => user.id === dbUser?.did
      )

      userDiscordObject?.send(
        `Thank you. Your thread has been created. ${link}`
      )
    }
  }

  if (interaction.isAnySelectMenu()) {
    const action = getGuildFromInteraction(interaction.customId)

    const guildFromDb = await getGuildByDiscordId(
      prisma,
      action.guildId as string
    )

    const threadFromDb = await getThreadByDiscordId(
      prisma,
      interaction.values[0].toString()
    )

    const json = adjustThread(
      threadFromDb?.post.title as string,
      threadFromDb?.did as string,
      guildFromDb?.did as string
    )

    interaction.reply(json)
  }
})

client.login(TOKEN)
