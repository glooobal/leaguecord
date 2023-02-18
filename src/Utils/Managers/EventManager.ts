import { Client } from 'discord.js';

import { Event } from '../../Interfaces/EventInterface';
import { Logger } from '../Logger';

import { readdirSync } from 'fs';
import { join } from 'path';

export default async function loadEvents(client: Client) {
	try {
		const eventsDirectory = join(__dirname, '../../Events');
		const eventFiles = readdirSync(eventsDirectory).filter(
			(file) => file.endsWith('.ts') || file.endsWith('.js')
		);

		for (const file of eventFiles) {
			const event = (await import(`${eventsDirectory}/${file}`)) as {
				default: Event;
			};

			if (!event.default)
				return Logger.error(
					`Event file "${file}" does not export a default value.`
				);

			if (!event.default.name)
				return Logger.error(
					`Event file "${file}" does not export a name.`
				);

			if (!event.default.execute)
				return Logger.error(
					`Event file "${file}" does not export a execute function.`
				);

			// prettier-ignore
			event.default.once
				? client.once(event.default.name, (...args) => event.default.execute(...args)) // eslint-disable-line @typescript-eslint/no-unsafe-argument -- This is a Discord.js event, so it can be anything.
				: client.on(event.default.name, (...args) => event.default.execute(...args)); // eslint-disable-line @typescript-eslint/no-unsafe-argument -- This is a Discord.js event, so it can be anything.
		}
	} catch (err) {
		Logger.error(err as string);
	}
}
