const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// to be able to get the string time sent and transform it in miliseconds
const ms = require('ms');

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
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Role to be given')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Duration the role will be applied (30m, 1h, 1 day)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getRole('role');
        const duration = interaction.options.getString('duration');
        
        console.log(user);
        console.log(reason);
        console.log(duration);
        
        interaction.reply('Giving role...')
    }           
}