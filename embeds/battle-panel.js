const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createBattleEmbed(playerData, enemyData, locationData) {
  const embed = new EmbedBuilder()
    .setTitle(`⚔️ ${locationData.name}`)
    .setColor(0xed4245)
    .setDescription(
      `**${playerData.name}**, ¡frente a ti se encuentra un **${enemyData.name}**!\n\n¿Lucharás contra el ${enemyData.name} o huirás como un cobarde?`,
    )
    .addFields(
      {
        name: `${playerData.name}: 🟢 ${playerData.level}`,
        value: `❤️ PS ${playerData.currentHp}/${playerData.maxHp}\n💙 PM ${playerData.currentMp}/${playerData.maxMp}`,
        inline: true,
      },
      {
        name: `${enemyData.name}:`,
        value: `❤️ PS ${enemyData.currentHp}/${enemyData.maxHp}\n💙 PM ${enemyData.currentMp}/${enemyData.maxMp}`,
        inline: true,
      },
    )
    .setImage(locationData.battleImage || "https://cdn.discordapp.com/attachments/placeholder/battle-scene.png")
    .setFooter({ text: "Elige tu próxima acción haciendo clic en un botón de abajo." })

  const actionRow1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_shoot").setLabel("🏹 Disparar").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_bane").setLabel("💀 Maldición").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_heal").setLabel("💚 Curar").setStyle(ButtonStyle.Success),
  )

  const actionRow2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_potion").setLabel("🧪 Poción").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_defend").setLabel("🛡️ Defender").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_escape").setLabel("🏃 Escapar").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [actionRow1, actionRow2] }
}

module.exports = { createBattleEmbed }
