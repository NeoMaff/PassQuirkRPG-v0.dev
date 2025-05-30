// battle_panel_manager.js - Main manager for battle encounters

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

// Battle result embed for after combat actions
function createBattleResultEmbed(result, playerData, enemyData) {
  const embed = new EmbedBuilder()
    .setTitle(`⚔️ Battle Result`)
    .setColor(result.victory ? 0x57f287 : 0xed4245)
    .setDescription(result.description)
    .addFields([
      {
        name: "Damage Dealt",
        value: `💥 ${result.damageDealt} damage`,
        inline: true,
      },
      {
        name: "Damage Received",
        value: `💔 ${result.damageReceived} damage`,
        inline: true,
      },
      {
        name: "Status",
        value: result.victory ? "🏆 Victory!" : "💀 Defeat!",
        inline: true,
      },
    ])

  if (result.victory && result.rewards) {
    embed.addFields({
      name: "🎁 Rewards",
      value: [
        `💰 Gold: +${result.rewards.gold}`,
        `⭐ XP: +${result.rewards.experience}`,
        result.rewards.items ? `🎒 Items: ${result.rewards.items.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      inline: false,
    })
  }

  return { embeds: [embed] }
}

module.exports = { createBattleEmbed, createBattleResultEmbed }
