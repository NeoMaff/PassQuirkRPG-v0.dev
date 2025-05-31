// tournament_panel_footer.js - Pie de página con acciones de torneo e información del jugador

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createTournamentFooter(playerData) {
  return {
    text: `${playerData.name}, actualmente tienes 🥇 ${playerData.medals} medallas.\nEscribe '/pvp torneo' para desafiar a otros jugadores y mejorar tu clasificación.`,
    iconURL: playerData.avatar,
  }
}

function createTournamentButtons() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("tournament_join").setLabel("⚔️ Unirse al Torneo").setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("tournament_my_rank")
      .setLabel("📊 Mi Clasificación")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tournament_rules").setLabel("📋 Reglas").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tournament_history").setLabel("📜 Historial").setStyle(ButtonStyle.Secondary),
  )

  return [row]
}

module.exports = { createTournamentFooter, createTournamentButtons }
