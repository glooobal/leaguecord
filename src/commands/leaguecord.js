import { ActionRowBuilder, SlashCommandBuilder } from 'discord.js';

import { URLButton } from '../utils/URLButton.js';

export const data = new SlashCommandBuilder()
  .setName('leaguecord')
  .setDescription('See information about me');

export async function execute(interaction) {
  const componentsRow = new ActionRowBuilder().addComponents(
    URLButton('Invite me', process.env.INVITE_URL),
    URLButton('Website', process.env.WEBSITE_URL),
    URLButton('Github', process.env.GITHUB_URL),
  );

  await interaction.reply({
    components: [componentsRow],
  });
}
