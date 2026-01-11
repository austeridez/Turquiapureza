const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const editarCommand = require('./editarcronograma.command');

module.exports = async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== '1459961812840611851') return;

  if (!editarCommand.aguardandoTexto.has(message.author.id)) return;

  editarCommand.aguardandoTexto.delete(message.author.id);

  const previewEmbed = new EmbedBuilder()
    .setColor('#c77dff')
    .setTitle('🧪 Pré-visualização do Cronograma')
    .setDescription(message.content);

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('cronograma_aprovar')
      .setLabel('Aprovar')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('cronograma_cancelar')
      .setLabel('Cancelar')
      .setStyle(ButtonStyle.Danger)
  );

  await message.channel.send({
    embeds: [previewEmbed],
    components: [buttons]
  });
};