const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a given person from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to be banned')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reasons for the ban')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
        .setDMPermission(false),
    async execute(interaction) {
        
        const user = interaction.options.getUser('person');
        const reason = interaction.options.getString('reason');

        console.log(user);
        console.log(reason);

        interaction.reply('Banning...');
    }           
}