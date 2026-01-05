module.exports = async (message, client) => {
  // ignora bot
  if (message.author.bot) return;

  // garante que é servidor
  if (!message.guild) return;

  const PREFIX = '!';
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // busca comando registrado
  const command = client.prefixCommands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, client, args);
  } catch (error) {
    console.error('Erro ao executar comando:', error);
  }
};