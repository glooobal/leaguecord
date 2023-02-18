import { Collection } from 'discord.js';

import { Button } from './ButtonInterface';
import { Command } from './CommandInterface';

declare module 'discord.js' {
	export interface Client {
		buttons: Collection<string, Button>;
		commands: Collection<string, Command>;
	}
}
