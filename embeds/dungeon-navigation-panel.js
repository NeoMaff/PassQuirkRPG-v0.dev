const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createDungeonNavigationEmbed(playerData, dungeonData) {
  const embed = new EmbedBuilder()
    .setTitle(`🏰 ${dungeonData.name}`)
    .setColor(0x5865f2)
    .setDescription(
      `**${playerData.name}**, on your left lies your destiny, in front of you, your fate will be revealed, and on the right your future will unfold. Was that helpful?`,
    )
    .addFields({
      name: `🟢 ${playerData.level}`,
      value: `❤️ HP ${playerData.currentHp}/${playerData.maxHp} 💙 MP ${playerData.currentMp}/${playerData.maxMp} 💰 CG ${playerData.gold} 🥇 OG ${playerData.medals}`,
      inline: false,
    })
    .setImage(dungeonData.roomImage || "https://cdn.discordapp.com/attachments/placeholder/dungeon-room.png")
    .setFooter({ text: "Click a button below to select your path." })

  const directionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("dungeon_left").setLabel("⬅️ Left").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("dungeon_straight").setLabel("⬆️ Straight").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("dungeon_right").setLabel("➡️ Right").setStyle(ButtonStyle.Success),
  )

  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("dungeon_potion").setLabel("🧪 Potion").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("dungeon_abandon").setLabel("🚪 Abandon").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [directionRow, actionRow] }
}

module.exports = { createDungeonNavigationEmbed }
