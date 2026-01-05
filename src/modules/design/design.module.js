module.exports = (client) => {
  console.log('🎨 Módulo DESIGN inicializado');

  const command = require('./design.command');
  client.prefixCommands.set(command.name, command);
};