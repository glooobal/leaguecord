import { Client } from 'discord.js';
import get from 'axios';

import { readFileSync } from 'fs';
import { join } from 'path';

import { getLatestVersion, getQueueName } from './League.Helpers';

import { RIOT_API_KEY, RIOT_API_URL, DDRAGON_URL } from './League.Constants';

export async function getSummonerAccount(
    name: string,
    region: string
): Promise<object | any> {
    try {
        const { data } = await get(
            `https://${region}.${RIOT_API_URL}/summoner/v4/summoners/by-name/${name}?api_key=${RIOT_API_KEY}`
        );

        const {
            name: summonerName,
            id: summonerId,
            puuid,
            profileIconId,
            summonerLevel,
        } = data;

        const iconUrl = `${DDRAGON_URL}/cdn/${await getLatestVersion()}/img/profileicon/${profileIconId}.png`;

        return {
            name: summonerName,
            id: summonerId,
            puuid: puuid,
            icon: iconUrl,
            level: summonerLevel,
        };
    } catch (err) {
        console.error(
            `An error occured while fetching summoner IDs: ${err.message}`
        );

        return {
            name: undefined,
            id: undefined,
            puuid: undefined,
            icon: undefined,
            level: undefined,
        };
    }
}

export async function getChampion(championKey: string): Promise<object | any> {
    try {
        const { data } = await get(
            `${DDRAGON_URL}/cdn/${await getLatestVersion()}/data/en_US/champion.json`
        );

        const championData = data.data;
        let champion: object | undefined;

        for (const key of Object.keys(championData)) {
            if (championData[key]['key'] == championKey) {
                champion = {
                    id: championData[key]['id'],
                    name: championData[key]['name'],
                    icon: `${DDRAGON_URL}/cdn/${await getLatestVersion()}/img/champion/${
                        championData[key]['id']
                    }.png`,
                    splash: `${DDRAGON_URL}/cdn/img/champion/splash/${championData[key]['id']}_0.jpg`,
                };
                break;
            }
        }

        if (!champion) {
            console.error(`Champion with key "${championKey}" not found.`);
            return {
                name: undefined,
                id: undefined,
                icon: undefined,
                splash: undefined,
            };
        }

        return champion;
    } catch (err) {
        console.error(
            `An error occured while fetching champion: ${err.message}`
        );

        return {
            name: undefined,
            id: undefined,
            icon: undefined,
            splash: undefined,
        };
    }
}

export async function getLiveGame(
    summonerId: string,
    region: string,
    client: Client
): Promise<string> {
    try {
        const { data } = await get(
            `https://${region}.${RIOT_API_URL}/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`
        );

        if (!data) return `Currently not playing.`;

        const championId = data.participants.find(
            (participant: { summonerId: string }) =>
                participant.summonerId === summonerId
        ).championId;

        const champion = await getChampion(championId);
        const queueName = await getQueueName(data.gameQueueConfigId);

        if (!champion) return `Currently not playing.`;

        return `Currently playing a **${queueName}** as **${champion.name}**`;
    } catch (error) {
        return `Currently not playing.`;
    }
}

export async function getMatchesNumber(
    puuId: string,
    region: string,
    startTime: number,
    endTime: number,
    count: number
): Promise<number | any> {
    const regions = {
        americas: ['BR1', 'LA1', 'LA2', 'NA1'],
        europe: ['EUN1', 'EUW1', 'RU', 'TR1'],
        asia: ['JP1', 'KR', 'OC1'],
    };

    let riotRegion: string;

    Object.entries(regions).forEach(([key, values]) => {
        if (values.includes(region)) {
            riotRegion = key;
        }
    });

    if (!riotRegion) return 'Invalid region provided.';

    try {
        const { data } = await get(
            `https://${riotRegion}.${RIOT_API_URL}/match/v5/matches/by-puuid/${puuId}/ids?startTime=${startTime}&endTime=${endTime}&count=${count}&api_key=${RIOT_API_KEY}`
        );

        return data.length;
    } catch (err) {
        console.error(err);
        return 'An error occured while fetching matches number.';
    }
}

export async function getSummonerChampions(
    summonerId: string,
    region: string,
    client: Client
): Promise<string | any> {
    try {
        const { data } = await get(
            `https://${region}.${RIOT_API_URL}/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`
        );

        const championsMastery = await Promise.all(
            data.slice(0, 3).map(async (championMastery, i) => {
                const champion = await getChampion(championMastery.championId);

                return `**[${championMastery.championLevel}]** ${i + 1}. ${
                    champion.name
                }: ${championMastery.championPoints.toLocaleString('en-US')}`;
            })
        );

        return championsMastery.join('\n');
    } catch (err) {
        console.error(
            `An error occured while fetching summoner champions mastery: ${err.message}`
        );

        return "You don't have any champion mastery.";
    }
}

export async function getSummonerRankData(
    summonerId: string,
    region: string,
    client: Client
): Promise<object | any> {
    try {
        const { data } = await get(
            `https://${region}.${RIOT_API_URL}/league/v4/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`
        );

        const [rankData] = data;

        return {
            rank: rankData.rank,
            tier: rankData.tier,
            lp: rankData.leaguePoints,
            wins: rankData.wins,
            losses: rankData.losses,
            wr:
                (
                    (rankData.wins / (rankData.wins + rankData.losses)) *
                    100
                ).toFixed() + '%',
        };
    } catch (err) {
        console.error(
            `An error occured while fetching summoner rank data: ${err.message}`
        );

        return { error: 'An error occured while fetching summoner rank data.' };
    }
}
