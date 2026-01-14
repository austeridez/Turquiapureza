const fs = require('fs');
const path = require('path');

async function buscarMembrosComCargo(guild, roleId) {
  const membros = [];
  let lastId;

  while (true) {
    const fetched = await guild.members.fetch({
      limit: 1000,
      after: lastId
    }).catch(() => null);

    if (!fetched || fetched.size === 0) break;

    for (const member of fetched.values()) {
      if (member.roles.cache.has(roleId)) {
        membros.push(member);
      }
    }

    lastId = fetched.last().id;
  }

  return membros;
}

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

    const membros = await buscarMembrosComCargo(
      interaction.guild,
      roleId
    );

    if (!membros.length) {
      return interaction.editReply('❌ Nenhum membro com esse cargo.');
    }

    const role = interaction.guild.roles.cache.get(roleId);

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

    // envia direto se couber
    if (texto.length < 1800) {
      return interaction.editReply(texto);
    }

    // senão envia em TXT
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