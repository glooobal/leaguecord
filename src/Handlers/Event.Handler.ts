import { Client } from 'discord.js';

import { Event } from '../Types';

import { readdirSync } from 'fs';
import { join } from 'path';

module.exports = (client: Client) => {
    let eventsDirectory = join(__dirname, '../Events');

    readdirSync(eventsDirectory).forEach((file) => {
        if (!file.endsWith('.ts')) return;

        let event: Event = require(`${eventsDirectory}/${file}`).default;

        event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
    });
};
