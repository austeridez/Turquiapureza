module.exports = (client) => {
  console.log('🗓️ Módulo POSTAGENS carregado');

  client.prefixCommands.set(
    'postagenssemanal',
    require('./postagens.command')
  );

  const editar = require('./editarcronograma.command');
  client.prefixCommands.set(editar.name, editar);

  client.interactions.set(
    'postagens_menu',
    require('./postagens.select')
  );

  const buttons = require('./editarcronograma.buttons');
  for (const id of buttons.customId) {
    client.interactions.set(id, buttons);
  }

  const listener = require('./editarcronograma.listener');
  client.on('messageCreate', (msg) => listener(msg, client));
};