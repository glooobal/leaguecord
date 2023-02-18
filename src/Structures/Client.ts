import 'dotenv/config';

import { Client, Collection, GatewayIntentBits } from 'discord.js';

const { Guilds, GuildMessages } = GatewayIntentBits;

import { Button } from '../Interfaces/ButtonInterface';
import { Command } from '../Interfaces/CommandInterface';

import loadButtons from '../Utils/Managers/ButtonManager';
import loadCommands from '../Utils/Managers/CommandManager';
import loadEvents from '../Utils/Managers/EventManager';
import loadDatabase from '../Utils/Managers/DatabaseManager';

import { Logger } from '../Utils/Logger';

export class LeaguecordClient {
	public buttons = new Collection<string, Button>();
	public commands = new Collection<string, Command>();

	public readonly client: Client = new Client({
		intents: [Guilds, GuildMessages],
	});

	public constructor() {
		this.client
			.login(process.env.DISCORD_TOKEN)
			.catch((err) => Logger.error(err));

		this.client.on('warn', (warn) => Logger.warn(warn));
		this.client.on('error', (error) => Logger.error(error));

		this.client.buttons = this.buttons;
		this.client.commands = this.commands;

		loadButtons(this.client).catch((err) => Logger.error(err));
		loadCommands(this.client).catch((err) => Logger.error(err));
		loadEvents(this.client).catch((err) => Logger.error(err));
		loadDatabase().catch((err) => Logger.error(err));
	}
}
