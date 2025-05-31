// character_creation_header.js - Header for character creation confirmation

function createCharacterCreationHeader(playerData) {
  return {
    title: "✅ Confirmation accepted",
    color: 0x57f287, // Green for success
    description: `**${playerData.name}**, you successfully created your character in Slot ${playerData.slot || 2}!\n\nYour adventure begins with:`,
    thumbnail: {
      url: playerData.characterAvatar || "https://cdn.discordapp.com/attachments/placeholder/new-character.png",
    },
    author: {
      name: "PassQuirkRPG Character Creation",
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/character-icon.png",
    },
  }
}

module.exports = { createCharacterCreationHeader }
