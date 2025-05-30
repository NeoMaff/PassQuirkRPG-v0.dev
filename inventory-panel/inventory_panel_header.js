// inventory_panel_header.js - Header component for inventory panel
// Based on reference: "Diseño para la tienda y diálogos con los NPC"

const { EmbedBuilder } = require("discord.js")

function createInventoryHeader(playerData, page = 1, totalPages = 3) {
  return {
    title: `📦 Inventory (page ${page} of ${totalPages})`,
    color: 0x2f3136, // Dark Discord theme color
    author: {
      name: `${playerData.name}'s Inventory`,
      iconURL: playerData.avatar || "https://cdn.discordapp.com/embed/avatars/0.png",
    },
    thumbnail: {
      url: playerData.characterAvatar || "https://cdn.discordapp.com/embed/avatars/0.png",
    },
  }
}

module.exports = { createInventoryHeader }
