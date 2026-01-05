module.exports = {
  customId: 'design_banner',

  async execute(interaction, client) {
    await interaction.reply({
      content: '🖼️ Botão de **BANNER** clicado (teste).',
      ephemeral: true
    });
  }
};