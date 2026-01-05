const { EmbedBuilder } = require('discord.js');
const {
  PEDIDOS_CHANNEL_ID,
  DESIGN_EMOJI
} = require('../design.constants');

const expireService = require('./designExpire.service');

module.exports = {
  async sendPedido(client, tipo, autor, dados) {
    // busca o canal de pedidos
    const channel = await client.channels.fetch(PEDIDOS_CHANNEL_ID);

    // cria a embed do pedido
    const embed = new EmbedBuilder()
      .setTitle(`🎨 Pedido de ${tipo}`)
      .setColor('#d38bff')
      .setAuthor({
        name: autor.tag,
        iconURL: autor.displayAvatarURL()
      })
      .setTimestamp()
      .addFields({
        name: 'Design responsáveis',
        value: '—',
        inline: false
      });

    // adiciona os campos do formulário
    for (const [label, value] of Object.entries(dados)) {
      embed.addFields({
        name: label,
        value: value && value.trim() !== '' ? value : '—',
        inline: false
      });
    }

    // envia a mensagem
    const message = await channel.send({
      embeds: [embed]
    });

    // 🤖 reação inicial do bot
    await message.react(DESIGN_EMOJI);

    // agenda exclusão automática em 7 dias
    expireService.schedule(message);
  }
};