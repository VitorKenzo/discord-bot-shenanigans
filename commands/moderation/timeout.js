const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user for a specific amount of time')
        .addStringOption(option =>
            option.setName('person')
                .setDescription('Person to be timed out')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reasons for the ban')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('Amount of minutes of the timeout')
                .setRequired(true)),
    async execute(interaction) {
        const person = interaction.options.getString('person');
        const reason = interaction.options.getString('reason');
        const time = interaction.options.getInteger('time');

        console.log(person);
        console.log(reason);
        console.log(time);

        interaction.reply('Banning...')
    }           
}