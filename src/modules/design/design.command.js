module.exports = {
  name: 'embeddesign',

  async execute(message, client) {
    // IDs permitidos (ajuste depois)
    const OWNERS = ['SEU_ID_AQUI'];
    const DEVS = ['SEU_ID_AQUI'];

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