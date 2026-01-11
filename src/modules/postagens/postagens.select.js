const JORNALISMO_ROLE_ID = '1448673662902341792';

module.exports = {
  customId: 'postagens_menu',

  async execute(interaction) {
    // permissão: só jornalismo
    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (!member.roles.cache.has(JORNALISMO_ROLE_ID)) {
      return interaction.reply({
        content: '❌ Apenas membros do **Jornalismo** podem selecionar horários.',
        ephemeral: true
      });
    }

    const value = interaction.values[0];

    await interaction.reply({
      content: `🗓️ Você selecionou: **${value}**`,
      ephemeral: true
    });
  }
};