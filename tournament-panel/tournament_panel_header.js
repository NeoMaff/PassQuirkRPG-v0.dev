// tournament_panel_header.js - Header component for tournament rankings

function createTournamentHeader() {
  return {
    title: "🏆 Weekly PvP Tournament Ranking",
    color: 0xfee75c, // Gold color for tournament
    thumbnail: {
      url: "https://cdn.discordapp.com/attachments/placeholder/tournament-trophy.png",
    },
    author: {
      name: "PassQuirkRPG Tournament System",
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/tournament-icon.png",
    },
  }
}

function createTournamentDescription() {
  return [
    "**Prize Pool:**",
    "🥇 **Rank 1:** 20,000 Gold",
    "🥈 **Rank 2:** 10,000 Gold",
    "🥉 **Rank 3:** 5,000 Gold",
    "💰 **Rank 4-10:** 3,000 Gold",
    "💰 **Rank 11-100:** 1,000 Gold",
    "",
    "Below are the current top 10 ranked players:",
  ].join("\n")
}

module.exports = { createTournamentHeader, createTournamentDescription }
