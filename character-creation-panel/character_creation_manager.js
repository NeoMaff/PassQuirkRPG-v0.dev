// character_creation_manager.js - Main manager for character creation

const { EmbedBuilder } = require("discord.js")
const { createCharacterCreationHeader } = require("./character_creation_header")
const { createCharacterCreationBody } = require("./character_creation_body")
const { createCharacterCreationFooter, createCharacterCreationButtons } = require("./character_creation_footer")

function createCharacterCreationEmbed(playerData) {
  const header = createCharacterCreationHeader(playerData)
  const body = createCharacterCreationBody(playerData)
  const footer = createCharacterCreationFooter()
  const buttons = createCharacterCreationButtons()

  const embed = new EmbedBuilder()
    .setTitle(header.title)
    .setColor(header.color)
    .setDescription(header.description)
    .setAuthor(header.author)
    .setThumbnail(header.thumbnail.url)
    .addFields(body)
    .setFooter(footer)
    .setTimestamp()

  return { embeds: [embed], components: buttons }
}

// Character selection embed for choosing slots
function createCharacterSelectionEmbed(playerData) {
  const embed = new EmbedBuilder()
    .setTitle("👥 Character Selection")
    .setColor(0x3498db)
    .setDescription(`**${playerData.name}**, choose a character slot to create your new character:`)
    .addFields([
      {
        name: "🎮 Available Slots",
        value: ["**Slot 1:** Empty", "**Slot 2:** Empty", "**Slot 3:** Empty"].join("\n"),
        inline: true,
      },
      {
        name: "📋 Character Classes",
        value: [
          "⚔️ **Warrior** - High HP, strong attacks",
          "🔮 **Mage** - High MP, magical spells",
          "🗡️ **Rogue** - High speed, critical hits",
          "🏹 **Archer** - Ranged attacks, precision",
        ].join("\n"),
        inline: true,
      },
    ])
    .setFooter({
      text: "Select a slot and class to begin your adventure!",
      iconURL: playerData.avatar,
    })
    .setTimestamp()

  return { embeds: [embed] }
}

module.exports = { createCharacterCreationEmbed, createCharacterSelectionEmbed }
