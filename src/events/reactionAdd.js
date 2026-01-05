module.exports = async (reaction, user, client) => {
  if (user.bot) return;

  for (const handler of client.reactionHandlers) {
    if (handler.add) {
      await handler.add(reaction, user, client);
    }
  }
};