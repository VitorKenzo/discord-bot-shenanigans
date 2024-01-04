const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Give a user a role for a specific amount of time')
        .addStringOption(option =>
            option.setName('person')
                .setDescription('Person to be banned')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
                .setDescription('Role to be given')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('Time in minutes the role will be applied')
                .setRequired(true)),
    async execute(interaction) {
        
        const person = interaction.options.getString('person');
        const reason = interaction.options.getString('role');
        const time = interaction.options.getInteger('time')
        
        console.log(person);
        console.log(reason);
        console.log(time);
        
        interaction.reply('Giving role...')
    }           
}