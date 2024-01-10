# [Choo Choo bot]

This discord bot is a small project where I explored the tech available to create 
one as well as getting an understanding of how to organize a project like this. We are using primarily **Javascript** as the programming language, **Node.js** to run it and **npm** to manage the packages, so before running it use **npm install**.

## Folder organization

The project is organized as the scheme below shows. All commands available are in the commands folder, separated by moderation and utility. The events folder holds all possible events that can happen that we want to check. The **index.js** file is the one that will activate the bot in question. The **deploy-commands.js** is the one that will refresh the commands to be used in the discord and should be run after any command adition and before running the bot for the first time. Since we are using node, both are run by **node `file`**

```
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
│       └── urban.js
├── events/
│   ├── interactioCreate.js
│   └── ready.js
├── .gitignore
├── deploy-commands.js
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Available commands

### Moderation Commands

- `/ban[user, reason]`: This command will ban the target member from the server. The reason for the ban is needed. It is not possible to ban the owner of the server, or try to ban someone with a higher role than you inside the server. Only roles with **banMembers** permission can use this command
- `/timeout[user, duration, reason]`: This command will timeout the target member for the especified duration. It converts times such as 10 seconds, 30 minutes, 2 day with no problem. The reason is optional here. It is not possible to timeout someone with a higher role than you in the server or timeout a bot. Only roles with **muteMembers** permission can use this command
- `/role[user, role, duration]`: This command will make the target member the role specified for the amount of time in duration. Only roles with the **Administrator** permission can use this command. The role will automatically be taken out after the time has passed, as long as the bot is still active. In case the bot stops working in the mean time, it will not be able to take out the role and will be necessary to remove it manually.
  

### Utility Commands

- `/echo [input, embed]`: Will copy the input string. Embed is a boolean to embed or not the output message
- `/guide [autocomplete]`: Command that would give different autocomplete options for a guide.(This command does not do anything, was just a autocomplete test)
- `/info [user|server]`: The command has 2 subcommands, one to give info about a user and another to give information about the server.
- `/ping`: Answers with pong and the actual ping of the response
- `/urban [term]`: Will search the term in the urban dictionary and return the first definition available.

## Information Safety

Some files will require a **config.json** file that has informations necessary to connect to the server:

- token
- ClientId
- GuildId
- logChannelId

This information is private and unique so if you want to try to run this project yourself, you should setup a project in [discord developers](https://discord.com/developers/docs/intro) and [discord](https://discord.com/) server to do so.

## Logging System

This bot is able to log all commands used by it in the channel specified by the logChannelId, which is a text channel of the discord server. The purpouse is to keep track of all commands used, who used those commands and when they where used as well.