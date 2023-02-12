const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

import { Command } from '../Types';

const command: Command = {
    command: new SlashCommandBuilder()
        .setName('example')
        .setDescription('Example command description.')
        .addStringOption((option) => {
            return option
                .setName('example_string')
                .setDescription('Example string option.')
                .setMaxLength(50)
                .setRequired(true);
        })
        .addIntegerOption((option) => {
            return option
                .setMaxValue(100)
                .setMinValue(1)
                .setName('example_integer')
                .setDescription('Example integer option.')
                .setRequired(true);
        })
        .addStringOption((option) => {
            return option
                .setName('example_choice')
                .setDescription('Example choice option.')
                .addChoices({ name: 'Example', value: 'example_option' })
                .setRequired(true);
        })
        .addUserOption((option) => {
            return option
                .setName('example_user')
                .setDescription('Example user option.')
                .setRequired(true);
        })
        .addChannelOption((option) => {
            return option
                .setName('example_channel')
                .setDescription('Example channel option.')
                .setRequired(true);
        })
        .addBooleanOption((option) => {
            return option
                .setName('example_boolean')
                .setDescription('Example boolean option.')
                .setRequired(true);
        })
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    cooldown: 10,
    execute: async (interaction) => {
        const example_string = interaction.options.get('example_string'); // { name: 'example_string', type: 3, value: 'user_input' }
        const example_integer = interaction.options.get('example_integer'); // { name: 'example_integer', type: 4, value: 'user_input' }
        const example_choice = interaction.options.get('example_choice'); // { name: 'example_choice', type: 3, value: 'example_option' }
        const example_user = interaction.options.get('example_user'); // user object
        const example_channel = interaction.options.get('example_channel'); // channel object
        const example_boolean = interaction.options.get('example_boolean'); // { name: 'example_boolean', type: 5, value: true }

        interaction.reply('Example reply.');
    },
};

export default command;
