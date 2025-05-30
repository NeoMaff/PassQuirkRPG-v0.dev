const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createInventoryEmbed(playerData, page = 1, totalPages = 3) {
  const inventoryItems = {
    1: [
      {
        name: "🪢 Rope",
        description:
          "A fine rope woven from horsehair and grasses, looks like it can easily hold the weight of a large man or orc.",
        value: "3 Value",
      },
      {
        name: "🧪 Skill Potion",
        description: "Skill +4: Replenishes your skill score",
        value: "2 Value",
      },
      {
        name: "🧪 Stamina Potion",
        description: "Stamina +4: Adds to your stamina score",
        value: "3 Value",
      },
    ],
    2: [
      {
        name: "🧪 Stamina Restorer",
        description: "Stamina +12: Restores a large amount of stamina",
        value: "5 Value",
      },
      {
        name: "🧪 Stamina Restorer",
        description: "Stamina +12: Restores a large amount of stamina",
        value: "5 Value",
      },
      {
        name: "🛡️ Tin armour",
        description: "Armour +1: A set of quite flimsy tin armour",
        value: "2 Value",
      },
    ],
    3: [
      {
        name: "🪓 Tin axe",
        description: "Weapon +1: A flimsy tin axe, used throughout the countryside for felling small trees",
        value: "Equipped 🟡 5 Value",
      },
      {
        name: "🔮 Crystal ball",
        description:
          "A fortune tellers crystal ball, old battered and used. Made of glass of course, not real crystal, and probably worthless.",
        value: "1 Value",
      },
    ],
  }

  const embed = new EmbedBuilder()
    .setTitle(`Inventory (page ${page} of ${totalPages})`)
    .setColor(0x2f3136)
    .setDescription(`**${playerData.name}**'s inventory`)
    .setThumbnail(playerData.avatar || "https://cdn.discordapp.com/embed/avatars/0.png")

  const items = inventoryItems[page] || []
  items.forEach((item) => {
    embed.addFields({
      name: item.name,
      value: `${item.description}\n💰 ${item.value}`,
      inline: true,
    })
  })

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`inventory_prev_${page}`)
      .setLabel("◀️ Previous")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === 1),
    new ButtonBuilder()
      .setCustomId(`inventory_next_${page}`)
      .setLabel("Next ▶️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === totalPages),
    new ButtonBuilder().setCustomId("inventory_close").setLabel("❌ Close").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [row] }
}

module.exports = { createInventoryEmbed }
