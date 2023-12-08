# Mental Health Discord Bot

![image](https://github.com/riezahughes/health-clinic/assets/29428400/0577c1a1-9fbb-4832-ba7d-dabae1e1dca5)

This bot is being created to help those who struggle to reach out. It will be an anonymous messaging service in which you can create threads and reply anonymously. There's not much else to it. It will support using ChatGPT and a simple list of nouns/verbs to help hide who's really writing by making everyones tone seem the same. Below are some simple user stories and milestones.

As a user i want to be able to post my feelings anonymously

- [x] Create Working Slash Command (/help)
- [x] Create DM response after slash command
- [x] Create Button interaction for creating a new thread

As a user i want to be able to respond to my thread anonymously

- [ ] Create a DM that shows there has been activity, relay it to them and offer actions
- [x] Alllow the user to respond, still using their same anonymity, into the thread. Chat GPT will also muddle the responses

As a user i want to be able to close any conversations, with the option to completely remove the thread

- [x] Offer interactions which will allow the user at any point to close or completely delete the thread.

# As a bonus to this:

---

Break the bot out to deal with multiple servers

- [x] Set the slash command to be available "globally".
- [x] Set up database for storing guild id's, user id's, channel id's, post id's and thread id's
- [x] On join of server, save guild id, save user who added bot.
- [x] Message the user who added so you can select which channel to use (list/string input/by id)
- [x] Save the channel id.
- [x] On /help, check if the user exists. If the user doesn't exist, store their user id against the guild they used the command from, and create a custom name against them using the name generator.
- [x] On "create thread" store the created post and thread id's against the user. (One to many).
- [ ] On reply, keep a stock of how many replies have been sent? Maybe? Maybe not? Metrics, probably.

# Extra Setup

- [x] Set up bun on the server
- [x] Create a user on the server for github
- [x] Set up ssh for the account using that user
- [x] Create a limited directory for github to send files to
- [x] Set up a service for the directory (daemon)
- [x] Set up a github action to, on merge, checkout, send files via ssh and trigger a restart on ssh

# Quick Commands

`bunx prisma migrate dev --name [name]` - migration
`bunx prisma generate` - create new package to import

# Reminders

- sort out proper editting of messages and pings by the bot
- Sort out all the shitty "commands" folder crap. Seriously it's awful
- Logging adjustment
- Sort out an issue with mobile, where thread show the buttons in the OP but dont on desktop (will need to sort functionality
  )
- changing channels
