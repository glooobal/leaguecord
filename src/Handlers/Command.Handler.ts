import { Client, SlashCommandBuilder } from 'discord.js';

import { Command } from '../Types';

import { readdirSync } from 'fs';
import { join } from 'path';

module.exports = (client: Client) => {
    const commands: SlashCommandBuilder[] = [];

    let commandsDirectory = join(__dirname, '../Commands');

    readdirSync(commandsDirectory).forEach((file) => {
        if (!file.endsWith('.ts')) return;

        let command: Command = require(`${commandsDirectory}/${file}`).default;

        commands.push(command.command);
        client.commands.set(command.command.name, command);
    });
};
