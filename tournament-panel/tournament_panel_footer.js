// tournament_panel_footer.js - Footer with tournament actions and player info

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createTournamentFooter(playerData) {
  return {
    text: `${playerData.name}, you currently have 🥇 ${playerData.medals} medals.\nType '/pvp tournament' to challenge other players and improve your ranking.`,
    iconURL: playerData.avatar,
  }
}

function createTournamentButtons() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("tournament_join").setLabel("⚔️ Join Tournament").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("tournament_my_rank").setLabel("📊 My Ranking").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tournament_rules").setLabel("📋 Rules").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tournament_history").setLabel("📜 History").setStyle(ButtonStyle.Secondary),
  )

  return [row]
}

module.exports = { createTournamentFooter, createTournamentButtons }
