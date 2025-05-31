const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createCharacterCreationEmbed(playerData) {
  const embed = new EmbedBuilder()
    .setTitle("✅ Confirmación aceptada")
    .setColor(0x57f287)
    .setDescription(
      `**${playerData.name}**, ¡has creado exitosamente tu personaje en la Ranura 2!\n\nTu aventura comienza con:`,
    )
    .addFields(
      { name: "⚔️ Espada básica", value: "\u200B", inline: true },
      { name: "❤️ x5 Pociones de salud", value: "\u200B", inline: true },
      { name: "💙 x5 Pociones de maná", value: "\u200B", inline: true },
      { name: "🧹 x5 Pociones de limpieza", value: "\u200B", inline: true },
    )
    .setThumbnail(playerData.characterAvatar || "https://cdn.discordapp.com/attachments/placeholder/character.png")
    .setFooter({
      text: `Usa /misión y luego /buscar para comenzar tu aventura. • Hoy a las ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`,
    })

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("start_quest").setLabel("🗺️ Iniciar Misión").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("view_character").setLabel("👤 Ver Personaje").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tutorial").setLabel("📖 Tutorial").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed], components: [row] }
}

module.exports = { createCharacterCreationEmbed }
