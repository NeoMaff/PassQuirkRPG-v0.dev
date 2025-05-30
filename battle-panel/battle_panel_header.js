// battle_panel_header.js - Header component for battle encounters
// Based on reference: Combat encounter images

function createBattleHeader(locationData, playerData, enemyData) {
  return {
    title: `⚔️ ${locationData.name}`,
    color: 0xed4245, // Red color for combat
    description: `**${playerData.name}**, in front of you stands a **${enemyData.name}**!\n\nWill you fight the ${enemyData.name} or run away like a coward?`,
    author: {
      name: "PassQuirkRPG Combat System",
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/sword-icon.png",
    },
  }
}

module.exports = { createBattleHeader }
