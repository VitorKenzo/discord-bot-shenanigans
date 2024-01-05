const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Give a user a role for a specific amount of time')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to receive the role')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
                .setDescription('Role to be given')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Duration the role will be applied (30m, 1h, 1 day)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        
        const user = interaction.options('user');
        const reason = interaction.options.getString('role');
        const duration = interaction.options.getInteger('duration')
        
        console.log(user);
        console.log(reason);
        console.log(duration);
        
        interaction.reply('Giving role...')
    }           
}