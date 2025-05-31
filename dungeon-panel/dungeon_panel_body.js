// dungeon_panel_body.js - Body component with player stats and room imagery

function createDungeonBody(playerData, dungeonData) {
  const fields = [
    {
      name: `🟢 Level ${playerData.level}`,
      value: `❤️ HP ${playerData.currentHp}/${playerData.maxHp} 💙 MP ${playerData.currentMp}/${playerData.maxMp} 💰 CG ${playerData.gold} 🥇 OG ${playerData.medals}`,
      inline: false,
    },
  ]

  // Add room-specific information if available
  if (dungeonData.roomInfo) {
    fields.push({
      name: "🔍 Room Details",
      value: dungeonData.roomInfo,
      inline: false,
    })
  }

  const image = {
    url: dungeonData.roomImage || "https://cdn.discordapp.com/attachments/placeholder/dungeon-room.png",
  }

  return { fields, image }
}

function createPlayerStatsBar(playerData) {
  const hpPercentage = (playerData.currentHp / playerData.maxHp) * 100
  const mpPercentage = (playerData.currentMp / playerData.maxMp) * 100

  const hpBar = createStatBar(hpPercentage, "❤️")
  const mpBar = createStatBar(mpPercentage, "💙")

  return `${hpBar} HP: ${playerData.currentHp}/${playerData.maxHp}\n${mpBar} MP: ${playerData.currentMp}/${playerData.maxMp}`
}

function createStatBar(percentage, emoji) {
  const filled = Math.round(percentage / 10)
  const empty = 10 - filled

  return `${emoji} [${"█".repeat(filled)}${"░".repeat(empty)}]`
}

module.exports = { createDungeonBody, createPlayerStatsBar }
