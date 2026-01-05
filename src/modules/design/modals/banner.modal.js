const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require('discord.js');

const designService = require('../services/designEmbed.service');

module.exports = {
  customId: 'design_modal_banner',

  async execute(interaction) {
    // ABRIR MODAL
    if (!interaction.isModalSubmit()) {
      const modal = new ModalBuilder()
        .setCustomId('design_modal_banner')
        .setTitle('Pedido de Banner');

      const inputs = [
        ['titulo', 'Título', true],
        ['subtitulo', 'Subtítulo (opcional)', false],
        ['tema', 'Tema', true],
        ['cor', 'Cor', true],
        ['resolucao', 'Resolução', true]
      ];

      inputs.forEach(([id, label, required]) => {
        modal.addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId(id)
              .setLabel(label)
              .setStyle(TextInputStyle.Short)
              .setRequired(required)
          )
        );
      });

      return interaction.showModal(modal);
    }

    // SUBMIT DO MODAL
    const dados = {
      'Título': interaction.fields.getTextInputValue('titulo'),
      'Subtítulo': interaction.fields.getTextInputValue('subtitulo') || '—',
      'Tema': interaction.fields.getTextInputValue('tema'),
      'Cor': interaction.fields.getTextInputValue('cor'),
      'Resolução': interaction.fields.getTextInputValue('resolucao')
    };

    await designService.sendPedido(
      interaction.client,
      'Banner',
      interaction.user,
      dados
    );

    await interaction.reply({
      content: '✅ Seu pedido de **Banner** foi enviado!',
      ephemeral: true
    });
  }
};