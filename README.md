# [Choo Choo bot]

This discord bot is a small project where I explored the tech available to create 
one as well as getting an understanding of how to organize a project like this one.

## Folder organization

The project is organized as below. All commands available are in the commands folder, separated by moderation and utility. The events folder holds all possible events that can happen and node_modules have all the dependencies necessary to run the bot.

discord-bot-shenanigans/
├── commands/
│   ├── moderation/
│   │   ├── ban.js
│   │   ├── role.js
│   │   └── timeout.js
│   └── utility/
│       ├── echo.js
│       ├── guide.js
│       ├── info.js
│       ├── ping.js
│       ├── reload.js
│       └── urban.js
├── events/
│   ├── interactioCreate.js
│   └── ready.js
├── node_modules/
│   └── **...**
├── .gitignore
├── deploy-commands.js
├── index.js
├── package-lock.json
├── package.json
└── README.md

## Available commands

### Moderation Commands

- `/ban[user, reason]`: This command will ban the target member from the server. The reason for the ban is needed. It is not possible to ban the owner of the server, or try to ban someone with a higher role than you inside the server. Only roles with **banMembers** permission can use this command
- `/timeout[user, duration, reason]`: This command will timeout the target member for the especified duration. It converts times such as 10 seconds, 30 minutes, 2 day with no problem. The reason is not needed. It is not possible to timeout someone with a higher role than you in the server or timeout a bot. Only roles with **muteMembers** permission can use this command
- `/role[user, role, duration]`: This command will make the target member the role specified for the amount of time in duration. Only roles with the **Administrator** permission can use this command
  

### Utility Commands

- `/echo [input, embed]`: Will copy the input string. Embed is a boolean to embed or not the output message
- `/guide [autocomplete]`: Command that would give different autocomplete options for a guide.(This command does not do anything, was just a autocomplete test)
- `/info [user|server]`: The command has 2 subcommands, one to give info about a user and another to give information about the server.
- `/ping`: Answers with pong and the actual ping of the response
- `/reload [user]`: Command used to reload a certain command
- `/urban [term]`: Will search the term in the urban dictionary and return the first definition available.

## Information necessary

Some files will require a **config.json** file that has informations necessary to connect to the server:

- token
- ClientId
- GuildId
- logChannelId



## Logging System

This bot is able to log all commands used by it in the specified logChannelId, which is a text channel of the discord server.