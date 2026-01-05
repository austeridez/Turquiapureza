module.exports = {
  name: 'embeddesign',

  async execute(message, client) {
    // tenta apagar o comando
    if (message.deletable) {
      await message.delete().catch(() => {});
    }
  }
};