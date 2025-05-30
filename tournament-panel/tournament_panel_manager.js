// tournament_panel_manager.js - Main manager for tournament system

const { EmbedBuilder } = require("discord.js")
const { createTournamentHeader, createTournamentDescription } = require("./tournament_panel_header")
const { createTournamentBody } = require("./tournament_panel_body")
const { createTournamentFooter, createTournamentButtons } = require("./tournament_panel_footer")

function createTournamentEmbed(playerData) {
  const header = createTournamentHeader()
  const description = createTournamentDescription()
  const body = createTournamentBody()
  const footer = createTournamentFooter(playerData)
  const buttons = createTournamentButtons()

  const embed = new EmbedBuilder()
    .setTitle(header.title)
    .setColor(header.color)
    .setAuthor(header.author)
    .setThumbnail(header.thumbnail.url)
    .setDescription(description)
    .addFields(body)
    .setFooter(footer)
    .setTimestamp()

  return { embeds: [embed], components: buttons }
}

// Tournament registration embed
function createTournamentRegistrationEmbed(playerData) {
  const embed = new EmbedBuilder()
    .setTitle("🎯 Tournament Registration")
    .setColor(0x57f287)
    .setDescription(`**${playerData.name}**, you have successfully registered for the Weekly PvP Tournament!`)
    .addFields([
      {
        name: "📅 Tournament Info",
        value: [
          "**Start Time:** Every Monday 8:00 PM UTC",
          "**Duration:** 7 days",
          "**Entry Fee:** Free",
          "**Max Participants:** 100 players",
        ].join("\n"),
        inline: false,
      },
      {
        name: "⚔️ How to Participate",
        value: [
          "1. Challenge other players with `/pvp challenge @user`",
          "2. Win battles to earn tournament points",
          "3. Climb the leaderboard for better rewards",
          "4. Check your ranking with `/tournament rank`",
        ].join("\n"),
        inline: false,
      },
    ])
    .setFooter({
      text: "Good luck in the tournament! May the best warrior win.",
      iconURL: playerData.avatar,
    })
    .setTimestamp()

  return { embeds: [embed] }
}

module.exports = { createTournamentEmbed, createTournamentRegistrationEmbed }
