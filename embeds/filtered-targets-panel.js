const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require("discord.js")

function createFilteredTargetsEmbed(playerData, completedTargets) {
  const embed = new EmbedBuilder()
    .setTitle("🎯 Filtered Targets")
    .setColor(0x5865f2)
    .setDescription(
      `📊 Showing **15** (inactive, Web) machine targets completed by **${playerData.name}** 🔧 and **you**`,
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
      text: `Completed: ${completedTargets.length}/15 targets • Use filters to narrow down results`,
    })

  const filterRow = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId("target_filter")
      .setPlaceholder("🔍 Filter by category...")
      .addOptions([
        {
          label: "All Targets",
          description: "Show all available targets",
          value: "all",
          emoji: "🎯",
        },
        {
          label: "Web Targets",
          description: "Show only web-based targets",
          value: "web",
          emoji: "🌐",
        },
        {
          label: "Active Targets",
          description: "Show only active targets",
          value: "active",
          emoji: "🟢",
        },
        {
          label: "Completed",
          description: "Show completed targets",
          value: "completed",
          emoji: "✅",
        },
      ]),
  )

  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("refresh_targets").setLabel("🔄 Refresh").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("target_details").setLabel("📋 Details").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("export_targets").setLabel("📤 Export").setStyle(ButtonStyle.Secondary),
  )

  return { embeds: [embed], components: [filterRow, actionRow] }
}

module.exports = { createFilteredTargetsEmbed }
