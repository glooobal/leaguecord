import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.info(`Connected to Discord as ${client.user.tag}`);
  },
};
