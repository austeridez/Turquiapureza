const { EmbedBuilder } = require('discord.js');

module.exports = async (member) => {
  const CANAL_LOG = 'ID_DO_CANAL_DE_LOG';
  const CANAL_GERAL = '1457838314320171368';
  const CANAL_BOAS_VINDAS = '1460895024739909737';

  const guild = member.guild;

  /* ===============================
     📋 LOG COMPLETO (NÃO APAGA)
  =============================== */
  const logChannel = guild.channels.cache.get(CANAL_LOG);
  if (logChannel) {
    const logEmbed = new EmbedBuilder()
      .setColor('#b084ff')
      .setTitle('📥 Novo membro entrou')
      .addFields(
        { name: '👤 Usuário', value: `${member} (${member.user.tag})` },
        { name: '🆔 ID', value: member.id },
        { name: '👥 Membros no servidor', value: `${guild.memberCount}` }
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    logChannel.send({ embeds: [logEmbed] });
  }

  /* ===============================
     💬 MENSAGEM NO CHAT GERAL
  =============================== */
  const geralChannel = guild.channels.cache.get(CANAL_GERAL);
  if (geralChannel) {
    const msg = await geralChannel.send(
      `💗 Seja bem-vindo(a), ${member}!`
    );

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 60_000);
  }

  /* ===============================
     🎉 BOAS-VINDAS (TEMPORÁRIA)
  =============================== */
  const welcomeChannel = guild.channels.cache.get(CANAL_BOAS_VINDAS);
  if (welcomeChannel) {
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#ffc6ff')
      .setDescription(
        `✨ ${member}, seja muito bem-vindo(a) ao **${guild.name}**!\n\n` +
        `Fique à vontade e aproveite 💗`
      );

    const msg = await welcomeChannel.send({ embeds: [welcomeEmbed] });

    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 60_000);
  }
};