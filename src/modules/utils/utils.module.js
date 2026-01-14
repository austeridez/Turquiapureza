module.exports = (client) => {
  const listar = require('./listarcargo.command');
  client.prefixCommands.set(listar.name, listar);

  const buttons = require('./listarcargo.buttons');
  for (const id of buttons.customId) {
    client.interactions.set(id, buttons);
  }
};