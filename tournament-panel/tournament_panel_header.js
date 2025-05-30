// tournament_panel_header.js - Componente de encabezado para clasificaciones de torneo

function createTournamentHeader() {
  return {
    title: "🏆 Clasificación del Torneo PvP Semanal",
    color: 0xfee75c, // Color dorado para torneo
    thumbnail: {
      url: "https://cdn.discordapp.com/attachments/placeholder/tournament-trophy.png",
    },
    author: {
      name: "Sistema de Torneos PassQuirkRPG",
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/tournament-icon.png",
    },
  }
}

function createTournamentDescription() {
  return [
    "**Premios:**",
    "🥇 **Rango 1:** 20,000 Oro",
    "🥈 **Rango 2:** 10,000 Oro",
    "🥉 **Rango 3:** 5,000 Oro",
    "💰 **Rango 4-10:** 3,000 Oro",
    "💰 **Rango 11-100:** 1,000 Oro",
    "",
    "A continuación se muestran los 10 mejores jugadores actuales:",
  ].join("\n")
}

module.exports = { createTournamentHeader, createTournamentDescription }
