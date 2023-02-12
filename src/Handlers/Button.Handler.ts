import { Client } from 'discord.js';

import { Button } from '../Types';

import { readdirSync } from 'fs';
import { join } from 'path';

module.exports = (client: Client) => {
    let buttonsDirectory = join(__dirname, '../Buttons');

    readdirSync(buttonsDirectory).forEach((file) => {
        if (!file.endsWith('.ts')) return;

        let button: Button = require(`${buttonsDirectory}/${file}`).default;

        client.buttons.set(button.name, button);
    });
};
