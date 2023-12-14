const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 'utility',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user'),
    async execute(interaction) {
        await interaction.reply(`Command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}!`);
    }
}