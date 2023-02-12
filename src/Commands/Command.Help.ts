import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';

import { Command } from '../Types';

const command: Command = {
    command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Leaguecord command list!'),
    execute: async (interaction) => {
        const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel('Invite me!')
                .setStyle(ButtonStyle.Link)
                .setURL(
                    `https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=311360&scope=bot%20applications.commands`
                ),
            new ButtonBuilder()
                .setLabel('Support server')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.gg/FM6QCaa8gt`)
        );

        const helpEmbed = new EmbedBuilder()
            .setColor(process.env.DISCORD_EMBED_COLOR)
            .setAuthor({
                name: 'Leaguecord, your Discord LoL Assistant!',
                iconURL: `${interaction.client.user?.avatarURL()}`,
            })
            .addFields(
                {
                    name: '/help',
                    value: 'Shows this command list',
                    inline: true,
                },
                {
                    name: '/info',
                    value: 'View information about the bot',
                    inline: true,
                },
                {
                    name: '/invite',
                    value: 'Invite Leaguecord to your server!',
                    inline: true,
                },
                {
                    name: '/summoner',
                    value: 'View info about a summoner',
                    inline: true,
                }
            );

        await interaction.reply({
            embeds: [helpEmbed],
            components: [buttons],
        });
    },
};

export default command;
