module.exports = (client) => {
  console.log('🎨 Módulo DESIGN inicializado');

  const command = require('./design.command');
  client.prefixCommands.set(command.name, command);

  // botões
  const bannerButton = require('./buttons/banner.button');
  const barrinhaButton = require('./buttons/barrinha.button');

  client.interactions.set(bannerButton.customId, bannerButton);
  client.interactions.set(barrinhaButton.customId, barrinhaButton);

  console.log(
    '📦 Comandos registrados no DESIGN:',
    [...client.prefixCommands.keys()]
  );
};