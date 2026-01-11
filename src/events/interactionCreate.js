module.exports = async (interaction, client) => {
  // aceita botão, menu e modal
  if (
    !interaction.isButton() &&
    !interaction.isStringSelectMenu() &&
    !interaction.isModalSubmit()
  ) return;

  const handler = client.interactions.get(interaction.customId);
  if (!handler) return;

  try {
    await handler.execute(interaction, client);
  } catch (err) {
    console.error(err);

    // evita "Interação falhou"
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '❌ Ocorreu um erro ao processar essa interação.',
        ephemeral: true
      }).catch(() => {});
    }
  }
};