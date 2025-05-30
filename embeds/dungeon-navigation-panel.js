const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createDungeonNavigationEmbed(playerData, dungeonData) {
  const embed = new EmbedBuilder()
    .setTitle(`🏰 ${dungeonData.name}`)
    .setColor(0x5865f2)
    .setDescription(
      `**${playerData.name}**, a tu izquierda yace tu destino, frente a ti se revelará tu suerte, y a la derecha se desplegará tu futuro. ¿Fue útil eso?`,
    )
    .addFields({
      name: `🟢 ${playerData.level}`,
      value: `❤️ PS ${playerData.currentHp}/${playerData.maxHp} 💙 PM ${playerData.currentMp}/${playerData.maxMp} 💰 MO ${playerData.gold} 🥇 MV ${playerData.medals}`,
      inline: false,
    })
    .setImage(dungeonData.roomImage || "https://cdn.discordapp.com/attachments/placeholder/dungeon-room.png")
    .setFooter({ text: "Haz clic en un botón abajo para seleccionar tu camino." })

  const directionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("dungeon_left").setLabel("⬅️ Izquierda").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("dungeon_straight").setLabel("⬆️ Recto").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("dungeon_right").setLabel("➡️ Derecha").setStyle(ButtonStyle.Success),
  )

  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("dungeon_potion").setLabel("🧪 Poción").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("dungeon_abandon").setLabel("🚪 Abandonar").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [directionRow, actionRow] }
}

module.exports = { createDungeonNavigationEmbed }
