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

    // delay curto para garantir que o Discord registrou a mensagem
    setTimeout(async () => {
      if (message.deletable) {
        await message.delete().catch(() => {});
      }
    }, 200);
  }
};