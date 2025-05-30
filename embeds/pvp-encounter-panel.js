const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createPvPEncounterEmbed(playerData, opponentData) {
  const embed = new EmbedBuilder()
    .setTitle("⚔️ Encuentro PvP")
    .setColor(0xed4245)
    .setDescription(
      `**${playerData.name}** vs. **${opponentData.name}**!\n\n**${opponentData.name}** toma la iniciativa y carga contra ti!\n\nEs hora de vengarse... o rendirse.`,
    )
    .addFields(
      {
        name: `${playerData.name}:`,
        value: `🟢 Nivel ${playerData.level}\n❤️ PS ${playerData.currentHp}/${playerData.maxHp}\n💙 PM ${playerData.currentMp}/${playerData.maxMp}`,
        inline: true,
      },
      {
        name: `${opponentData.name}:`,
        value: `🟢 Nivel ${opponentData.level}\n❤️ PS ${opponentData.currentHp}/${opponentData.maxHp}\n💙 PM ${opponentData.currentMp}/${opponentData.maxMp}`,
        inline: true,
      },
    )
    .setImage("https://cdn.discordapp.com/attachments/placeholder/pvp-arena.png")
    .setFooter({ text: "Elige tu próxima acción haciendo clic en un botón de abajo." })

  const actionRow1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("pvp_shoot").setLabel("🏹 Disparar").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("pvp_bane").setLabel("💀 Maldición").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("pvp_heal").setLabel("💚 Curar").setStyle(ButtonStyle.Success),
  )

  const actionRow2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("pvp_defend").setLabel("🛡️ Defender").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("pvp_surrender").setLabel("🏳️ Rendirse").setStyle(ButtonStyle.Danger),
  )

  return { embeds: [embed], components: [actionRow1, actionRow2] }
}

module.exports = { createPvPEncounterEmbed }
