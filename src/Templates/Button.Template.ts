import { Button } from '../Types';

const button: Button = {
    name: 'example_button',
    permissions: [],
    execute: async (interaction) => {
        return interaction.reply({
            content: 'Example button works.',
            ephemeral: true,
        });
    },
};

export default button;
