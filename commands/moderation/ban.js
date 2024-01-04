const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a given person from the server')
        .addStringOption(option =>
            option.setName('person')
                .setDescription('Person to be banned')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reasons for the ban')
                .setRequired(true)),
    async execute(interaction) {
        
        const person = interaction.options.getString('person');
        const reason = interaction.options.getString('reason');

        console.log(person);
        console.log(reason);

        interaction.reply('Banning...');
    }           
}