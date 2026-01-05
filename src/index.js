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

client.prefixCommands = new Map();
client.interactions = new Map();
client.reactionHandlers = [];
client.services = [];

/* ===============================
   🔌 CARREGADOR DE MÓDULOS
=============================== */
const modulesPath = path.join(__dirname, 'modules');
const modules = fs.readdirSync(modulesPath);

for (const moduleName of modules) {
  const moduleFile = path.join(
    modulesPath,
    moduleName,
    `${moduleName}.module.js`
  );

  if (fs.existsSync(moduleFile)) {
    require(moduleFile)(client);
    console.log(`✅ Módulo carregado: ${moduleName}`);
  }
}

/* ===============================
   📡 EVENTOS
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