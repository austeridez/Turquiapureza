const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

/* ===============================
   🤖 CLIENT
=============================== */
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

/* ===============================
   🧠 COLEÇÕES GLOBAIS
=============================== */
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
   📡 EVENTOS (CARREGADOS UMA VEZ)
=============================== */
const readyEvent = require('./events/ready');
const interactionCreateEvent = require('./events/interactionCreate');
const messageCreateEvent = require('./events/messageCreate');
const reactionAddEvent = require('./events/reactionAdd');
const reactionRemoveEvent = require('./events/reactionRemove');

client.once('ready', () => readyEvent(client));

client.on('interactionCreate', (interaction) =>
  interactionCreateEvent(interaction, client)
);

client.on('messageCreate', (message) =>
  messageCreateEvent(message, client)
);

client.on('messageReactionAdd', (reaction, user) =>
  reactionAddEvent(reaction, user, client)
);

client.on('messageReactionRemove', (reaction, user) =>
  reactionRemoveEvent(reaction, user, client)
);

/* ===============================
   🚀 LOGIN
=============================== */
client.login(process.env.TOKEN);