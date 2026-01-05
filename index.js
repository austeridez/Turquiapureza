// index.js (na raiz)
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

// coleções globais
client.prefixCommands = new Map();
client.interactions = new Map();
client.reactionHandlers = [];
client.services = [];

/* ===============================
   🔌 CARREGADOR AUTOMÁTICO DE MÓDULOS
   (módulos ficam em src/modules)
=============================== */
const modulesPath = path.join(__dirname, 'src', 'modules');

// evita crash se a pasta ainda não existir
if (fs.existsSync(modulesPath)) {
  const modules = fs.readdirSync(modulesPath);

  for (const moduleName of modules) {
    const modulePath = path.join(
      modulesPath,
      moduleName,
      `${moduleName}.module.js`
    );

    if (fs.existsSync(modulePath)) {
      require(modulePath)(client);
      console.log(`✅ Módulo carregado: ${moduleName}`);
    }
  }
} else {
  console.warn('⚠️ Pasta src/modules não encontrada');
}

/* ===============================
   📡 EVENTOS GLOBAIS
=============================== */
client.on('ready', () => require('./events/ready')(client));

client.on('interactionCreate', (interaction) =>
  require('./events/interactionCreate')(interaction, client)
);

client.on('messageCreate', (message) =>
  require('./events/messageCreate')(message, client)
);

client.on('messageReactionAdd', (reaction, user) =>
  require('./events/reactionAdd')(reaction, user, client)
);

client.on('messageReactionRemove', (reaction, user) =>
  require('./events/reactionRemove')(reaction, user, client)
);

/* ===============================
   🚀 LOGIN
=============================== */
client.login(process.env.TOKEN);