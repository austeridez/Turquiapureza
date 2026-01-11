const {
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

module.exports = function gerarMenu(description) {
  const lines = description.split('\n');

  let diaAtual = null;
  let temaAtual = null;

  const options = [];

  const regexDia = /\*\*Dia da semana:\s*(.+?)\.\*\*/;
  const regexTema = /\*\*Tema:\s*(.+?)\*\*/;
  const regexHorario = /\(([^)]+)\)\s-\s([^(]+)\s\(<@>\)/;

  for (const line of lines) {
    const diaMatch = line.match(regexDia);
    if (diaMatch) {
      diaAtual = diaMatch[1].trim();
      continue;
    }

    const temaMatch = line.match(regexTema);
    if (temaMatch) {
      temaAtual = temaMatch[1].trim();
      continue;
    }

    const horarioMatch = line.match(regexHorario);
    if (horarioMatch && diaAtual && temaAtual) {
      const horario = horarioMatch[1].trim();
      const postagem = horarioMatch[2].trim();

      options.push({
        label: `${diaAtual} | ${horario}`,
        description: `Tema: ${temaAtual} • ${postagem}`,
        value: `(${horario}) - ${postagem}`
      });
    }
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