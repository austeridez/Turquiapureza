module.exports = async (message, client) => {
  if (message.author.bot) return;

  console.log('📩 Mensagem recebida:', message.content);
};