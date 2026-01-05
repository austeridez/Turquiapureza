module.exports = {
  customId: 'design_barrinha',

  async execute(interaction, client) {
    await interaction.reply({
      content: '🧩 Botão de **BARRINHA** clicado (teste).',
      ephemeral: true
    });
  }
};