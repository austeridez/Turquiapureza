const fs = require('fs');
const path = require('path');

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

    // 🔴 FORÇA BUSCAR TODOS OS MEMBROS (OBRIGATÓRIO)
    const allMembers = await interaction.guild.members.fetch({ force: true });

    // 🔴 FILTRA MANUALMENTE PELO CARGO
    const membros = allMembers.filter(member =>
      member.roles.cache.has(roleId)
    );

    if (!membros.size) {
      return interaction.editReply(
        '❌ Nenhum membro com esse cargo foi encontrado.'
      );
    }

    const role = interaction.guild.roles.cache.get(roleId);

    const lista = [...membros.values()].map(member => {
      switch (interaction.customId) {
        case 'listar_mencionar':
          return `<@${member.id}>`;

        case 'listar_mencionar_id':
          return `<@${member.id}> (${member.id})`;

        case 'listar_apenas_id':
          return member.id;

        case 'listar_mencionar_cargo':
          return `<@${member.id}> — ${role.name}`;
      }
    });

    const texto = lista.join('\n');

    // 🔹 tenta enviar normal
    try {
      await interaction.editReply(texto);
    } catch {
      // 🔹 se estourar limite, envia TXT
      const nomeArquivo = `lista-${role.name.replace(/\s+/g, '_')}.txt`;
      const caminho = path.join(__dirname, nomeArquivo);

      fs.writeFileSync(caminho, texto, 'utf8');

      await interaction.editReply({
        content: '📄 Lista completa enviada em arquivo:',
        files: [caminho]
      });

      fs.unlinkSync(caminho);
    }
  }
};