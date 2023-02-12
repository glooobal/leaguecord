import get from 'axios';

import { DDRAGON_URL } from './League.Constants';

export async function getLatestVersion(): Promise<string | any> {
    try {
        const { data } = await get(`${DDRAGON_URL}/api/versions.json`);

        return data[0];
    } catch (err) {
        console.error(err);
        return '13.3.1';
    }
}

export async function getQueueName(queueId: number) {
    try {
        const { data } = await get(
            'https://static.developer.riotgames.com/docs/lol/queues.json'
        );

        const queue = data.find((queue) => queue.queueId === queueId);

        return queue ? queue.description.slice(0, -1) : 'Game';
    } catch (err) {
        console.error(
            `An error occured while fetching queue description: ${err.message}`
        );

        return 'Game';
    }
}
