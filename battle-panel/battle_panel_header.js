// battle_panel_header.js - Componente de encabezado para encuentros de batalla
// Basado en la referencia: Imágenes de encuentros de combate

function createBattleHeader(locationData, playerData, enemyData) {
  return {
    title: `⚔️ ${locationData.name}`,
    color: 0xed4245, // Color rojo para combate
    description: `**${playerData.name}**, ¡frente a ti se encuentra un **${enemyData.name}**!\n\n¿Lucharás contra el ${enemyData.name} o huirás como un cobarde?`,
    author: {
      name: "Sistema de Combate PassQuirkRPG",
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/sword-icon.png",
    },
  }
}

module.exports = { createBattleHeader }
