const { Interaction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
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

    /**
     * 
     * @param {Interaction} interaction 
     */
    async execute(interaction) {
        
        // getting info necessary to see if we can execute the command
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
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

        // making sure the duration of the timeout is valid
        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply('Provide a valid timeout duration');
            return;
        }

        // giving role for the determined time
        try {

            // just to reply with a pretty time
            const { default: prettyMS } = await import('pretty-ms');

            // checking if the user already has the role
            if(target.roles.cache.some(r => r.name === role.name)){
                interaction.editReply(`User ${target} already has the role ${role}`);
                return;
            }

            // adding the role
            target.roles.add(role);
            interaction.editReply(`${target} is ${role} for ${prettyMS(msDuration)}`);

            // creating the timeout that will remove the role
            setTimeout(async () => {
                await target.roles.remove(role);
            }, msDuration);

        } catch (error) {
            console.log(`Error happened while giving the role ${error}`);
        }
    }           
}