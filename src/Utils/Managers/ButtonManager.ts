import { Client } from 'discord.js';

import { Button } from '../../Interfaces/ButtonInterface';
import { Logger } from '../Logger';

import { readdirSync } from 'fs';
import { join } from 'path';

export default async function loadButtons(client: Client) {
	try {
		const buttonsDirectory = join(__dirname, '../../Buttons');
		const buttonsFiles = readdirSync(buttonsDirectory).filter(
			(file) => file.endsWith('.ts') || file.endsWith('.js')
		);

		for (const file of buttonsFiles) {
			if (!file.endsWith('.ts') && !file.endsWith('.js')) return;

			const button = (await import(`${buttonsDirectory}/${file}`)) as {
				default: Button;
			};

			if (!button.default)
				return Logger.error(
					`Button file "${file}" does not export a default value.`
				);

			if (!button.default.name)
				return Logger.error(
					`Button file "${file}" does not export a name.`
				);

			if (!button.default.execute)
				return Logger.error(
					`Button file "${file}" does not export a execute function.`
				);

			client.buttons.set(button.default.name, button.default);
		}
	} catch (err) {
		Logger.error(err as string);
	}
}
