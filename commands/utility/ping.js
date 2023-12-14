const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 'utility',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies Pong with ping'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pong!', fetchReply: true});
        // interaction.editReply(`Pong! Ponged with ${sent.createdTimestamp - interaction.createdTimestamp}ms of latency!`);
        interaction.followUp({
            content: `Ponged with ${sent.createdTimestamp - interaction.createdTimestamp}ms of latency!`,
            ephemeral: true
        });
    }
}