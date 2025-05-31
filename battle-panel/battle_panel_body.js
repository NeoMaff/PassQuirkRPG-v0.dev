// battle_panel_body.js - Componente del cuerpo que muestra estadísticas de combate y escena de batalla

function createBattleBody(playerData, enemyData, locationData) {
  const fields = [
    {
      name: `${playerData.name}: 🟢 ${playerData.level}`,
      value: `❤️ PS ${playerData.currentHp}/${playerData.maxHp}\n💙 PM ${playerData.currentMp}/${playerData.maxMp}`,
      inline: true,
    },
    {
      name: `${enemyData.name}:`,
      value: `❤️ PS ${enemyData.currentHp}/${enemyData.maxHp}\n💙 PM ${enemyData.currentMp}/${enemyData.maxMp}`,
      inline: true,
    },
    {
      name: "\u200B", // Campo vacío para espaciado
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

  let barColor = "🟢" // Verde
  if (percentage < 30)
    barColor = "🔴" // Rojo
  else if (percentage < 60) barColor = "🟡" // Amarillo

  return `${barColor} [${"█".repeat(filled)}${"░".repeat(empty)}] ${current}/${max}`
}

module.exports = { createBattleBody, createHPBar }
