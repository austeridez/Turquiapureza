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

    const role = interaction.guild.roles.cache.get(roleId);
    if (!role) {
      return interaction.editReply('❌ Cargo inválido.');
    }

    // usa o que o Discord tem em cache (estável)
    const membros = [...role.members.values()];

    if (!membros.length) {
      return interaction.editReply('❌ Nenhum membro encontrado.');
    }

    const lista = membros.map(member => {
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

    // 🔹 TENTA enviar como mensagem normal
    try {
      await interaction.editReply(texto);
    } catch (err) {
      // 🔹 SE ESTOURAR LIMITE → TXT
      const nomeArquivo = `lista-${role.name.replace(/\s+/g, '_')}.txt`;
      const caminho = path.join(__dirname, nomeArquivo);

      fs.writeFileSync(caminho, texto, 'utf8');

      await interaction.editReply({
        content: '📄 Lista grande demais, enviada em arquivo:',
        files: [caminho]
      });

      fs.unlinkSync(caminho);
    }
  }
};