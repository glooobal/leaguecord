import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
	command: SlashCommandBuilder;
	execute: (interaction: CommandInteraction) => Promise<void>;
}
