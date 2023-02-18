import { ActivityType, Client } from 'discord.js';

import { Event } from '../Interfaces/EventInterface';
import { Logger } from '../Utils/Logger';

const event: Event = {
	name: 'ready',
	once: true,
	execute: (client: Client) => {
		Logger.info('Successfully connected to Discord.');

		client.user?.setActivity({
			name: '🎉 Working',
			type: ActivityType.Watching,
		});
	},
};

export default event;
