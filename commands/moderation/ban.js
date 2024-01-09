const { Interaction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        
        // getting the info necessary to execute the command
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        // getting the targeted user
        const target = await interaction.guild.members.fetch(user);

        // case user already left the server
        if(!target) {
            
            await interaction.reply({ content:"User does not exist in the server anymore", ephemeral:true});
            return;
        }

        // case the user targeted is the ownser of the server
        if(target.id === interaction.guild.ownerId) {
            await interaction.reply({ content: "You cannot ban the owner of the server", ephemeral:true });
            return;
        }

        //checking it bot the bot and user have role permission to execute the ban
        const targetUserRole = target.roles.highest.position;
        const requestUserRole = interaction.member.roles.highest.position;
        const botRole = interaction.guild.members.me.roles.highest.position;

        if(targetUserRole > requestUserRole) {
            await interaction.reply({ content:"Cannot ban user because they have a higher role than you", ephemeral:true });
            return;
        }

        if(targetUserRole > botRole) {
            await interaction.reply({ content:"Cannot ban user because they have a higher role than me (bot)", ephemeral:true });
            return;
        }

        // banning the user
        try {
            
            await interaction.guild.members.ban(user);
            await interaction.reply({ content:`User ${target} was banned!\nReason: ${reason}`, ephemeral:true});

        } catch (error) {
            console.log(`Error while banning the user: ${error}`);
        }

    }           
}