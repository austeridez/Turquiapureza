const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

const CRONOGRAMA_CHANNEL_ID = '1449807522281033759';

const GESTAO_ROLES = [
  '1448673656153837578',
  '1448823932298985644'
];

let cronogramaMessageId = null;

module.exports = {
  name: 'postagenssemanal',

  async execute(message, client) {
    // permissão: só gestão
    const member = await message.guild.members.fetch(message.author.id);
    const hasPermission = GESTAO_ROLES.some(roleId =>
      member.roles.cache.has(roleId)
    );

    if (!hasPermission) return;

    if (message.deletable) {
      await message.delete().catch(() => {});
    }

    const channel = await client.channels.fetch(CRONOGRAMA_CHANNEL_ID);

    const embed = new EmbedBuilder()
      .setColor('#d38bff')
      .setDescription(
`## <:a_invi:1459927934629318697>      <:letter_e:1459926761986068533> <:letter_s:1459927489013879036> <:letter_c:1459926703664267307> <:letter_a:1459926629580017714> <:letter_l:1459927029716877543> <:letter_a:1459926629580017714>
## <:a_invi:1459927934629318697>  <:letter_s:1459927489013879036> <:letter_e:1459926761986068533> <:letter_m:1459927054261686426> <:letter_a:1459926629580017714> <:letter_n:1459927080614494310> <:letter_a:1459926629580017714> <:letter_l:1459927029716877543>
-# <:a_invi:1459927934629318697> ︶︶𝆺𝅥︶﹒︶︶𝆹𝅥︶﹒<a:sylveon_lurk:1459928424390070314> ﹒︶𝆹𝅥︶︶﹒︶𝆺𝅥︶︶
<:a_invi:1459927934629318697> 𐔌   ۪   ׂ 𓈒 𖦹˙ **Escolha o seu dia de postagem!**

*(Etapa 2 – menu de teste)*`
      );

    const menu = new StringSelectMenuBuilder()
      .setCustomId('postagens_menu')
      .setPlaceholder('Selecione um horário')
      .addOptions(
        {
          label: 'Segunda-feira — 08h00 às 22h00',
          value: 'Segunda-feira (08h00–22h00) — Turquia Vote'
        },
        {
          label: 'Terça-feira — 07h30 às 15h00',
          value: 'Terça-feira (07h30–15h00) — Turquia Talk'
        },
        {
          label: 'Terça-feira — 19h00 às 00h00',
          value: 'Terça-feira (19h00–00h00) — Turquia Vote'
        },
        {
          label: 'Quarta-feira — Qualquer horário',
          value: 'Quarta-feira (Qualquer horário) — Turquia Talk'
        },
        {
          label: 'Quinta-feira — Qualquer horário',
          value: 'Quinta-feira (Qualquer horário) — Turquia Vote'
        },
        {
          label: 'Sexta-feira — Qualquer horário',
          value: 'Sexta-feira (Qualquer horário) — Turquia Vote'
        }
      );

    const row = new ActionRowBuilder().addComponents(menu);

    if (!cronogramaMessageId) {
      const msg = await channel.send({
        embeds: [embed],
        components: [row]
      });
      cronogramaMessageId = msg.id;
      return;
    }

    try {
      const msg = await channel.messages.fetch(cronogramaMessageId);
      await msg.edit({
        embeds: [embed],
        components: [row]
      });
    } catch {
      const msg = await channel.send({
        embeds: [embed],
        components: [row]
      });
      cronogramaMessageId = msg.id;
    }
  }
};