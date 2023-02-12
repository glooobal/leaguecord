import { ActivityType, Client } from 'discord.js';

import { Event } from '../Types';

const event: Event = {
    name: 'ready',
    once: true,
    execute: (client: Client) => {
        client.user.setActivity({
            name: '/summoner • Hello!',
            type: ActivityType.Watching,
        });
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
};

export default event;
