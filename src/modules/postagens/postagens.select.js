const JORNALISMO_ROLE_ID = '1448673662902341792';

module.exports = {
  customId: 'postagens_menu',

  async execute(interaction) {
    // já responde a interação para evitar "falhou"
    await interaction.deferReply({ ephemeral: true });

    const member = await interaction.guild.members.fetch(interaction.user.id);

    if (!member.roles.cache.has(JORNALISMO_ROLE_ID)) {
      return interaction.editReply({
        content: '❌ Apenas membros do **Jornalismo** podem assumir horários.'
      });
    }

    const selected = interaction.values[0];
    const message = interaction.message;

    if (!message.embeds.length) {
      return interaction.editReply({
        content: '❌ Embed do cronograma não encontrada.'
      });
    }

    let text = message.embeds[0].description;

    // horário já ocupado
    if (!text.includes(`${selected} (<@>)`)) {
      return interaction.editReply({
        content: '❌ Este horário já possui responsável.'
      });
    }

    // assume o horário
    text = text.replace(
      `${selected} (<@>)`,
      `${selected} (<@${interaction.user.id}>)`
    );

    await message.edit({
      embeds: [
        {
          color: message.embeds[0].color,
          description: text
        }
      ]
    });

    await interaction.editReply({
      content: '✅ Você assumiu este horário.'
    });
  }
};