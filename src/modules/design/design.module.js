// src/modules/design/design.module.js

module.exports = (client) => {
  // garante estruturas globais
  if (!client.prefixCommands) client.prefixCommands = new Map();
  if (!client.interactions) client.interactions = new Map();
  if (!client.reactionHandlers) client.reactionHandlers = [];
  if (!client.services) client.services = [];

  console.log('🎨 MÓDULO DESIGN CARREGADO COM SUCESSO');
};