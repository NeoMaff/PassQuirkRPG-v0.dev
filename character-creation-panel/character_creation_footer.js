// character_creation_footer.js - Footer with next step actions

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createCharacterCreationFooter() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return {
    text: `Take a /quest and then /search to begin your adventure. • Today at ${currentTime}`,
    iconURL: "https://cdn.discordapp.com/attachments/placeholder/adventure-icon.png",
  }
}

function createCharacterCreationButtons() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("start_quest").setLabel("🗺️ Start Quest").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("view_character").setLabel("👤 View Character").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tutorial").setLabel("📖 Tutorial").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("character_customize").setLabel("🎨 Customize").setStyle(ButtonStyle.Secondary),
  )

  return [row]
}

module.exports = { createCharacterCreationFooter, createCharacterCreationButtons }
