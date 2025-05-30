const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createGearEquippedEmbed(playerData, equippedItem) {
  const embed = new EmbedBuilder()
    .setTitle("✅ New gear equipped!")
    .setColor(0x57f287)
    .setDescription(`**${playerData.name}**, you successfully equipped your new gear!`)
    .addFields(
      {
        name: "🎒 Equipped Item",
        value: `**${equippedItem.name}**\n${equippedItem.description}\n**Stats:** ${equippedItem.stats}`,
        inline: false,
      },
      {
        name: "📊 Instructions",
        value: `Type \`/profile\` to view your new stats.\n\nType \`/search\` to continue your quest`,
        inline: false,
      },
    )
    .setThumbnail(equippedItem.image || "https://cdn.discordapp.com/attachments/placeholder/gear-icon.png")
    .setFooter({
      text: `Today at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
    })

  const optionsEmbed = new EmbedBuilder()
    .setTitle("⚙️ OPTIONS")
    .setColor(0x2f3136)
    .setDescription(
      "**potions**\n\n**lootbox**\n\n**fairy**\n\n🛒 **buy** buy potion, lootbox, fairy\n\n🔥 **/marketplace** **buy**",
    )
    .setFooter({ text: "(edited)" })

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("view_profile").setLabel("👤 View Profile").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("continue_search").setLabel("🔍 Continue Search").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("open_marketplace").setLabel("🛒 Marketplace").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed, optionsEmbed], components: [row] }
}

module.exports = { createGearEquippedEmbed }
