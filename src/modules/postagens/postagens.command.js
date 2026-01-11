const { EmbedBuilder } = require('discord.js');

// CONFIGURAÇÕES FIXAS DA ETAPA 1
const CRONOGRAMA_CHANNEL_ID = '1449807522281033759';
const GESTAO_ROLES = [
  '1448673656153837578',
  '1448823932298985644'
];

// vamos guardar o ID da embed em memória por enquanto
let cronogramaMessageId = null;

module.exports = {
  name: 'postagenssemanal',

  async execute(message, client) {
    // permissão: só gestão
    const member = await message.guild.members.fetch(message.author.id);
    const hasPermission = GESTAO_ROLES.some(roleId =>
      member.roles.cache.has(roleId)
    );

    if (!hasPermission) {
      return;
    }

    // apaga o comando
    if (message.deletable) {
      await message.delete().catch(() => {});
    }

    const channel = await client.channels.fetch(CRONOGRAMA_CHANNEL_ID);

    // EMBED BASE (placeholder da Etapa 1)
    const embed = new EmbedBuilder()
      .setColor('#d38bff')
      .setDescription(
`## <:a_invi:1459927934629318697>      <:letter_e:1459926761986068533> <:letter_s:1459927489013879036> <:letter_c:1459926703664267307> <:letter_a:1459926629580017714> <:letter_l:1459927029716877543> <:letter_a:1459926629580017714>
## <:a_invi:1459927934629318697>  <:letter_s:1459927489013879036> <:letter_e:1459926761986068533> <:letter_m:1459927054261686426> <:letter_a:1459926629580017714> <:letter_n:1459927080614494310> <:letter_a:1459926629580017714> <:letter_l:1459927029716877543>
-# <:a_invi:1459927934629318697> ︶︶𝆺𝅥︶﹒︶︶𝆹𝅥︶﹒<a:sylveon_lurk:1459928424390070314> ﹒︶𝆹𝅥︶︶﹒︶𝆺𝅥︶︶
<:a_invi:1459927934629318697> 𐔌   ۪   ׂ 𓈒 𖦹˙ **Escolha o seu dia de postagem!**

*(Etapa 1 – embed base de teste)*`
      );

    // se ainda não existe, cria
    if (!cronogramaMessageId) {
      const msg = await channel.send({ embeds: [embed] });
      cronogramaMessageId = msg.id;
      return;
    }

    // se já existe, edita
    try {
      const msg = await channel.messages.fetch(cronogramaMessageId);
      await msg.edit({ embeds: [embed] });
    } catch {
      const msg = await channel.send({ embeds: [embed] });
      cronogramaMessageId = msg.id;
    }
  }
};