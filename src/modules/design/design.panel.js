const { EmbedBuilder } = require('discord.js');

module.exports = {
  async send(channel) {
    const embed = new EmbedBuilder()
      .setTitle('🎨 Painel de Pedidos de Design')
      .setDescription(
        'Utilize este painel para solicitar artes com a equipe de design.\n\n' +
        'Escolha corretamente o tipo de pedido e preencha todas as informações solicitadas.\n\n' +
        '⚠️ Pedidos incompletos ou fora do padrão podem ser recusados.'
      )
      .setColor('#d38bff');

    await channel.send({ embeds: [embed] });
  }
};