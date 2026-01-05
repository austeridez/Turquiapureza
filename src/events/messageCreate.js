module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const PREFIX = '!';
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.prefixCommands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, client, args);
  } catch (err) {
    console.error('Erro ao executar comando:', err);
  }
};