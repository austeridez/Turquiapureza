const { DESIGN_EMOJI } = require('../design.constants');
const { EmbedBuilder } = require('discord.js');

function getFieldIndex(embed) {
  return embed.fields.findIndex(f => f.name === 'Design responsáveis');
}

function parse(value) {
  if (!value || value === '—') return [];
  return value.split('\n').filter(Boolean);
}

module.exports = {
  async add(reaction, user) {
    if (user.bot) return;
    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;
    if (!message.embeds?.length) return;

    const embed = EmbedBuilder.from(message.embeds[0]);
    const index = getFieldIndex(embed);
    if (index === -1) return;

    const mention = `<@${user.id}>`;
    const current = parse(embed.fields[index].value);

    if (!current.includes(mention)) {
      current.push(mention);
    }

    // remove reação do bot
    const botReaction = message.reactions.cache.get(DESIGN_EMOJI);
    if (botReaction) {
      await botReaction.users.remove(message.client.user.id).catch(() => {});
    }

    embed.spliceFields(index, 1, {
      name: 'Design responsáveis',
      value: current.join('\n'),
      inline: false
    });

    await message.edit({ embeds: [embed] });
  },

  async remove(reaction, user) {
    if (user.bot) return;
    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;
    if (!message.embeds?.length) return;

    const embed = EmbedBuilder.from(message.embeds[0]);
    const index = getFieldIndex(embed);
    if (index === -1) return;

    const mention = `<@${user.id}>`;
    let current = parse(embed.fields[index].value).filter(m => m !== mention);

    if (current.length === 0) {
      embed.spliceFields(index, 1, {
        name: 'Design responsáveis',
        value: '—',
        inline: false
      });

      // bot reage de novo se ninguém pegou
      await message.react(DESIGN_EMOJI).catch(() => {});
    } else {
      embed.spliceFields(index, 1, {
        name: 'Design responsáveis',
        value: current.join('\n'),
        inline: false
      });
    }

    await message.edit({ embeds: [embed] });
  }
};