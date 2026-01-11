module.exports = (client) => {
  console.log('🗓️ Módulo POSTAGENS carregado');

  const command = require('./postagens.command');
  client.prefixCommands.set(command.name, command);

  const select = require('./postagens.select');
  client.interactions.set(select.customId, select);
};