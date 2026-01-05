module.exports = {
  name: 'embeddesign',

  async execute(message, client) {
    // IDs permitidos (ajuste depois)
    const OWNERS = ['1430469417149661254'];
    const DEVS = ['1431872681778745496'];

    if (
      !OWNERS.includes(message.author.id) &&
      !DEVS.includes(message.author.id)
    ) {
      return;
    }

    // comando silencioso por enquanto
    await message.delete().catch(() => {});
  }
};