import { Interaction } from 'discord.js';

import { Event } from '../Types';

const event: Event = {
    name: 'interactionCreate',
    execute: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            return console.log('There are no commands');
        }

        try {
            command.execute(interaction);
        } catch (err) {
            interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
            console.error(err);
        }
    },
};

export default event;
