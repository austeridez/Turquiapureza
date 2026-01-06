const {
  DESIGN_EMOJI,
  DESIGN_ROLE_ID
} = require('../design.constants');

const { EmbedBuilder } = require('discord.js');

function getResponsaveisIndex(embed) {
  const fields = embed.data.fields ?? [];
  return fields.findIndex(f => f.name === 'Design responsáveis');
}

function parseList(value) {
  if (!value || value === '—') return [];
  return value.split('\n').filter(Boolean);
}

async function memberHasDesignRole(reaction, user) {
  try {
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    return member.roles.cache.has(DESIGN_ROLE_ID);
  } catch {
    return false;
  }
}

module.exports = {
  async add(reaction, user) {
    if (user.bot) return;

    // garante reaction completa
    if (reaction.partial) {
      try { await reaction.fetch(); } catch { return; }
    }

    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;

    if (message.partial) {
      try { await message.fetch(); } catch { return; }
    }

    // ❌ não tem cargo → remove reação
    const hasRole = await memberHasDesignRole(reaction, user);
    if (!hasRole) {
      await reaction.users.remove(user.id).catch(() => {});
      return;
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

    fields[index].value = list.join('\n');
    await message.edit({ embeds: [embed] });
  },

  async remove(reaction, user) {
    if (user.bot) return;

    if (reaction.partial) {
      try { await reaction.fetch(); } catch { return; }
    }

    if (reaction.emoji.name !== DESIGN_EMOJI) return;

    const message = reaction.message;

    if (message.partial) {
      try { await message.fetch(); } catch { return; }
    }

    const hasRole = await memberHasDesignRole(reaction, user);
    if (!hasRole) return;

    if (!message.embeds.length) return;

    const embed = EmbedBuilder.from(message.embeds[0]);
    const index = getResponsaveisIndex(embed);
    if (index === -1) return;

    const fields = embed.data.fields;
    const mention = `<@${user.id}>`;
    let list = parseList(fields[index].value).filter(m => m !== mention);

    fields[index].value = list.length ? list.join('\n') : '—';
    await message.edit({ embeds: [embed] });
  }
};