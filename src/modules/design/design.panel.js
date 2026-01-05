const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  async send(channel) {
    const embed = new EmbedBuilder()
      .setTitle('🎨 Painel de Pedidos de Design')
      .setDescription(
        'Para solicitar um design, utilize este painel.\n\n' +
        'Clique em uma das opções abaixo para iniciar seu pedido.\n\n' +
        '⚠️ Pedidos incompletos ou fora do padrão podem ser recusados.'
      )
      .setColor('#d38bff');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('design_banner')
        .setLabel('Pedir Banner')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('design_barrinha')
        .setLabel('Pedir Barrinha')
        .setStyle(ButtonStyle.Secondary)
    );

    await channel.send({
      embeds: [embed],
      components: [row]
    });
  }
};