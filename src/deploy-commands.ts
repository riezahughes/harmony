import { REST, Routes } from "discord.js"
import { help } from "./commands"

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env

if (!CLIENT_ID || !GUILD_ID || !TOKEN) {
  throw Error("Missing ENV details")
}

const commands = [help.data.toJSON()]
// Grab all the command files from the commands directory you created earlier

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(TOKEN)

// and deploy your commands!
;(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands
    })

    console.log(`Successfully reloaded ${data} application (/) commands.`)
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()
