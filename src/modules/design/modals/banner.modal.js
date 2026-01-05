const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  customId: 'design_modal_banner',

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('design_modal_banner')
      .setTitle('Pedido de Banner');

    const titulo = new TextInputBuilder()
      .setCustomId('titulo')
      .setLabel('Título')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const subtitulo = new TextInputBuilder()
      .setCustomId('subtitulo')
      .setLabel('Subtítulo (opcional)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const tema = new TextInputBuilder()
      .setCustomId('tema')
      .setLabel('Tema')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const cor = new TextInputBuilder()
      .setCustomId('cor')
      .setLabel('Cor')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const resolucao = new TextInputBuilder()
      .setCustomId('resolucao')
      .setLabel('Resolução')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(titulo),
      new ActionRowBuilder().addComponents(subtitulo),
      new ActionRowBuilder().addComponents(tema),
      new ActionRowBuilder().addComponents(cor),
      new ActionRowBuilder().addComponents(resolucao)
    );

    await interaction.showModal(modal);
  }
};