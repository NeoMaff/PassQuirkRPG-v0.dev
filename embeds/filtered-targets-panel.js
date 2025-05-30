const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js")

function createFilteredTargetsEmbed(playerData, completedTargets) {
  const embed = new EmbedBuilder()
    .setTitle("🎯 Objetivos Filtrados")
    .setColor(0x5865f2)
    .setDescription(
      `📊 Mostrando **15** objetivos de máquinas (inactivas, Web) completados por **${playerData.name}** 🔧 y **tú**`,
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
      text: `Completados: ${completedTargets.length}/15 objetivos • Usa filtros para refinar resultados`,
    })

  const filterRow = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId("target_filter")
      .setPlaceholder("🔍 Filtrar por categoría...")
      .addOptions([
        {
          label: "Todos los Objetivos",
          description: "Mostrar todos los objetivos disponibles",
          value: "all",
          emoji: "🎯",
        },
        {
          label: "Objetivos Web",
          description: "Mostrar solo objetivos basados en web",
          value: "web",
          emoji: "🌐",
        },
        {
          label: "Objetivos Activos",
          description: "Mostrar solo objetivos activos",
          value: "active",
          emoji: "🟢",
        },
        {
          label: "Completados",
          description: "Mostrar objetivos completados",
          value: "completed",
          emoji: "✅",
        },
      ]),
  )

  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("refresh_targets").setLabel("🔄 Actualizar").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("target_details").setLabel("📋 Detalles").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("export_targets").setLabel("📤 Exportar").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed], components: [filterRow, actionRow] }
}

module.exports = { createFilteredTargetsEmbed }
