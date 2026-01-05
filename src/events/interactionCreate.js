module.exports = async (interaction, client) => {
  if (!interaction.isButton() && !interaction.isModalSubmit()) return;

  const handler = client.interactions.get(interaction.customId);
  if (!handler) return;

  try {
    await handler.execute(interaction, client);
  } catch (err) {
    console.error(err);
  }
};