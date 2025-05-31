const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createTournamentRankingEmbed(tournamentData) {
  const embed = new EmbedBuilder()
    .setTitle("🏆 Clasificación del Torneo PvP Semanal")
    .setColor(0xfee75c)
    .setDescription(
      "**Rango 1:** 🥇 20,000\n**Rango 2:** 🥈 10,000\n**Rango 3:** 🥉 5,000\n**Rango 4-10:** 💰 3,000\n**Rango 11-100:** 💰 1,000\n\nA continuación se muestran los 10 mejores jugadores actuales:",
    )
    .addFields(
      {
        name: "**1/3**",
        value:
          "🥇 🥈 ⭐ **Sniper**\n🔵 🥈 ⭐ **Registry**\n🔵 🥈 ⭐ **Mango**\n🔵 🥈 ⭐ **Traverxec**\n🥇 🥈 ⭐ **Control**",
        inline: true,
      },
      {
        name: "**2/3**",
        value:
          "🔵 🥈 ⭐ **Obscurity**\n🔵 🥈 ⭐ **OpenAdmin**\n🥇 🥈 ⭐ **Oouch**\n🥇 🥈 ⭐ **Multimaster**\n🔵 🥈 ⭐ **Traceback**",
        inline: true,
      },
      {
        name: "**3/3**",
        value:
          "🥇 🥈 ⭐ **Remote**\n🔵 🥈 ⭐ **ForwardSlash**\n🔵 🥈 ⭐ **ServMon**\n🔵 🥈 ⭐ **Quick**\n🔵 🥈 ⭐ **Admirer**",
        inline: true,
      },
    )
    .setFooter({
      text: `${tournamentData.playerName}, actualmente tienes 🥇 ${tournamentData.playerMedals} medallas.\nEscribe '/pvp torneo' para desafiar a otros jugadores y mejorar tu clasificación.`,
    })
    .setThumbnail("https://cdn.discordapp.com/attachments/placeholder/tournament-logo.png")

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("join_tournament").setLabel("⚔️ Unirse al Torneo").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("view_my_rank").setLabel("📊 Mi Clasificación").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tournament_rules").setLabel("📋 Reglas").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed], components: [row] }
}

module.exports = { createTournamentRankingEmbed }
