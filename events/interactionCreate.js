const { Events, Collection, EmbedBuilder } = require('discord.js');
const { logChannelId } = require('../config.json');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isChatInputCommand()){

            const command = interaction.client.commands.get(interaction.commandName);
    
            if(!command){
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
        
            //COOLDOWN SLASH COMMAND SYSTEM
            const { cooldowns } = interaction.client;

            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const defaultCooldownDuration = 3;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    return interaction.reply({content: `Please wait, you are in cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            // COMMAND EXECUTION PORTION
            try { 
                // execution of the command
                await command.execute(interaction);

                // SLASH COMMAND LOGGING
                // the channel in question here is the command-log of my server
                const channel = await interaction.client.channels.cache.get(logChannelId);

                // data of the slash command
                const server = interaction.guild.name;
                const user = interaction.user.username;
                const userID = interaction.user.roles.highest.position;

                // message in the log
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Slash Command was used!')
                    .addFields({ name: 'Server Name', value: `${server}`})
                    .addFields({ name: 'Chat Command', value: `${interaction}`})
                    .addFields({ name: 'Command User', value: `${user} / ${userID}`})
                    .setTimestamp()
                    .setFooter({ text: 'Chat Command Executed' })
                
                await channel.send({ embeds: [embed] });

            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        
        // AUTOCOMPLETE INTERACTION CASE
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.autocomplete(interaction);
            } catch (err) {
                console.error(err);
            }
        }
    },
}