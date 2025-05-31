const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createInventoryEmbed(playerData, page = 1, totalPages = 3) {
  const inventoryItems = {
    1: [
      {
        name: "🪢 Cuerda",
        description:
          "Una fina cuerda tejida con crin de caballo y hierbas, parece que puede soportar fácilmente el peso de un hombre grande u orco.",
        value: "3 Valor",
      },
      {
        name: "🧪 Poción de Habilidad",
        description: "Habilidad +4: Repone tu puntuación de habilidad",
        value: "2 Valor",
      },
      {
        name: "🧪 Poción de Resistencia",
        description: "Resistencia +4: Añade a tu puntuación de resistencia",
        value: "3 Valor",
      },
    ],
    2: [
      {
        name: "🧪 Restaurador de Resistencia",
        description: "Resistencia +12: Restaura una gran cantidad de resistencia",
        value: "5 Valor",
      },
      {
        name: "🧪 Restaurador de Resistencia",
        description: "Resistencia +12: Restaura una gran cantidad de resistencia",
        value: "5 Valor",
      },
      {
        name: "🛡️ Armadura de estaño",
        description: "Armadura +1: Un conjunto de armadura de estaño bastante endeble",
        value: "2 Valor",
      },
    ],
    3: [
      {
        name: "🪓 Hacha de estaño",
        description: "Arma +1: Un hacha de estaño endeble, utilizada en todo el campo para talar árboles pequeños",
        value: "Equipado 🟡 5 Valor",
      },
      {
        name: "🔮 Bola de cristal",
        description:
          "Una bola de cristal de adivino, vieja, maltratada y usada. Hecha de vidrio, por supuesto, no de cristal real, y probablemente sin valor.",
        value: "1 Valor",
      },
    ],
  }

  const embed = new EmbedBuilder()
    .setTitle(`Inventario (página ${page} de ${totalPages})`)
    .setColor(0x2f3136)
    .setDescription(`Inventario de **${playerData.name}**`)
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
      .setLabel("◀️ Anterior")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === 1),
    new ButtonBuilder()
      .setCustomId(`inventory_next_${page}`)
      .setLabel("Siguiente ▶️")
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(page === totalPages),
    new ButtonBuilder().setCustomId("inventory_close").setLabel("❌ Cerrar").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [row] }
}

module.exports = { createInventoryEmbed }
