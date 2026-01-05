const { EmbedBuilder } = require('discord.js');
const { PEDIDOS_CHANNEL_ID } = require('../design.constants');

module.exports = {
  async sendPedido(client, tipo, autor, dados) {
    const channel = await client.channels.fetch(PEDIDOS_CHANNEL_ID);

    const embed = new EmbedBuilder()
      .setTitle(`🎨 Pedido de ${tipo}`)
      .setColor('#d38bff')
      .setAuthor({
        name: autor.tag,
        iconURL: autor.displayAvatarURL()
      })
      .setTimestamp();

    for (const [label, value] of Object.entries(dados)) {
      embed.addFields({ name: label, value, inline: false });
    }

    await channel.send({ embeds: [embed] });
  }
};