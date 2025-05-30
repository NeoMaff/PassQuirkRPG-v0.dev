const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createBattleEmbed(playerData, enemyData, locationData) {
  const embed = new EmbedBuilder()
    .setTitle(`⚔️ ${locationData.name}`)
    .setColor(0xed4245)
    .setDescription(
      `**${playerData.name}**, in front of you stands a **${enemyData.name}**!\n\nWill you fight the ${enemyData.name} or run away like a coward?`,
    )
    .addFields(
      {
        name: `${playerData.name}: 🟢 ${playerData.level}`,
        value: `❤️ HP ${playerData.currentHp}/${playerData.maxHp}\n💙 MP ${playerData.currentMp}/${playerData.maxMp}`,
        inline: true,
      },
      {
        name: `${enemyData.name}:`,
        value: `❤️ HP ${enemyData.currentHp}/${enemyData.maxHp}\n💙 MP ${enemyData.currentMp}/${enemyData.maxMp}`,
        inline: true,
      },
    )
    .setImage(locationData.battleImage || "https://cdn.discordapp.com/attachments/placeholder/battle-scene.png")
    .setFooter({ text: "Choose your next action by clicking a button below." })

  const actionRow1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_shoot").setLabel("🏹 Shoot").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_bane").setLabel("💀 Bane").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_heal").setLabel("💚 Heal").setStyle(ButtonStyle.Success),
  )

  const actionRow2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("battle_potion").setLabel("🧪 Potion").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("battle_defend").setLabel("🛡️ Defend").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("battle_escape").setLabel("🏃 Escape").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [actionRow1, actionRow2] }
}

module.exports = { createBattleEmbed }
