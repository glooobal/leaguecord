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
    getSummonerRanked,
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
                    { name: 'Japan', value: 'JP1' },
                    { name: 'Republic of Korea', value: 'KR' },
                    { name: 'The Philippines', value: 'PH2' },
                    { name: 'Singapore, Malaysia, & Indonesia', value: 'SG2' },
                    { name: 'Taiwan, Hong Kong, and Macao', value: 'TW2' },
                    { name: 'Thailand', value: 'TH2' },
                    { name: 'Vietnam', value: 'VN2' }
                )
                .setRequired(true);
        }),
    execute: async (interaction) => {
        const name = interaction.options.get('name').value.toString();
        const region = interaction.options.get('region').value.toString();

        const summoner = await getSummonerAccount(name, region);

        if (summoner.summonerName != undefined) {
            const summonerStats = await getSummonerRanked(
                summoner.summonerId,
                region,
                interaction.client
            );

            const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setLabel('op.gg')
                    .setStyle(ButtonStyle.Link)
                    .setURL(
                        `https://op.gg/summoners/${region}/${summoner.summonerName}`
                    ),
                new ButtonBuilder()
                    .setLabel('blitz.gg')
                    .setStyle(ButtonStyle.Link)
                    .setURL(
                        `https://blitz.gg/summoners/${region}/${summoner.summonerName}`
                    )
            );

            const summonerEmbed = new EmbedBuilder()
                .setColor('DarkVividPink')
                .setTitle(
                    `🎉 Summoner: ${summoner.summonerName} (${summoner.summonerLevel})`
                )
                .setDescription('Hey, look! Here it is:')
                .setThumbnail(summoner.profileIconUrl);

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
