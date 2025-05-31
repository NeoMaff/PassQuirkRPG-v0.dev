// tournament_panel_body.js - Componente del cuerpo con clasificaciones de jugadores

function createTournamentBody() {
  const rankings = {
    column1: [
      { name: "Sniper", medals: "🥇🥈⭐", rank: 1 },
      { name: "Registry", medals: "🔵🥈⭐", rank: 2 },
      { name: "Mango", medals: "🔵🥈⭐", rank: 3 },
      { name: "Traverxec", medals: "🔵🥈⭐", rank: 4 },
      { name: "Control", medals: "🥇🥈⭐", rank: 5 },
    ],
    column2: [
      { name: "Obscurity", medals: "🔵🥈⭐", rank: 6 },
      { name: "OpenAdmin", medals: "🔵🥈⭐", rank: 7 },
      { name: "Oouch", medals: "🥇🥈⭐", rank: 8 },
      { name: "Multimaster", medals: "🥇🥈⭐", rank: 9 },
      { name: "Traceback", medals: "🔵🥈⭐", rank: 10 },
    ],
    column3: [
      { name: "Remote", medals: "🥇🥈⭐", rank: 11 },
      { name: "ForwardSlash", medals: "🔵🥈⭐", rank: 12 },
      { name: "ServMon", medals: "🔵🥈⭐", rank: 13 },
      { name: "Quick", medals: "🔵🥈⭐", rank: 14 },
      { name: "Admirer", medals: "🔵🥈⭐", rank: 15 },
    ],
  }

  const fields = [
    {
      name: "**1/3**",
      value: rankings.column1.map((player) => `${player.medals} **${player.name}**`).join("\n"),
      inline: true,
    },
    {
      name: "**2/3**",
      value: rankings.column2.map((player) => `${player.medals} **${player.name}**`).join("\n"),
      inline: true,
    },
    {
      name: "**3/3**",
      value: rankings.column3.map((player) => `${player.medals} **${player.name}**`).join("\n"),
      inline: true,
    },
  ]

  return fields
}

function getRankEmoji(rank) {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  if (rank <= 10) return "🏅"
  return "🔵"
}

module.exports = { createTournamentBody, getRankEmoji }
