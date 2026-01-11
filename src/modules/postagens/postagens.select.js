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

    if (!message.embeds.length) {
      return interaction.editReply({
        content: '❌ Cronograma não encontrado.'
      });
    }

    let description = message.embeds[0].description;

    if (!description.includes(`${selected} (<@>)`)) {
      return interaction.editReply({
        content: '❌ Este horário já foi assumido.'
      });
    }

    // assume o horário
    description = description.replace(
      `${selected} (<@>)`,
      `${selected} (<@${interaction.user.id}>)`
    );

    // recria embed
    const embed = {
      color: message.embeds[0].color,
      description
    };

    // recria menu com base no novo texto
    const gerarMenu = (desc) => {
      const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
      const regex = /\(([^)]+)\)\s-\s([^(]+)\s\(<@>\)/g;
      const options = [];
      let m;

      while ((m = regex.exec(desc)) !== null) {
        const horario = m[1].trim();
        const materia = m[2].trim();
        options.push({
          label: horario,
          description: materia,
          value: `(${horario}) - ${materia}`
        });
      }

      if (!options.length) return [];

      return [
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('postagens_menu')
            .setPlaceholder('Selecione um horário disponível')
            .addOptions(options)
        )
      ];
    };

    const components = gerarMenu(description);

    await message.edit({
      embeds: [embed],
      components
    });

    await interaction.editReply({
      content: '✅ Você assumiu este horário.'
    });
  }
};