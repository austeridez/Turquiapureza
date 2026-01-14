module.exports = {
  customId: [
    'listar_mencionar',
    'listar_mencionar_id',
    'listar_apenas_id',
    'listar_mencionar_cargo'
  ],

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const roleId = interaction.client.listarCargoRole;
    if (!roleId) {
      return interaction.editReply('❌ Cargo não encontrado.');
    }

    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) {
      return interaction.editReply('❌ Cargo inválido.');
    }

    const members = role.members.map(member => {
      switch (interaction.customId) {
        case 'listar_mencionar':
          return `${member}`;
        case 'listar_mencionar_id':
          return `${member} (${member.id})`;
        case 'listar_apenas_id':
          return member.id;
        case 'listar_mencionar_cargo':
          return `${member} — ${role.name}`;
      }
    });

    if (!members.length) {
      return interaction.editReply('❌ Nenhum membro com esse cargo.');
    }

    // evita mensagem gigante
    const texto = members.join('\n').slice(0, 1900);

    await interaction.editReply(texto);
  }
};