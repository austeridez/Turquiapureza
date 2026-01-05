module.exports = async (reaction, user, client) => {
  if (user.bot) return;

  for (const handler of client.reactionHandlers) {
    if (handler.remove) {
      await handler.remove(reaction, user, client);
    }
  }
};