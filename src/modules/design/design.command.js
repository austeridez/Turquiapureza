const panel = require('./design.panel');

module.exports = {
  name: 'embeddesign',

  async execute(message, client) {
    const OWNERS = ['1430469417149661254'];
    const DEVS = ['1431872681778745496'];

    if (
      !OWNERS.includes(message.author.id) &&
      !DEVS.includes(message.author.id)
    ) {
      return;
    }

    // busca a mensagem novamente para garantir referência válida
    try {
      const fetchedMessage = await message.channel.messages.fetch(message.id);
      if (fetchedMessage.deletable) {
        await fetchedMessage.delete();
      }
    } catch (err) {
      console.log('⚠️ Não foi possível apagar a mensagem do comando.');
    }

    // envia o painel
    await panel.send(message.channel);
  }
};