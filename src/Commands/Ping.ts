import { SlashCommandBuilder } from 'discord.js';

import { Command } from '../Interfaces/CommandInterface';

const command: Command = {
	command: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows client ping.'),
	execute: async (interaction) => {
		await interaction.reply({
			content: `${interaction.client.ws.ping}ms`,
			ephemeral: true,
		});
	},
};

export default command;
