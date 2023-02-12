import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';

import { Command } from '../Types';

import {
    getSummonerAccount,
    getSummonerChampions,
    getLiveGame,
    getSummonerRankData,
    getMatchesNumber,
} from '../Services/League.Game';

const command: Command = {
    command: new SlashCommandBuilder()
        .setName('summoner')
        .setDescription('View info about a summoner')
        .addStringOption((option) => {
            return option
                .setName('name')
                .setDescription('Summoner name.')
                .setMaxLength(16)
                .setRequired(true);
        })
        .addStringOption((option) => {
            return option
                .setName('region')
                .setDescription('Region.')
                .addChoices(
                    { name: 'Brazil', value: 'BR1' },
                    { name: 'Europe Nordic & East', value: 'EUN1' },
                    { name: 'Europe West', value: 'EUW1' },
                    { name: 'Latin America North', value: 'LA1' },
                    { name: 'Latin America South', value: 'LA2' },
                    { name: 'North America', value: 'NA1' },
                    { name: 'Oceania', value: 'OC1' },
                    { name: 'Russia', value: 'RU' },
                    { name: 'Turkey', value: 'TR1' },
                    { name: 'Japan', value: 'JP1' }
                )
                .setRequired(true);
        }),
    execute: async (interaction) => {
        const name = interaction.options.get('name').value.toString();
        const region = interaction.options.get('region').value.toString();

        const client = interaction.client;

        const summoner = await getSummonerAccount(name, region);

        const today = new Date();

        const todayStartTime = today.setHours(0, 0, 0, 0) / 1000;
        const todayEndTime = todayStartTime + 24 * 60 * 60 - 1;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const yesterdayStartTime = yesterday.setHours(0, 0, 0, 0) / 1000;
        const yesterdayEndTime = yesterdayStartTime + 24 * 60 * 60 - 1;

        if (summoner.name != undefined) {
            const summonerStats = await getSummonerRankData(
                summoner.id,
                region,
                client
            );

            const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setLabel('op.gg')
                    .setStyle(ButtonStyle.Link)
                    .setURL(
                        new URL(
                            `https://op.gg/summoners/${region}/${summoner.name}`
                        ).toString()
                    ),
                new ButtonBuilder()
                    .setLabel('blitz.gg')
                    .setStyle(ButtonStyle.Link)
                    .setURL(
                        new URL(
                            `https://blitz.gg/lol/profile/${region}/${summoner.name}`
                        ).toString()
                    )
            );

            const summonerEmbed = new EmbedBuilder()
                .setColor(process.env.DISCORD_EMBED_COLOR)
                .setAuthor({
                    name: `Summoner: ${summoner.name} (${summoner.level})`,
                    iconURL: `${interaction.client.user?.avatarURL()}`,
                })
                .setDescription(
                    `Games played today: ${await getMatchesNumber(
                        summoner.puuid,
                        region,
                        todayStartTime,
                        todayEndTime,
                        50
                    )}, yesterday: ${await getMatchesNumber(
                        summoner.puuid,
                        region,
                        yesterdayStartTime,
                        yesterdayEndTime,
                        50
                    )}`
                )
                .addFields(
                    {
                        name: 'Top Champions:',
                        value: `${await getSummonerChampions(
                            summoner.id,
                            region,
                            client
                        )}`,
                        inline: true,
                    },
                    {
                        name: 'Ranked Stats:',
                        value: `**${summonerStats.tier} ${summonerStats.rank} ${summonerStats.lp}LP**\n${summonerStats.wins}W ${summonerStats.losses}L\nWinrate: ${summonerStats.wr}`,
                        inline: true,
                    },
                    {
                        name: 'Live Game:',
                        value: `${await getLiveGame(
                            summoner.id,
                            region,
                            client
                        )}`,
                        inline: false,
                    }
                )
                .setThumbnail(summoner.icon);

            await interaction.reply({
                embeds: [summonerEmbed],
                components: [buttons],
            });
        } else {
            const errorEmbed = new EmbedBuilder()
                .setColor('LightGrey')
                .setTitle('💢 Something went wrong!')
                .setDescription('Please enter correct summoner name.');

            await interaction.reply({ embeds: [errorEmbed] });
        }
    },
};

export default command;
