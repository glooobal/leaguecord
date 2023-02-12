import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { Command } from '../Types';

const command: Command = {
    command: new SlashCommandBuilder()
        .setName('info')
        .setDescription('View information about the bot'),
    execute: async (interaction) => {
        const infoEmbed = new EmbedBuilder()
            .setColor(process.env.DISCORD_EMBED_COLOR)
            .setAuthor({
                name: 'Leaguecord, your Discord LoL Assistant!',
                iconURL: `${interaction.client.user?.avatarURL()}`,
            })
            .setThumbnail(`${interaction.client.user?.avatarURL()}`)
            .setDescription('I can do various things, just check it out!')
            .addFields(
                {
                    name: 'Servers:',
                    value: `${interaction.client.guilds.cache.size}`,
                    inline: true,
                },
                {
                    name: 'Users:',
                    value: `${interaction.client.users.cache.size}`,
                    inline: true,
                },
                {
                    name: 'Commands:',
                    value: `${interaction.client.commands.size}`,
                    inline: true,
                },
                {
                    name: 'Memory Usage:',
                    value: `${(
                        process.memoryUsage().heapUsed /
                        1024 /
                        1024 /
                        1024
                    ).toFixed(2)} GB`,
                    inline: true,
                },
                {
                    name: 'Ping',
                    value: `${interaction.client.ws.ping} ms`,
                    inline: true,
                },
                {
                    name: 'Uptime:',
                    value: `${(interaction.client.uptime / 3600000).toFixed(
                        2
                    )} hours`,
                    inline: true,
                }
            )
            .setFooter({
                text: `Leaguecord isn't affiliated with Riot Games or League of Legends.`,
            });

        await interaction.reply({
            embeds: [infoEmbed],
        });
    },
};

export default command;
