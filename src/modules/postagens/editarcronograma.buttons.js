const { EmbedBuilder } = require('discord.js');

const CRONOGRAMA_CHANNEL_ID = '1449807522281033759';

const GESTAO_ROLES = [
  '1448673656153837578',
  '1448823932298985644'
];

module.exports = {
  customId: ['cronograma_aprovar', 'cronograma_cancelar'],

  async execute(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const autorizado = GESTAO_ROLES.some(role =>
      member.roles.cache.has(role)
    );

    if (!autorizado) {
      return interaction.reply({
        content: '❌ Apenas a **gestão** pode realizar esta ação.',
        ephemeral: true
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const canalEdicao = interaction.channel;
    const previewMessage = interaction.message;
    const novoTexto = previewMessage.embeds[0].description;

    // CANCELAR
    if (interaction.customId === 'cronograma_cancelar') {
      await limparCanal(canalEdicao);
      return interaction.editReply({
        content: '❌ Edição do cronograma cancelada.'
      });
    }

    // APROVAR
    const canalCronograma = await interaction.guild.channels.fetch(
      CRONOGRAMA_CHANNEL_ID
    );

    // busca a mensagem oficial (última embed do bot no canal)
    const messages = await canalCronograma.messages.fetch({ limit: 10 });
    const oficial = messages.find(m => m.author.id === interaction.client.user.id);

    if (!oficial) {
      return interaction.editReply({
        content: '❌ Embed oficial do cronograma não encontrada.'
      });
    }

    const embed = new EmbedBuilder()
      .setColor(oficial.embeds[0].color)
      .setDescription(novoTexto);

    await oficial.edit({ embeds: [embed] });

    await limparCanal(canalEdicao);

    await interaction.editReply({
      content: '✅ Cronograma atualizado com sucesso.'
    });
  }
};

async function limparCanal(channel) {
  const msgs = await channel.messages.fetch({ limit: 50 });
  for (const msg of msgs.values()) {
    if (msg.deletable) {
      await msg.delete().catch(() => {});
    }
  }
}