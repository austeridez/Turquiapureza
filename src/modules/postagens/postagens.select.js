const JORNALISMO_ROLE_ID = '1448673662902341792';

module.exports = {
  customId: 'postagens_menu',

  async execute(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id);

    // permissão
    if (!member.roles.cache.has(JORNALISMO_ROLE_ID)) {
      return interaction.reply({
        content: '❌ Apenas membros do **Jornalismo** podem assumir horários.',
        ephemeral: true
      });
    }

    const selected = interaction.values[0];
    const message = interaction.message;

    if (!message.embeds.length) return;

    let text = message.embeds[0].description;

    // horário já ocupado?
    if (!text.includes(`${selected} (<@>)`)) {
      return interaction.reply({
        content: '❌ Este horário já possui responsável.',
        ephemeral: true
      });
    }

    // substitui <@> pelo usuário
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

    await interaction.reply({
      content: '✅ Você assumiu este horário.',
      ephemeral: true
    });
  }
};