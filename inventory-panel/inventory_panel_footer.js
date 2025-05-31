// inventory_panel_footer.js - Componente de pie de página con paginación y botones de acción

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createInventoryFooter(page = 1, totalPages = 3) {
  const footerText = {
    text: `Usa objetos con /usar <objeto> • Página ${page}/${totalPages} • Escribe /ayuda para comandos`,
    iconURL: "https://cdn.discordapp.com/attachments/placeholder/rpg-icon.png",
  }

  return footerText
}

function createInventoryButtons(page = 1, totalPages = 3) {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`inventory_prev_${page}`)
      .setLabel("◀️ Anterior")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === 1),
    new ButtonBuilder()
      .setCustomId(`inventory_next_${page}`)
      .setLabel("Siguiente ▶️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === totalPages),
    new ButtonBuilder().setCustomId("inventory_use").setLabel("🎒 Usar Objeto").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("inventory_close").setLabel("❌ Cerrar").setStyle(ButtonStyle.Danger),
  )

  return [row]
}

module.exports = { createInventoryFooter, createInventoryButtons }
