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

    // tenta apagar a mensagem do comando
    if (message.deletable) {
      await message.delete();
    }
  }
};