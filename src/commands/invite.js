import { ActionRowBuilder, SlashCommandBuilder } from 'discord.js';

import { URLButton } from '../utils/URLButton.js';

export const data = new SlashCommandBuilder()
  .setName('invite')
  .setDescription('Invite me to your server');

export async function execute(interaction) {
  const componentsRow = new ActionRowBuilder().addComponents(
    URLButton('Invite me', process.env.INVITE_URL),
  );

  await interaction.reply({
    components: [componentsRow],
  });
}
