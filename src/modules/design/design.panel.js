const { EmbedBuilder } = require('discord.js');

module.exports = {
  async send(channel) {
    const embed = new EmbedBuilder()
      .setTitle('🎨 Painel de Pedidos de Design')
      .setDescription(
        'Para solicitar um design, utilize este painel.\n\n' +
        'Escolha corretamente o tipo de pedido quando os botões estiverem disponíveis.\n\n' +
        '⚠️ Pedidos incompletos ou fora do padrão podem ser recusados.'
      )
      .setColor('#d38bff');

    await channel.send({ embeds: [embed] });
  }
};