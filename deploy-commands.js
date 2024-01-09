const { REST, Routes } = require('discord.js');
const { clientId, guildId, token} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// list of commands
const commands = [];

// expecting a commands folder
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// for folders inside commands
for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // for .js files inside each folder we will try to collect data about the command
    for (const file of commandFiles){

        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // set new item in collection with key as command name and value as the exported module
        if('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or execute "property".`);
        }
    }
}

// handler for endpoinst REST
const rest = new REST().setToken(token);

(async () => {
    try {
        
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Reloading the commands
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);

    } catch (error) {
        console.error(error);
    }
})();