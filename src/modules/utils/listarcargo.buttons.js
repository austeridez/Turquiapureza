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

    // 🔹 FORÇA CARREGAR TODOS OS MEMBROS
    await interaction.guild.members.fetch();

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

    const texto = members.join('\n');

    // 🔹 se couber, envia direto
    if (texto.length < 1800) {
      return interaction.editReply(texto);
    }

    // 🔹 se não couber, gera TXT
    const nomeArquivo = `lista-${role.name.replace(/\s+/g, '_')}.txt`;
    const caminho = path.join(__dirname, nomeArquivo);

    fs.writeFileSync(caminho, texto, 'utf8');

    await interaction.editReply({
      content: '📄 Lista completa enviada em arquivo:',
      files: [caminho]
    });

    fs.unlinkSync(caminho);
  }
};