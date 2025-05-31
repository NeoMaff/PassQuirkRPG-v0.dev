// inventory_panel_header.js - Componente de encabezado para el panel de inventario
// Basado en la referencia: "Diseño para la tienda y diálogos con los NPC"

const { EmbedBuilder } = require("discord.js")

function createInventoryHeader(playerData, page = 1, totalPages = 3) {
  return {
    title: `📦 Inventario (página ${page} de ${totalPages})`,
    color: 0x2f3136, // Color del tema oscuro de Discord
    author: {
      name: `Inventario de ${playerData.name}`,
      iconURL: playerData.avatar || "https://cdn.discordapp.com/embed/avatars/0.png",
    },
    thumbnail: {
      url: playerData.characterAvatar || "https://cdn.discordapp.com/embed/avatars/0.png",
    },
  }
}

module.exports = { createInventoryHeader }
