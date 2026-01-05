module.exports = (client) => {
  console.log('🎨 Módulo DESIGN inicializado');

  const command = require('./design.command');
  client.prefixCommands.set(command.name, command);

  // botões
  const bannerButton = require('./buttons/banner.button');
  const barrinhaButton = require('./buttons/barrinha.button');
  client.interactions.set(bannerButton.customId, bannerButton);
  client.interactions.set(barrinhaButton.customId, barrinhaButton);

  // modais
  const bannerModal = require('./modals/banner.modal');
  const barrinhaModal = require('./modals/barrinha.modal');
  client.interactions.set(bannerModal.customId, bannerModal);
  client.interactions.set(barrinhaModal.customId, barrinhaModal);

  // reações
  const designReaction = require('./reactions/design.reaction');
  client.reactionHandlers.push(designReaction);

  console.log('📦 Comandos registrados:', [...client.prefixCommands.keys()]);
};