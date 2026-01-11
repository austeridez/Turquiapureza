const { EmbedBuilder } = require('discord.js');
const editarCommand = require('./editarcronograma.command');

module.exports = async (message, client) => {
  // ignora bot
  if (message.author.bot) return;

  // só no canal de edição
  if (message.channel.id !== '1459961812840611851') return;

  // só se estiver aguardando texto
  if (!editarCommand.aguardandoTexto.has(message.author.id)) return;

  // remove do estado de espera
  editarCommand.aguardandoTexto.delete(message.author.id);

  const previewEmbed = new EmbedBuilder()
    .setColor('#c77dff')
    .setTitle('🧪 Pré-visualização do Cronograma')
    .setDescription(message.content);

  await message.channel.send({
    embeds: [previewEmbed]
  });

  await message.reply({
    content: '✅ Texto do cronograma recebido. (Próxima etapa: aprovação)',
    ephemeral: true
  }).catch(() => {});
};