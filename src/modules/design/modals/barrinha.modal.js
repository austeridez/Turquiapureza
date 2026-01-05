const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  customId: 'design_modal_barrinha',

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('design_modal_barrinha')
      .setTitle('Pedido de Barrinha');

    const titulo = new TextInputBuilder()
      .setCustomId('titulo')
      .setLabel('Título')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

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

    const area = new TextInputBuilder()
      .setCustomId('area')
      .setLabel('Área')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const prazo = new TextInputBuilder()
      .setCustomId('prazo')
      .setLabel('Prazo de entrega')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder().addComponents(titulo),
      new ActionRowBuilder().addComponents(tema),
      new ActionRowBuilder().addComponents(cor),
      new ActionRowBuilder().addComponents(area),
      new ActionRowBuilder().addComponents(prazo)
    );

    await interaction.showModal(modal);
  }
};