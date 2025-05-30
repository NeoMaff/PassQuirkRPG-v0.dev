const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

function createTournamentRankingEmbed(tournamentData) {
  const embed = new EmbedBuilder()
    .setTitle("🏆 Weekly PvP Tournament Ranking")
    .setColor(0xfee75c)
    .setDescription(
      "**Rank 1:** 🥇 20,000\n**Rank 2:** 🥈 10,000\n**Rank 3:** 🥉 5,000\n**Rank 4-10:** 💰 3,000\n**Rank 11-100:** 💰 1,000\n\nBelow are the current top 10 ranked players:",
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
      text: `${tournamentData.playerName}, you currently have 🥇 ${tournamentData.playerMedals} medals.\nType '/pvp tournament' to challenge other players and improve your ranking.`,
    })
    .setThumbnail("https://cdn.discordapp.com/attachments/placeholder/tournament-logo.png")

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("join_tournament").setLabel("⚔️ Join Tournament").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("view_my_rank").setLabel("📊 My Ranking").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("tournament_rules").setLabel("📋 Rules").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed], components: [row] }
}

module.exports = { createTournamentRankingEmbed }
