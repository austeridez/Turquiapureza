const gerarMenu = require('./utils/gerarMenu');

const JORNALISMO_ROLE_ID = '1448673662902341792';

module.exports = {
  customId: 'postagens_menu',

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const member = await interaction.guild.members.fetch(interaction.user.id);

    if (!member.roles.cache.has(JORNALISMO_ROLE_ID)) {
      return interaction.editReply({
        content: '❌ Apenas membros do **Jornalismo** podem assumir horários.'
      });
    }

    const selected = interaction.values[0];
    const message = interaction.message;

    let description = message.embeds[0].description;

    if (!description.includes(`${selected} (<@>)`)) {
      return interaction.editReply({
        content: '❌ Este horário já foi assumido.'
      });
    }

    description = description.replace(
      `${selected} (<@>)`,
      `${selected} (<@${interaction.user.id}>)`
    );

    const components = gerarMenu(description);

    await message.edit({
      embeds: [
        {
          color: message.embeds[0].color,
          description
        }
      ],
      components
    });

    await interaction.editReply({
      content: '✅ Você assumiu este horário.'
    });
  }
};