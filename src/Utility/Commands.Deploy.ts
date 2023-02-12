import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';

import { Command } from '../Types';

import { readdirSync } from 'fs';
import { join } from 'path';

import { client } from '../Index';

export function deployCommands(client: Client) {
    const commands: SlashCommandBuilder[] = [];

    let commandsDirectory = join(__dirname, '../Commands');

    readdirSync(commandsDirectory).forEach((file) => {
        if (!file.endsWith('.ts')) return;

        let command: Command = require(`${commandsDirectory}/${file}`).default;

        commands.push(command.command);
        client.commands.set(command.command.name, command);
    });

    const rest = new REST({ version: '10' }).setToken(
        process.env.DISCORD_TOKEN
    );

    console.log(
        `Started refreshing ${commands.length} application (/) commands.`
    );

    rest.put(Routes.applicationCommands(process.env.DISCORD_ID), {
        body: commands.map((command) => command.toJSON()),
    })
        .then((data: any) => {
            console.log(
                `Successfully loaded ${data.length} application (/) commands.`
            );
            process.exit();
        })
        .catch((err) => {
            console.error(err);
            process.exit();
        });
}

deployCommands(client);
