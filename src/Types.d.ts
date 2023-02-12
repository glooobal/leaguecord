import {
    Client,
    Collection,
    ButtonInteraction,
    CommandInteraction,
    SlashCommandBuilder,
} from 'discord.js';

export interface Command {
    command: SlashCommandBuilder | any;
    execute: (interaction: CommandInteraction) => void;
}

export interface Event {
    name: string;
    once?: boolean | false;
    execute: (...args) => void;
}

export interface Button {
    name: string;
    permissions: [];
    execute: (interaction: ButtonInteraction) => void;
}

declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, Command>;
        buttons: Collection<string, Button>;
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_EMBED_COLOR: any;
            RIOT_API_URL: string;
            RIOT_DDRAGON_URL: string;
            RIOT_KEY: string;
            DISCORD_TOKEN: string;
            DISCORD_ID: string;
        }
    }
}
