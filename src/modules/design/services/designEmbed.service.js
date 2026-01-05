const { EmbedBuilder } = require('discord.js');
const { PEDIDOS_CHANNEL_ID, DESIGN_EMOJI } = require('../design.constants');
const expireService = require('./designExpire.service');

module.exports = {
  async sendPedido(client, tipo, autor, dados) {
    const channel = await client.channels.fetch(PEDIDOS_CHANNEL_ID);

    const embed = new EmbedBuilder()
      .setTitle(`🎨 Pedido de ${tipo}`)
      .setColor('#d38bff')
      .setAuthor({ name: autor.tag, iconURL: autor.displayAvatarURL() })
      .addFields({
        name: 'Design responsáveis',
        value: '—',
        inline: false
      })
      .setTimestamp();

    for (const [label, value] of Object.entries(dados)) {
      embed.addFields({ name: label, value, inline: false });
    }

    const msg = await channel.send({ embeds: [embed] });

    // 🤖 reação inicial do bot
    await msg.react(DESIGN_EMOJI);

    // auto delete
    expireService.schedule(msg);
  }
};