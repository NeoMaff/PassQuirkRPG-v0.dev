// battle_panel_footer.js - Pie de página con botones de acción de combate

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createBattleFooter() {
  return {
    text: "Elige tu próxima acción haciendo clic en un botón de abajo.",
    iconURL: "https://cdn.discordapp.com/attachments/placeholder/combat-icon.png",
  }
}

function createBattleButtons() {
  const actionRow1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_shoot").setLabel("🏹 Disparar").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_bane").setLabel("💀 Maldición").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_heal").setLabel("💚 Curar").setStyle(ButtonStyle.Success),
  )

  const actionRow2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_potion").setLabel("🧪 Poción").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_defend").setLabel("🛡️ Defender").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_escape").setLabel("🏃 Escapar").setStyle(ButtonStyle.Danger),
  )

  return [actionRow1, actionRow2]
}

module.exports = { createBattleFooter, createBattleButtons }
