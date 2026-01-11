const { EmbedBuilder } = require('discord.js');
const gerarMenu = require('./utils/gerarMenu');

// ===== CONFIG =====
const CRONOGRAMA_CHANNEL_ID = '1449807522281033759';

const GESTAO_ROLES = [
  '1448673656153837578',
  '1448823932298985644'
];

let cronogramaMessageId = null;

module.exports = {
  name: 'postagenssemanal',

  async execute(message) {
    const member = await message.guild.members.fetch(message.author.id);
    const autorizado = GESTAO_ROLES.some(role =>
      member.roles.cache.has(role)
    );

    if (!autorizado) return;

    if (message.deletable) {
      await message.delete().catch(() => {});
    }

    const channel = await message.guild.channels.fetch(CRONOGRAMA_CHANNEL_ID);

    const embed = new EmbedBuilder()
      .setColor('#d38bff')
      .setDescription(
`## <:a_invi:1459927934629318697>      <:letter_e:1459926761986068533> <:letter_s:1459927489013879036> <:letter_c:1459926703664267307> <:letter_a:1459926629580017714> <:letter_l:1459927029716877543> <:letter_a:1459926629580017714>
## <:a_invi:1459927934629318697>  <:letter_s:1459927489013879036> <:letter_e:1459926761986068533> <:letter_m:1459927054261686426> <:letter_a:1459926629580017714> <:letter_n:1459927080614494310> <:letter_a:1459926629580017714> <:letter_l:1459927029716877543>
-# <:a_invi:1459927934629318697> ︶︶𝆺𝅥︶﹒︶︶𝆹𝅥︶﹒<a:sylveon_lurk:1459928424390070314> ﹒︶𝆹𝅥︶︶﹒︶𝆺𝅥︶︶
<:a_invi:1459927934629318697> 𐔌   ۪   ׂ 𓈒 𖦹˙ **Escolha o seu dia de postagem!**

### <:letter_s:1459927489013879036> <:letter_e:1459926761986068533> <:letter_g:1459926814704275634> <:letter_u:1459927542495580345> <:letter_n:1459927080614494310> <:letter_d:1459926738439245865> <:letter_a:1459926629580017714>
-# <:p_heart:1459929023533682758> **Dia da semana: Segunda-feira.**
-# <:p_heart:1459929023533682758> **Tema: livre**
<:bponto:1459927986576036021> (08h00 - 22h00) - Turquia Vote (<@>)

### <:letter_t:1459927514959839444> <:letter_e:1459926761986068533> <:letter_r:1459927462908530848> <:letter_c:1459926703664267307> <:letter_a:1459926629580017714>
-# <:p_heart:1459929023533682758> **Dia da semana: Terça-feira.**
-# <:p_heart:1459929023533682758> **Tema: livre**
<:bponto:1459927986576036021> (07h30 - 15h00) - Turquia Talk (<@>)
<:bponto:1459927986576036021> (19h00 - 00h00) - Turquia Vote (<@>)

### <:letter_q:1459927432021672051> <:letter_u:1459927542495580345> <:letter_a:1459926629580017714> <:letter_r:1459927462908530848> <:letter_t:1459927514959839444> <:letter_a:1459926629580017714>
-# <:p_heart:1459929023533682758> **Dia da semana: Quarta-feira.**
-# <:p_heart:1459929023533682758> **Tema: férias**
<:bponto:1459927986576036021> (Qualquer Horário) - Turquia Talk (<@>)

### <:letter_q:1459927432021672051> <:letter_u:1459927542495580345> <:letter_i:1459926908962607244> <:letter_n:1459927080614494310> <:letter_t:1459927514959839444> <:letter_a:1459926629580017714>
-# <:p_heart:1459929023533682758> **Dia da semana: Quinta-feira.**
-# <:p_heart:1459929023533682758> **Tema: livre**
<:bponto:1459927986576036021> (Qualquer horário) - Turquia Vote (<@>)

### <:letter_s:1459927489013879036> <:letter_e:1459926761986068533> <:letter_x:1459927624175452242> <:letter_t:1459927514959839444> <:letter_a:1459926629580017714>
-# <:p_heart:1459929023533682758> **Dia da semana: Sexta-feira.**
-# <:p_heart:1459929023533682758> **Tema: livre**
<:bponto:1459927986576036021> (Qualquer Horário) - Turquia Vote (<@>)`
      );

    const components = gerarMenu(embed.data.description);

    if (!cronogramaMessageId) {
      const msg = await channel.send({ embeds: [embed], components });
      cronogramaMessageId = msg.id;
      return;
    }

    try {
      const msg = await channel.messages.fetch(cronogramaMessageId);
      await msg.edit({ embeds: [embed], components });
    } catch {
      const msg = await channel.send({ embeds: [embed], components });
      cronogramaMessageId = msg.id;
    }
  }
};