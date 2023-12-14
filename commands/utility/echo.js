const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'utility',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Input to echo back')
                .setRequired(true)
                .setMaxLength(2000))
        .addBooleanOption(option => 
            option.setName('embed')
                .setDescription('Wheter to embed or not the message, defaults to not embed')),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        
        var to_embed = false;
        //ensuring is going to be a true or false value
        if(!(interaction.options.getBoolean('embed') === null)){
            to_embed = interaction.options.getBoolean('embed');
        } 

        if (to_embed) {
            const embeded_input = new EmbedBuilder()
                .setColor(0xFF99FF)
                .setTitle('Echoed Message')
                .setDescription(input);
            interaction.reply({embeds: [embeded_input]});
        } else {
            interaction.reply(input);
        }
    }
}