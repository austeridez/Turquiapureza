const { EmbedBuilder } = require('discord.js');

// CONFIG
const CANAL_EDICAO_ID = '1459961812840611851';

const GESTAO_ROLES = [
  '1448673656153837578',
  '1448823932298985644'
];

// estado temporário (por enquanto em memória)
const aguardandoTexto = new Set();

module.exports = {
  name: 'editarcronograma',

  async execute(message, client) {
    // só no canal correto
    if (message.channel.id !== CANAL_EDICAO_ID) return;

    // permissão gestão
    const member = await message.guild.members.fetch(message.author.id);
    const autorizado = GESTAO_ROLES.some(role =>
      member.roles.cache.has(role)
    );

    if (!autorizado) return;

    // apaga o comando
    if (message.deletable) {
      await message.delete().catch(() => {});
    }

    // marca que estamos aguardando texto desse user
    aguardandoTexto.add(message.author.id);

    const embed = new EmbedBuilder()
      .setColor('#f5b7ff')
      .setTitle('✏️ Edição do Cronograma')
      .setDescription(
        'Envie **abaixo** o novo cronograma **COMPLETO**, seguindo o modelo padrão.\n\n' +
        '⚠️ Nada será alterado até a aprovação nas próximas etapas.'
      );

    await message.channel.send({ embeds: [embed] });
  },

  // exportamos o estado pra usar no messageCreate
  aguardandoTexto
};