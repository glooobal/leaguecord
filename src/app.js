import { Client, Collection, GatewayIntentBits } from 'discord.js';

import { readdirSync } from 'fs';
import { join, resolve } from 'path';

import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = join(resolve(), 'src/commands');
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith('.js'),
);

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const { data, execute } = await import(filePath);

  if (data && execute) {
    client.commands.set(data.name, { data, execute });
  } else {
    console.error('No data or execute in', filePath);
  }
}

const eventsPath = join(resolve(), 'src/events');
const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith('.js'),
);

for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = await import(filePath).then(
    (module) => module.default || module,
  );

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);
