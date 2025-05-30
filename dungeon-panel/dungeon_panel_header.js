// dungeon_panel_header.js - Header component for dungeon exploration

function createDungeonHeader(dungeonData) {
  return {
    title: `🏰 ${dungeonData.name}`,
    color: 0x5865f2, // Purple/blue for mystery
    author: {
      name: "PassQuirkRPG Dungeon Explorer",
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/dungeon-icon.png",
    },
  }
}

function createDungeonDescription(playerData) {
  const descriptions = [
    `**${playerData.name}**, on your left lies your destiny, in front of you, your fate will be revealed, and on the right your future will unfold. Was that helpful?`,
    `**${playerData.name}**, the ancient corridors whisper secrets of those who came before. Choose your path wisely.`,
    `**${playerData.name}**, shadows dance on the walls as you contemplate your next move. The dungeon awaits your decision.`,
    `**${playerData.name}**, three paths stretch before you, each holding unknown dangers and treasures. Trust your instincts.`,
  ]

  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

module.exports = { createDungeonHeader, createDungeonDescription }
