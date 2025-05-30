const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createPvPEncounterEmbed(playerData, opponentData) {
  const embed = new EmbedBuilder()
    .setTitle("⚔️ PvP Encounter")
    .setColor(0xed4245)
    .setDescription(
      `**${playerData.name}** vs. **${opponentData.name}**!\n\n**${opponentData.name}** takes the initiative and charges at you!\n\nIt's time for payback... or surrender.`,
    )
    .addFields(
      {
        name: `${playerData.name}:`,
        value: `🟢 Level ${playerData.level}\n❤️ HP ${playerData.currentHp}/${playerData.maxHp}\n💙 MP ${playerData.currentMp}/${playerData.maxMp}`,
        inline: true,
      },
      {
        name: `${opponentData.name}:`,
        value: `🟢 Level ${opponentData.level}\n❤️ HP ${opponentData.currentHp}/${opponentData.maxHp}\n💙 MP ${opponentData.currentMp}/${opponentData.maxMp}`,
        inline: true,
      },
    )
    .setImage("https://cdn.discordapp.com/attachments/placeholder/pvp-arena.png")
    .setFooter({ text: "Choose your next action by clicking a button below." })

  const actionRow1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("pvp_shoot").setLabel("🏹 Shoot").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("pvp_bane").setLabel("💀 Bane").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("pvp_heal").setLabel("💚 Heal").setStyle(ButtonStyle.Success),
  )

  const actionRow2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("pvp_defend").setLabel("🛡️ Defend").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("pvp_surrender").setLabel("🏳️ Surrender").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [actionRow1, actionRow2] }
}

module.exports = { createPvPEncounterEmbed }
