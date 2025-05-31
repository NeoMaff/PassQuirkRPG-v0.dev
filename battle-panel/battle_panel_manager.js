// battle_panel_manager.js - Gestor principal para encuentros de batalla

const { EmbedBuilder } = require("discord.js")
const { createBattleHeader } = require("./battle_panel_header")
const { createBattleBody } = require("./battle_panel_body")
const { createBattleFooter, createBattleButtons } = require("./battle_panel_footer")

function createBattleEmbed(playerData, enemyData, locationData) {
  const header = createBattleHeader(locationData, playerData, enemyData)
  const body = createBattleBody(playerData, enemyData, locationData)
  const footer = createBattleFooter()
  const buttons = createBattleButtons()

  const embed = new EmbedBuilder()
    .setTitle(header.title)
    .setColor(header.color)
    .setDescription(header.description)
    .setAuthor(header.author)
    .addFields(body.fields)
    .setImage(body.image.url)
    .setFooter(footer)
    .setTimestamp()

  return { embeds: [embed], components: buttons }
}

// Embed de resultado de batalla para después de las acciones de combate
function createBattleResultEmbed(result, playerData, enemyData) {
  const embed = new EmbedBuilder()
    .setTitle(`⚔️ Resultado de Batalla`)
    .setColor(result.victory ? 0x57f287 : 0xed4245)
    .setDescription(result.description)
    .addFields([
      {
        name: "Daño Causado",
        value: `💥 ${result.damageDealt} daño`,
        inline: true,
      },
      {
        name: "Daño Recibido",
        value: `💔 ${result.damageReceived} daño`,
        inline: true,
      },
      {
        name: "Estado",
        value: result.victory ? "🏆 ¡Victoria!" : "💀 ¡Derrota!",
        inline: true,
      },
    ])

  if (result.victory && result.rewards) {
    embed.addFields({
      name: "🎁 Recompensas",
      value: [
        `💰 Oro: +${result.rewards.gold}`,
        `⭐ XP: +${result.rewards.experience}`,
        result.rewards.items ? `🎒 Objetos: ${result.rewards.items.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      inline: false,
    })
  }

  return { embeds: [embed] }
}

module.exports = { createBattleEmbed, createBattleResultEmbed }
