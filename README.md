# Mental Health Discord Bot

This bot is being created to help those who struggle to reach out. It will be an anonymous messaging service in which you can create threads and reply anonymously. There's not much else to it. It will support using ChatGPT and a simple list of nouns/verbs to help hide who's really writing by making everyones tone seem the same. Below are some simple user stories and milestones.

As a user i want to be able to post my feelings anonymously

- [x] Create Working Slash Command (/help)
- [x] Create DM response after slash command
- [x] Create Button interaction for creating a new thread

As a user i want to be able to respond to my thread anonymously

- [ ] Create a DM that shows there has been activity, relay it to them and offer actions
- [ ] Alllow the user to respond, still using their same anonymity, into the thread. Chat GPT will also muddle the responses

As a user i want to be able to close any conversations, with the option to completely remove the thread

- [ ] Offer interactions which will allow the user at any point to close or completely delete the thread.

# As a bonus to this:

---

Break the bot out to deal with multiple servers

- [ ] Set the slash command to be available "globally".
- [ ] Set up database for storing guild id's, user id's, channel id's, post id's and thread id's
- [ ] On join of server, save guild id, save user who added bot.
- [ ] Message the user who added so you can select which channel to use (list/string input/by id)
- [ ] Save the channel id.
- [ ] On /help, check if the user exists. If the user doesn't exist, store their user id against the guild they used the command from, and create a custom name against them using the name generator.
- [ ] On "create thread" store the created post and thread id's against the user. (One to many).
- [ ] On reply, keep a stock of how many replies have been sent

# Quick Commands

`bunx prisma migrate dev --name [name]` - migration
`bunx prisma generate` - create new package to import
https://diascord.com/api/oauth2/authorize?client_id=1176575107104247859&permissions=397351660752&scope=bot
