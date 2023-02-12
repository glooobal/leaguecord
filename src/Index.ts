import { Client, Collection, GatewayIntentBits } from 'discord.js';

import 'dotenv/config';

import { readdirSync } from 'fs';
import { join } from 'path';

const { Guilds, MessageContent, GuildMessages, GuildMembers } =
    GatewayIntentBits;

export const client = new Client({
    intents: [Guilds, MessageContent, GuildMessages, GuildMembers],
});

import { Button, Command } from './Types';

client.buttons = new Collection<string, Button>();
client.commands = new Collection<string, Command>();

const handlersDirectory = join(__dirname, './Handlers');
readdirSync(handlersDirectory).forEach((handler) => {
    require(`${handlersDirectory}/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);
