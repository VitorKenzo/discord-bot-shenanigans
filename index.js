const fs = require('node:fs');
const path = require('node:path');
// requiring the necessary discord.js classes
const {Client, Events, GatewayIntentBits, Collection, EmbedBuilder} = require('discord.js');
const { token, logChannelId } = require('./config.json');

// create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.cooldowns = new Collection();

// COMMAND HANDLER PORTION
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // set new item in collection with key as command name and value as the exported module
        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" ir execute "property".`);
        }
    }
}

// EVENT FILES HANDLER
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);