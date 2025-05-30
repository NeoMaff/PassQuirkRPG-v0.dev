const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createGearEquippedEmbed(playerData, equippedItem) {
  const embed = new EmbedBuilder()
    .setTitle("✅ ¡Nuevo equipo equipado!")
    .setColor(0x57f287)
    .setDescription(`**${playerData.name}**, ¡has equipado exitosamente tu nuevo equipo!`)
    .addFields(
      {
        name: "🎒 Objeto Equipado",
        value: `**${equippedItem.name}**\n${equippedItem.description}\n**Estadísticas:** ${equippedItem.stats}`,
        inline: false,
      },
      {
        name: "📊 Instrucciones",
        value: `Escribe \`/perfil\` para ver tus nuevas estadísticas.\n\nEscribe \`/buscar\` para continuar tu misión`,
        inline: false,
      },
    )
    .setThumbnail(equippedItem.image || "https://cdn.discordapp.com/attachments/placeholder/gear-icon.png")
    .setFooter({
      text: `Hoy a las ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`,
    })

  const optionsEmbed = new EmbedBuilder()
    .setTitle("⚙️ OPCIONES")
    .setColor(0x2f3136)
    .setDescription(
      "**pociones**\n\n**cofre**\n\n**hada**\n\n🛒 **comprar** comprar poción, cofre, hada\n\n🔥 **/mercado** **comprar**",
    )
    .setFooter({ text: "(editado)" })

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("view_profile").setLabel("👤 Ver Perfil").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("continue_search").setLabel("🔍 Continuar Búsqueda").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("open_marketplace").setLabel("🛒 Mercado").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed, optionsEmbed], components: [row] }
}

module.exports = { createGearEquippedEmbed }
