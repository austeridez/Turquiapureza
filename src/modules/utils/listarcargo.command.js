const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

module.exports = {
  name: 'listarcargo',

  async execute(message, client) {
    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply('❌ Você precisa mencionar um cargo.');
    }

    if (message.deletable) {
      await message.delete().catch(() => {});
    }

    // salva o cargo no client temporariamente
    client.listarCargoRole = role.id;

    const embed = new EmbedBuilder()
      .setColor('#d38bff')
      .setTitle('📋 Listar membros por cargo')
      .setDescription(
        `Cargo selecionado: ${role}\n\n` +
        'Escolha como deseja listar os membros.'
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('listar_mencionar')
        .setLabel('Mencionar')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('listar_mencionar_id')
        .setLabel('Mencionar + ID')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('listar_apenas_id')
        .setLabel('Apenas ID')
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId('listar_mencionar_cargo')
        .setLabel('Mencionar + Cargo')
        .setStyle(ButtonStyle.Success)
    );

    await message.channel.send({
      embeds: [embed],
      components: [row]
    });
  }
};