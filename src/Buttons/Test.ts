import { Button } from '../Interfaces/ButtonInterface';

const button: Button = {
	name: 'test',
	execute: async (interaction) => {
		await interaction.reply({
			content: 'test',
			ephemeral: true,
		});
	},
};

export default button;
