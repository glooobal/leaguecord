import { Client } from 'discord.js';

import axios from 'axios';

import { readFileSync } from 'fs';
import { join } from 'path';

const apiKey = process.env.RIOT_KEY;

const riotUrl = 'api.riotgames.com/lol/';
const ddragonUrl = 'http://ddragon.leagueoflegends.com/';

export async function getLatestVersion(): Promise<string | any> {
    try {
        var response = await axios.get(`${ddragonUrl}api/versions.json`);

        return response.data[0];
    } catch (err) {
        console.error(err);
        return '13.3.1';
    }
}

export async function getSummonerAccount(
    name: string,
    region: string
): Promise<object | any> {
    try {
        var response = await axios.get(
            `https://${region}.${riotUrl}summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
        );

        var data = response.data;

        const summonerName = data.name;
        const summonerId = data.id;
        const accountId = data.accountId;
        const profileIconId = data.profileIconId;
        const summonerLevel = data.summonerLevel;

        const profileIconUrl = `${ddragonUrl}cdn/${await getLatestVersion()}/img/profileicon/${profileIconId}.png`;

        var response = await axios.get(
            `https://${region}.${riotUrl}summoner/v4/summoners/${summonerId}?api_key=${apiKey}`
        );

        var data = response.data;

        const puuId = data.puuId;

        return {
            name: summonerName,
            sId: summonerId,
            aId: accountId,
            pId: puuId,
            iconUrl: profileIconUrl,
            level: summonerLevel,
        };
    } catch (err) {
        console.error(
            `An error occured while fetching summoner IDs: ${err.message}`
        );

        return {
            name: undefined,
            sId: undefined,
            aId: undefined,
            pId: undefined,
            iconUrl: undefined,
            level: undefined,
        };
    }
}

export async function getChampion(championKey: string): Promise<object | any> {
    try {
        var response = await axios.get(
            `${ddragonUrl}cdn/${await getLatestVersion()}/data/en_US/champion.json`
        );

        var data = response.data.data;

        let championName: any;
        let championId: any;

        Object.keys(data).forEach((key) => {
            if (data[key]['key'] == championKey) {
                championId = data[key]['id'];
                championName = data[key]['name'];
            }
        });

        var championIcon = `${ddragonUrl}cdn/${await getLatestVersion()}/img/champion/${championId}.png`;
        var championSplash = `${ddragonUrl}cdn/img/champion/splash/${championId}_0.jpg`;

        return {
            name: championName,
            id: championId,
            championIcon: championIcon,
            championSplash: championSplash,
        };
    } catch (err) {
        console.error(
            `An error occured while fetching champion: ${err.message}`
        );

        return {
            name: undefined,
            id: undefined,
            championIcon: undefined,
            championSplash: undefined,
        };
    }
}

export async function getLiveGame(
    summonerId: string,
    region: string,
    client: Client
): Promise<string | any> {
    try {
        var response = await axios.get(
            `https://${region}.${riotUrl}spectator/v4/active-games/by-summoner/${summonerId}?api_key=${apiKey}`
        );

        var data = response.data;

        if (data) {
            var championKey = response.data.participants.find(
                (participant: { summonerId: string }) =>
                    participant.summonerId === summonerId
            ).championId;

            const champions = JSON.parse(
                readFileSync(
                    join(__dirname, './League.Champions.Emojis.json'),
                    'utf-8'
                )
            );

            var champion = await getChampion(championKey);
            var queueName = await getQueueName(data.gameQueueConfigId);

            var guild = client.guilds.cache.get(
                `${champions[champion.id].guildId}`
            );

            var emoji = guild.emojis.cache.get(
                `${champions[champion.id].emojiId}`
            );

            if (champion)
                return `Currently playing a **${queueName}** as **${emoji} ${champion.name}**`;
            else return 'Currently not playing.';
        } else {
            return `Currently not playing.`;
        }
    } catch (err) {
        return `Currently not playing.`;
    }
}

export async function getQueueName(queueId: number) {
    try {
        const response = await axios.get(
            'https://static.developer.riotgames.com/docs/lol/queues.json'
        );

        const queues = response.data;

        const queue = queues.find((queue) => queue.queueId === queueId);

        if (queue) return queue.description.slice(0, -1);
        else return 'Game';
    } catch (err) {
        console.error(
            `An error occured while fetching queue description: ${err.message}`
        );
        return 'Game';
    }
}

export async function getSummonerChampions(
    summonerId: string,
    region: string,
    client: Client
): Promise<string | any> {
    try {
        var response = await axios.get(
            `https://${region}.${riotUrl}champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${apiKey}`
        );

        var data = response.data;
        var mastery = [];

        for (let i = 0; i < 3; i++) {
            const champions = JSON.parse(
                readFileSync(
                    join(__dirname, './League.Champions.Emojis.json'),
                    'utf-8'
                )
            );

            var champion = await getChampion(data[i].championId);

            var guild = client.guilds.cache.get(
                `${champions[champion.id].guildId}`
            );

            var emoji = guild.emojis.cache.get(
                `${champions[champion.id].emojiId}`
            );

            mastery.push(
                `${emoji} **[${data[i].championLevel}]** ${i + 1}. ${
                    champion.name
                }: ${data[i].championPoints.toLocaleString('en-US')}`
            );
        }

        return mastery.join('\n');
    } catch (err) {
        console.error(
            `An error occured while fetching summoner champions mastery: ${err.message}`
        );

        return "You don't have any champion mastery.";
    }
}

export async function getSummonerRanked(
    summonerId: string,
    region: string,
    client: Client
): Promise<object | any> {
    try {
        var response = await axios.get(
            `https://${region}.${riotUrl}league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
        );

        var data = response.data[0];

        const ranks = JSON.parse(
            readFileSync(join(__dirname, './League.Ranks.Emojis.json'), 'utf-8')
        );

        var guild = client.guilds.cache.get(
            `${ranks[data.tier.toString().toLowerCase()].guildId}`
        );
        var emoji = guild.emojis.cache.get(
            `${ranks[data.tier.toString().toLowerCase()].emojiId}`
        );

        return {
            rank_emoji: emoji,
            rank: data.rank,
            tier: data.tier,
            lp: data.leaguePoints,
            wins: data.wins,
            losses: data.losses,
            wr: ((data.wins / (data.wins + data.losses)) * 100).toFixed() + '%',
        };
    } catch (error) {
        console.error(error);
        return error;
    }
}
