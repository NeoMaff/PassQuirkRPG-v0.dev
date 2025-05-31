// tournament_panel_manager.js - Gestor principal para el sistema de torneos

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

// Embed de registro de torneo
function createTournamentRegistrationEmbed(playerData) {
  const embed = new EmbedBuilder()
    .setTitle("🎯 Registro de Torneo")
    .setColor(0x57f287)
    .setDescription(`**${playerData.name}**, ¡te has registrado exitosamente para el Torneo PvP Semanal!`)
    .addFields([
      {
        name: "📅 Información del Torneo",
        value: [
          "**Hora de Inicio:** Todos los lunes 8:00 PM UTC",
          "**Duración:** 7 días",
          "**Cuota de Entrada:** Gratis",
          "**Máximo de Participantes:** 100 jugadores",
        ].join("\n"),
        inline: false,
      },
      {
        name: "⚔️ Cómo Participar",
        value: [
          "1. Desafía a otros jugadores con `/pvp desafiar @usuario`",
          "2. Gana batallas para obtener puntos de torneo",
          "3. Sube en la clasificación para obtener mejores recompensas",
          "4. Comprueba tu clasificación con `/torneo rango`",
        ].join("\n"),
        inline: false,
      },
    ])
    .setFooter({
      text: "¡Buena suerte en el torneo! Que gane el mejor guerrero.",
      iconURL: playerData.avatar,
    })
    .setTimestamp()

  return { embeds: [embed] }
}

module.exports = { createTournamentEmbed, createTournamentRegistrationEmbed }
