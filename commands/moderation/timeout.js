const { Client, Interaction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
// to be able to get the string time sent and transform it in miliseconds
const ms = require('ms');

module.exports = {
    category: 'moderation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user for a specific amount of time')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to be timed out')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Duration of the timeout (30m, 1h, 1 day - between 5 seconds and 28 days)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the timeout'))
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDMPermission(false),

    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {

        // getting info necessary to see if we can execute the command
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const duration = interaction.options.getString('duration');

        // beggining the reply
        await interaction.deferReply();

        // fetching the user being targeted
        const target = await interaction.guild.members.fetch(user);

        // target might have left the server considering the discord cache
        if(!target) {
            await interaction.editReply('The user does not exist in the server');
            return;
        }

        // case of trying to timeout a bot
        if(target.user.bot) {
            await interaction.editReply('It is not possible to timeout bots');
            return;
        }

        // making sure the duration of the timeout is valid
        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply('Provide a valid timeout duration');
            return;
        }

        // making sure the duration is inside pre defined range
        if (msDuration < 5000 || msDuration > 2.419e+9) {
            await interaction.editReply('Duration cannot be less than 5 seconds or more than 28 days');
            return;
        }

        // checking roles priority to see if the timeout can actually be done
        // will only let higher roles time out lower roles
        const targetUserRole = target.roles.highest.position;
        const requestUserRole = interaction.member.roles.highest.position;
        const botRole = interaction.guild.members.me.roles.highest.position;

        if(targetUserRole > requestUserRole) {
            await interaction.editReply('Cannot timeout user because they have a higher role than you');
            return;
        }

        // if the has a high enough role, such as owner, he will not be timeout ever
        if(targetUserRole > botRole) {
            await interaction.editReply('Cannot timeout user because they have a higher role than me (bot)');
            return;
        }

        // timeout time!
        try {
            
            // just to reply with a pretty time
            const { default: prettyMS } = await import('pretty-ms');

            // If the user is already timed out, we will update the timeout
            if(target.isCommunicationDisabled()) {
                await target.timeout(msDuration, reason);
                await interaction.editReply(`${target}'s timeout was updated to ${prettyMS(msDuration)}\nReason: ${reason}`);
                return;
            }

            // case the user was not in time out and will be timed out
            await target.timeout(msDuration, reason);
            await interaction.editReply(`${target}'s was timed out for ${prettyMS(msDuration)}\nReason: ${reason}`);

        } catch (error) {
            console.log(`There was an error when timing out: ${error}`);
        }

    }           
}