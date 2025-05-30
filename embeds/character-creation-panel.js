const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createCharacterCreationEmbed(playerData) {
  const embed = new EmbedBuilder()
    .setTitle("✅ Confirmation accepted")
    .setColor(0x57f287)
    .setDescription(
      `**${playerData.name}**, you successfully created your character in Slot 2!\n\nYour adventure begins with:`,
    )
    .addFields(
      { name: "⚔️ Basic sword", value: "\u200B", inline: true },
      { name: "❤️ x5 Health potions", value: "\u200B", inline: true },
      { name: "💙 x5 Mana potions", value: "\u200B", inline: true },
      { name: "🧹 x5 Cleanse potions", value: "\u200B", inline: true },
    )
    .setThumbnail(playerData.characterAvatar || "https://cdn.discordapp.com/attachments/placeholder/character.png")
    .setFooter({
      text: `Take a /quest and then /search to begin your adventure. • Today at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
    })

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("start_quest").setLabel("🗺️ Start Quest").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("view_character").setLabel("👤 View Character").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tutorial").setLabel("📖 Tutorial").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed], components: [row] }
}

module.exports = { createCharacterCreationEmbed }
