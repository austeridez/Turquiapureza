const { DESIGN_EMOJI } = require('../design.constants');
const { EmbedBuilder } = require('discord.js');

function getResponsaveisIndex(embed) {
  const fields = embed.data.fields ?? [];
  return fields.findIndex(f => f.name === 'Design responsáveis');
}

function parseList(value) {
  if (!value || value === '—') return [];
  return value.split('\n').filter(Boolean);
}

module.exports = {
  async add(reaction, user) {
    if (user.bot) return;

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch {
        return;
      }
    }

    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;

    if (message.partial) {
      try {
        await message.fetch();
      } catch {
        return;
      }
    }

    if (!message.embeds.length) return;

    const embed = EmbedBuilder.from(message.embeds[0]);
    const index = getResponsaveisIndex(embed);
    if (index === -1) return;

    const fields = embed.data.fields;
    const mention = `<@${user.id}>`;
    let list = parseList(fields[index].value);

    if (!list.includes(mention)) {
      list.push(mention);
    }

    // remove reação do bot
    const botReaction = message.reactions.cache.get(DESIGN_EMOJI);
    if (botReaction) {
      await botReaction.users.remove(message.client.user.id).catch(() => {});
    }

    fields[index].value = list.join('\n');

    await message.edit({ embeds: [embed] });
  },

  async remove(reaction, user) {
    if (user.bot) return;

    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch {
        return;
      }
    }

    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;

    if (message.partial) {
      try {
        await message.fetch();
      } catch {
        return;
      }
    }

    if (!message.embeds.length) return;

    const embed = EmbedBuilder.from(message.embeds[0]);
    const index = getResponsaveisIndex(embed);
    if (index === -1) return;

    const fields = embed.data.fields;
    const mention = `<@${user.id}>`;
    let list = parseList(fields[index].value).filter(m => m !== mention);

    if (list.length === 0) {
      fields[index].value = '—';
      await message.react(DESIGN_EMOJI).catch(() => {});
    } else {
      fields[index].value = list.join('\n');
    }

    await message.edit({ embeds: [embed] });
  }
};