import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';

import 'dotenv/config';

const commands = [];

const commandsPath = join(resolve(), 'src/commands');
const commandFiles = readdirSync(commandsPath);

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const { data, execute } = await import(filePath);

  if (data && execute) {
    commands.push(data.toJSON());
  } else {
    console.error(
      `${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    const data = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT),
      { body: commands },
    );

    console.info(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
})();
