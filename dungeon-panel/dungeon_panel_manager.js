// dungeon_panel_manager.js - Main manager for dungeon exploration

const { EmbedBuilder } = require("discord.js")
const { createDungeonHeader, createDungeonDescription } = require("./dungeon_panel_header")
const { createDungeonBody } = require("./dungeon_panel_body")
const { createDungeonFooter, createDungeonButtons } = require("./dungeon_panel_footer")

function createDungeonEmbed(playerData, dungeonData) {
  const header = createDungeonHeader(dungeonData)
  const description = createDungeonDescription(playerData)
  const body = createDungeonBody(playerData, dungeonData)
  const footer = createDungeonFooter()
  const buttons = createDungeonButtons()

  const embed = new EmbedBuilder()
    .setTitle(header.title)
    .setColor(header.color)
    .setAuthor(header.author)
    .setDescription(description)
    .addFields(body.fields)
    .setImage(body.image.url)
    .setFooter(footer)
    .setTimestamp()

  return { embeds: [embed], components: buttons }
}

// Dungeon event embed for special encounters
function createDungeonEventEmbed(eventData, playerData) {
  const embed = new EmbedBuilder()
    .setTitle(`🎭 ${eventData.title}`)
    .setColor(eventData.color || 0x9b59b6)
    .setDescription(eventData.description)
    .setImage(eventData.image)

  if (eventData.choices) {
    embed.addFields({
      name: "🤔 What do you do?",
      value: eventData.choices.map((choice, index) => `${index + 1}. ${choice}`).join("\n"),
      inline: false,
    })
  }

  if (eventData.rewards) {
    embed.addFields({
      name: "🎁 Potential Rewards",
      value: eventData.rewards.join("\n"),
      inline: false,
    })
  }

  embed
    .setFooter({
      text: `${playerData.name} • Dungeon Event`,
      iconURL: playerData.avatar,
    })
    .setTimestamp()

  return { embeds: [embed] }
}

module.exports = { createDungeonEmbed, createDungeonEventEmbed }
