const { DESIGN_EMOJI } = require('../design.constants');
const { EmbedBuilder } = require('discord.js');

function getResponsaveisField(embed) {
  const fields = embed.fields ?? [];
  return fields.find(f => f.name === 'Design responsáveis');
}

function parseMentions(value = '') {
  if (!value || value === '—') return [];
  return value.split('\n').filter(Boolean);
}

function buildMentions(users) {
  return users.length ? users.join('\n') : '—';
}

module.exports = {
  async add(reaction, user) {
    if (user.bot) return;
    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;
    if (!message.embeds?.length) return;

    const embed = EmbedBuilder.from(message.embeds[0]);
    const field = getResponsaveisField(embed);

    const mention = `<@${user.id}>`;
    let list = field ? parseMentions(field.value) : [];

    if (!list.includes(mention)) list.push(mention);

    if (field) {
      embed.spliceFields(
        embed.fields.findIndex(f => f.name === 'Design responsáveis'),
        1,
        { name: 'Design responsáveis', value: buildMentions(list), inline: false }
      );
    } else {
      embed.addFields({ name: 'Design responsáveis', value: buildMentions(list), inline: false });
    }

    await message.edit({ embeds: [embed] });
  },

  async remove(reaction, user) {
    if (user.bot) return;
    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;
    if (!message.embeds?.length) return;

    const embed = EmbedBuilder.from(message.embeds[0]);
    const field = getResponsaveisField(embed);
    if (!field) return;

    const mention = `<@${user.id}>`;
    let list = parseMentions(field.value).filter(m => m !== mention);

    embed.spliceFields(
      embed.fields.findIndex(f => f.name === 'Design responsáveis'),
      1,
      { name: 'Design responsáveis', value: buildMentions(list), inline: false }
    );

    await message.edit({ embeds: [embed] });
  }
};