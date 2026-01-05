const panel = require('./design.panel');

module.exports = {
  name: 'embeddesign',

  async execute(message, client) {
    // apaga o comando
    if (message.deletable) {
      await message.delete().catch(() => {});
    }

    // envia o painel no canal atual
    await panel.send(message.channel);
  }
};