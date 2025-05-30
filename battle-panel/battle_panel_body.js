// battle_panel_body.js - Body component showing combat stats and battle scene

function createBattleBody(playerData, enemyData, locationData) {
  const fields = [
    {
      name: `${playerData.name}: 🟢 ${playerData.level}`,
      value: `❤️ HP ${playerData.currentHp}/${playerData.maxHp}\n💙 MP ${playerData.currentMp}/${playerData.maxMp}`,
      inline: true,
    },
    {
      name: `${enemyData.name}:`,
      value: `❤️ HP ${enemyData.currentHp}/${enemyData.maxHp}\n💙 MP ${enemyData.currentMp}/${enemyData.maxMp}`,
      inline: true,
    },
    {
      name: "\u200B", // Empty field for spacing
      value: "\u200B",
      inline: true,
    },
  ]

  const image = {
    url: locationData.battleImage || "https://cdn.discordapp.com/attachments/placeholder/battle-scene.png",
  }

  return { fields, image }
}

function createHPBar(current, max, length = 10) {
  const percentage = (current / max) * 100
  const filled = Math.round((percentage / 100) * length)
  const empty = length - filled

  let barColor = "🟢" // Green
  if (percentage < 30)
    barColor = "🔴" // Red
  else if (percentage < 60) barColor = "🟡" // Yellow

  return `${barColor} [${"█".repeat(filled)}${"░".repeat(empty)}] ${current}/${max}`
}

module.exports = { createBattleBody, createHPBar }
