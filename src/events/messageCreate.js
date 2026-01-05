module.exports = async (message, client) => {
  if (message.author.bot) return;

  if (!message.content.startsWith('!')) return;

  console.log('⌨️ Comando detectado:', message.content);

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  console.log('📦 Buscando comando:', commandName);
  console.log(
    '🗂️ Comandos registrados:',
    [...client.prefixCommands.keys()]
  );

  const command = client.prefixCommands.get(commandName);
  if (!command) {
    console.log('❌ Comando não encontrado');
    return;
  }

  console.log('✅ Executando comando:', commandName);
  await command.execute(message, client, args);
};