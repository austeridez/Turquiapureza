module.exports = (client) => {
  console.log('🗓️ Módulo POSTAGENS carregado');

  const postagens = require('./postagens.command');
  client.prefixCommands.set(postagens.name, postagens);

  const editar = require('./editarcronograma.command');
  client.prefixCommands.set(editar.name, editar);

  const select = require('./postagens.select');
  client.interactions.set(select.customId, select);

  const listener = require('./editarcronograma.listener');
  client.on('messageCreate', (msg) => listener(msg, client));
};