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
        .setName('invite')
        .setDescription('Invite Leaguecord to your server!'),
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

        const inviteEmbed = new EmbedBuilder()
            .setColor(process.env.DISCORD_EMBED_COLOR)
            .setAuthor({
                name: 'Leaguecord, your Discord LoL Assistant!',
                iconURL: `${interaction.client.user?.avatarURL()}`,
            })
            .setThumbnail(`${interaction.client.user?.avatarURL()}`)
            .setDescription('Invite the Leaguecord bot to your server!')
            .addFields(
                {
                    name: 'Invite:',
                    value: '[Add the bot to your server](https://discord.com/api/oauth2/authorize?client_id=1071897662657400842&permissions=311360&scope=bot%20applications.commands)',
                    inline: true,
                },
                {
                    name: 'Support Server:',
                    value: '[Join the support server](https://discord.gg/FM6QCaa8gt)',
                    inline: true,
                }
            );

        await interaction.reply({
            embeds: [inviteEmbed],
            components: [buttons],
        });
    },
};

export default command;
