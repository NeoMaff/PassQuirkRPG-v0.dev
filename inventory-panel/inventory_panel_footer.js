// inventory_panel_footer.js - Footer component with pagination and action buttons

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createInventoryFooter(page = 1, totalPages = 3) {
  const footerText = {
    text: `Use items with /use <item> • Page ${page}/${totalPages} • Type /help for commands`,
    iconURL: "https://cdn.discordapp.com/attachments/placeholder/rpg-icon.png",
  }

  return footerText
}

function createInventoryButtons(page = 1, totalPages = 3) {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`inventory_prev_${page}`)
      .setLabel("◀️ Previous")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === 1),
    new ButtonBuilder()
      .setCustomId(`inventory_next_${page}`)
      .setLabel("Next ▶️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === totalPages),
    new ButtonBuilder().setCustomId("inventory_use").setLabel("🎒 Use Item").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("inventory_close").setLabel("❌ Close").setStyle(ButtonStyle.Danger),
  )

  return [row]
}

module.exports = { createInventoryFooter, createInventoryButtons }
