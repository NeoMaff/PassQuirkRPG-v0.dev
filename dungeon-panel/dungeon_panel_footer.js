// dungeon_panel_footer.js - Footer with navigation and action buttons

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createDungeonFooter() {
  return {
    text: "Click a button below to select your path.",
    iconURL: "https://cdn.discordapp.com/attachments/placeholder/compass-icon.png",
  }
}

function createDungeonButtons() {
  const directionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("dungeon_left").setLabel("⬅️ Left").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("dungeon_straight").setLabel("⬆️ Straight").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("dungeon_right").setLabel("➡️ Right").setStyle(ButtonStyle.Success),
  )

  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("dungeon_potion").setLabel("🧪 Potion").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("dungeon_search").setLabel("🔍 Search").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("dungeon_rest").setLabel("😴 Rest").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("dungeon_abandon").setLabel("🚪 Abandon").setStyle(ButtonStyle.Danger),
  )

  return [directionRow, actionRow]
}

module.exports = { createDungeonFooter, createDungeonButtons }
