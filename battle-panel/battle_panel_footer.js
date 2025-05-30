// battle_panel_footer.js - Footer with combat action buttons

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createBattleFooter() {
  return {
    text: "Choose your next action by clicking a button below.",
    iconURL: "https://cdn.discordapp.com/attachments/placeholder/combat-icon.png",
  }
}

function createBattleButtons() {
  const actionRow1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_shoot").setLabel("🏹 Shoot").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_bane").setLabel("💀 Bane").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_heal").setLabel("💚 Heal").setStyle(ButtonStyle.Success),
  )

  const actionRow2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_potion").setLabel("🧪 Potion").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_defend").setLabel("🛡️ Defend").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_escape").setLabel("🏃 Escape").setStyle(ButtonStyle.Danger),
  )

  return [actionRow1, actionRow2]
}

module.exports = { createBattleFooter, createBattleButtons }
