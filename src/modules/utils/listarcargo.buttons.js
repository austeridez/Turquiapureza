const fs = require('fs');
const path = require('path');

async function obterMembrosDoCargo(guild, roleId) {
  const role = guild.roles.cache.get(roleId);
  if (!role) return [];

  // primeiro tenta cache
  let membros = [...role.members.values()];

  // se já tem bastante, não força fetch geral
  if (membros.length > 0) return membros;

  // fallback seguro: busca em partes
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

    const membros = await obterMembrosDoCargo(
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
          return `${member}`;
        case 'listar_mencionar_id':
          return `${member} (${member.id})`;
        case 'listar_apenas_id':
          return member.id;
        case 'listar_mencionar_cargo':
          return `${member} — ${role.name}`;
      }
    });

    const texto = lista.join('\n');

    if (texto.length < 1800) {
      return interaction.editReply(texto);
    }

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