import { Interaction, PermissionsBitField } from 'discord.js';

import { Event } from '../Types';

const event: Event = {
    name: 'interactionCreate',
    execute: async (interaction: Interaction) => {
        if (!interaction.isButton()) return;

        const button = interaction.client.buttons.get(interaction.customId);

        if (!button) return;

        try {
            if (button.permissions) {
                if (
                    !interaction.memberPermissions.has(
                        PermissionsBitField.resolve(button.permissions)
                    )
                ) {
                    return interaction.reply({
                        content:
                            "You don't have permissions to interact with this button!",
                        ephemeral: true,
                    });
                }
            }

            button.execute(interaction);
        } catch (err) {
            console.error(err);
        }
    },
};

export default event;
