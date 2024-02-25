import { ButtonBuilder, ButtonStyle } from 'discord.js';

export const URLButton = (label, url) => {
  return new ButtonBuilder()
    .setURL(url)
    .setStyle(ButtonStyle.Link)
    .setLabel(label);
};
