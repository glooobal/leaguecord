import 'dotenv/config';

import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';

import { Command } from '../../Interfaces/CommandInterface';
import { Logger } from '../Logger';

import { readdirSync } from 'fs';
import { join } from 'path';

export default async function loadCommands(client: Client) {
	try {
		const commands: SlashCommandBuilder[] = [];

		const commandsDirectory = join(__dirname, '../../Commands');
		const commandFiles = readdirSync(commandsDirectory).filter(
			(file) => file.endsWith('.ts') || file.endsWith('.js')
		);

		for (const file of commandFiles) {
			const command = (await import(`${commandsDirectory}/${file}`)) as {
				default: Command;
			};

			if (!command)
				return Logger.error(
					`Command file "${file}" does not export a default value.`
				);

			if (!command.default.command)
				return Logger.error(
					`Command file "${file}" does not export a command.`
				);

			if (!command.default.command.name)
				return Logger.error(
					`Command file "${file}" does not export a command name.`
				);

			if (!command.default.execute)
				return Logger.error(
					`Command file "${file}" does not export a command execute function.`
				);

			commands.push(command.default.command);
			client.commands.set(command.default.command.name, command.default);

			const rest = new REST({ version: '10' }).setToken(
				process.env.DISCORD_TOKEN
			);
			await rest.put(
				Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
				{
					body: commands,
				}
			);
		}
	} catch (err) {
		Logger.error(err as string);
	}
}
