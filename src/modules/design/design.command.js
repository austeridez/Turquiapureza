const panel = require('./design.panel');

module.exports = {
  name: 'embeddesign',

  async execute(message, client) {
    const OWNERS = ['SEU_ID_AQUI'];
    const DEVS = ['SEU_ID_AQUI'];

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