const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require('discord.js');

const designService = require('../services/designEmbed.service');

module.exports = {
  customId: 'design_modal_barrinha',

  async execute(interaction) {
    // ABRIR MODAL
    if (!interaction.isModalSubmit()) {
      const modal = new ModalBuilder()
        .setCustomId('design_modal_barrinha')
        .setTitle('Pedido de Barrinha');

      const inputs = [
        ['titulo', 'Título', true],
        ['tema', 'Tema', true],
        ['cor', 'Cor', true],
        ['area', 'Área', true],
        ['prazo', 'Prazo de entrega', true]
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
      'Tema': interaction.fields.getTextInputValue('tema'),
      'Cor': interaction.fields.getTextInputValue('cor'),
      'Área': interaction.fields.getTextInputValue('area'),
      'Prazo': interaction.fields.getTextInputValue('prazo')
    };

    await designService.sendPedido(
      interaction.client,
      'Barrinha',
      interaction.user,
      dados
    );

    await interaction.reply({
      content: '✅ Seu pedido de **Barrinha** foi enviado!',
      ephemeral: true
    });
  }
};