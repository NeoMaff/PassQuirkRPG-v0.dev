const { EmbedBuilder } = require("discord.js")

/**
 * COLORES BASADOS EN LAS IMÁGENES DE REFERENCIA
 */
const COLORS = {
  PROFILE_DARK: "#2F3136", // Fondo oscuro del perfil (imagen 1)
  POKEMON_PURPLE: "#8B5CF6", // Morado del Gengar (imagen 2)
  COMBAT_YELLOW: "#FFD700", // Amarillo para combate (imagen 3)
  ACCENT_GREEN: "#10B981", // Verde de barras activas
  ACCENT_BLUE: "#3B82F6", // Azul de elementos destacados
  PROGRESS_GRAY: "#4B5563", // Gris para barras vacías
  TEXT_YELLOW: "#FCD34D", // Amarillo para texto destacado
}

/**
 * FUNCIÓN PARA CREAR BARRAS DE PROGRESO VISUALES
 */
function createProgressBar(current, max, length = 20, filled = "█", empty = "░") {
  const percentage = Math.min(current / max, 1)
  const filledLength = Math.floor(percentage * length)
  const emptyLength = length - filledLength

  return {
    bar: filled.repeat(filledLength) + empty.repeat(emptyLength),
    percentage: Math.round(percentage * 100),
  }
}

/**
 * DISEÑO 1: PERFIL DE USUARIO (Basado en imagen 1 - 0xc45 Elite Hacker)
 */
function createUserProfileEmbed(userData) {
  const embed = new EmbedBuilder()
    .setColor(COLORS.PROFILE_DARK)
    .setAuthor({
      name: userData.username,
      iconURL: userData.avatar,
    })
    .setThumbnail(userData.avatar)
    .setDescription(`**${userData.title}**. Member of the **${userData.team}** team.\n*(${userData.description})*`)

  // Información de ranking con formato exacto de la imagen
  embed.addFields({
    name: "📊 Ranking Information",
    value: `\`\`\`ansi
\u001b[32m●\u001b[0m \u001b[33m${userData.rank}th\u001b[0m | \u001b[36m⚡ ${userData.level}th\u001b[0m ) 🏅 [+${userData.points}]

\u001b[33mLocale\u001b[0m    : ${userData.location}
\u001b[32m+ Respect\u001b[0m : ${userData.respect}
\u001b[31m× Owns\u001b[0m    : 📱 ${userData.owns.mobile} 🖥️ ${userData.owns.desktop} ⚙️ ${userData.owns.other}
\u001b[32m+ NextRank\u001b[0m: ${userData.nextRank}
\`\`\``,
    inline: false,
  })

  // Sección Fortress con barras de progreso exactas
  if (userData.fortress) {
    let fortressText = ""
    userData.fortress.forEach((item) => {
      const progress = createProgressBar(item.current, 100, 15)
      const color = item.current > 0 ? "33" : "37" // Amarillo si tiene progreso, gris si no
      fortressText += `\u001b[${color}m${item.name}\u001b[0m - [${progress.bar}] ${item.percentage}%\n`
    })

    embed.addFields({
      name: "🏰 Fortress",
      value: `\`\`\`ansi\n${fortressText}\`\`\``,
      inline: false,
    })
  }

  // Sección Pro Lab con indicadores activos/inactivos
  if (userData.proLab) {
    let proLabText = ""
    userData.proLab.forEach((item) => {
      const progress = createProgressBar(item.current, 100, 15)
      const indicator = item.active ? "\u001b[34m#\u001b[0m" : "-"
      const nameColor = item.active ? "34" : "37"
      proLabText += `${indicator} \u001b[${nameColor}m${item.name}\u001b[0m - [${progress.bar}] ${item.percentage}%\n`
    })

    embed.addFields({
      name: "🧪 Pro Lab",
      value: `\`\`\`ansi\n${proLabText}\`\`\``,
      inline: false,
    })
  }

  embed
    .setFooter({
      text: `ℹ️ Members last updated ${userData.lastUpdate}`,
    })
    .setTimestamp()

  return embed
}

/**
 * DISEÑO 2: ESTADÍSTICAS DE POKÉMON (Basado en imagen 2 - Gengar)
 */
function createPokemonStatsEmbed(pokemonData) {
  const embed = new EmbedBuilder()
    .setColor(COLORS.POKEMON_PURPLE)
    .setTitle(`[Lv. ${pokemonData.level}] ${pokemonData.name} (#${pokemonData.id})`)
    .setDescription(pokemonData.description)
    .setThumbnail(pokemonData.sprite)

  // Información básica en formato de tabla
  embed.addFields({
    name: "📋 Basic Information",
    value: `\`\`\`ansi
\u001b[33mType\u001b[0m     \u001b[33mAbility\u001b[0m           \u001b[33mNature\u001b[0m
${pokemonData.type}    ${pokemonData.ability}    ${pokemonData.nature}

\u001b[33mRarity\u001b[0m   \u001b[33mShiny\u001b[0m            \u001b[33mDate Caught\u001b[0m
${pokemonData.rarity}     ${pokemonData.shiny ? "True" : "False"}             ${pokemonData.dateCaught}
\`\`\``,
    inline: false,
  })

  // Estadísticas base con barras de progreso (lado izquierdo)
  let statsText = ""
  const baseStats = [
    { name: "HP", value: pokemonData.stats.hp, iv: pokemonData.ivs.hp, ev: pokemonData.evs.hp },
    { name: "Atk", value: pokemonData.stats.attack, iv: pokemonData.ivs.attack, ev: pokemonData.evs.attack },
    { name: "Def", value: pokemonData.stats.defense, iv: pokemonData.ivs.defense, ev: pokemonData.evs.defense },
    {
      name: "SpA",
      value: pokemonData.stats.specialAttack,
      iv: pokemonData.ivs.specialAttack,
      ev: pokemonData.evs.specialAttack,
    },
    {
      name: "SpD",
      value: pokemonData.stats.specialDefense,
      iv: pokemonData.ivs.specialDefense,
      ev: pokemonData.evs.specialDefense,
    },
    { name: "Spe", value: pokemonData.stats.speed, iv: pokemonData.ivs.speed, ev: pokemonData.evs.speed },
  ]

  baseStats.forEach((stat) => {
    const progress = createProgressBar(stat.value, 300, 12)
    statsText += `\u001b[33m${stat.name}\u001b[0m (${stat.value}|${stat.iv}|${stat.ev}) [${progress.bar}]\n`
  })

  embed.addFields({
    name: "📊 Stats (Stat|IVs|EVs)",
    value: `\`\`\`ansi\n${statsText}\nPower: ${pokemonData.totalPower}\n\`\`\``,
    inline: true,
  })

  // Power Items (lado derecho) - Formato exacto de la imagen
  if (pokemonData.powerItems && pokemonData.powerItems.length > 0) {
    let powerItemsText = ""

    pokemonData.powerItems.forEach((item) => {
      powerItemsText += `\u001b[33m🔸 [Lv ${item.level}] ${item.name}\u001b[0m\n`
      item.stats.forEach((stat) => {
        const typeColor = stat.type === "PRI" ? "31" : stat.type === "SEC" ? "34" : "37"
        powerItemsText += `\u001b[${typeColor}m[${stat.type}]\u001b[0m ${stat.name} ${stat.value}\n`
      })
      powerItemsText += "\n"
    })

    embed.addFields({
      name: "⚡ Power Items",
      value: `\`\`\`ansi\n${powerItemsText}\`\`\``,
      inline: true,
    })
  }

  // Progreso de nivel
  const levelProgress = createProgressBar(pokemonData.currentExp, pokemonData.nextLevelExp, 20)
  embed.addFields({
    name: "📈 Level Progress",
    value: `\`\`\`ansi\n[${levelProgress.bar}] ${levelProgress.percentage}%\n\`\`\``,
    inline: false,
  })

  return embed
}

/**
 * DISEÑO 3: INTERFAZ DE COMBATE (Basado en imagen 3 - Forbidden Tomb)
 */
function createCombatEmbed(combatData) {
  const embed = new EmbedBuilder()
    .setColor(COLORS.COMBAT_YELLOW)
    .setTitle(combatData.location)
    .setDescription(`**${combatData.playerName}**, ${combatData.description}`)
    .setImage(combatData.battleImage)

  // Estadísticas de combate lado a lado
  embed.addFields(
    {
      name: `❤️ ${combatData.player.name}`,
      value: `\`\`\`ansi
\u001b[31m❤️ HP\u001b[0m ${combatData.player.hp}/${combatData.player.maxHp}
\u001b[34m💙 MP\u001b[0m ${combatData.player.mp}/${combatData.player.maxMp}
\`\`\``,
      inline: true,
    },
    {
      name: `⚔️ ${combatData.enemy.name}`,
      value: `\`\`\`ansi
\u001b[31m❤️ HP\u001b[0m ${combatData.enemy.hp}/${combatData.enemy.maxHp}
\u001b[34m💙 MP\u001b[0m ${combatData.enemy.mp}/${combatData.enemy.maxMp}
\`\`\``,
      inline: true,
    },
  )

  // Pregunta de acción
  embed.addFields({
    name: "⚡ Combat Action",
    value: `\`\`\`ansi\n\u001b[33m${combatData.question}\u001b[0m\n\`\`\``,
    inline: false,
  })

  embed.setFooter({
    text: "Choose your next action by clicking a button below.",
  })

  return embed
}

/**
 * DISEÑO 4: EMBED DE NOTIFICACIÓN CON TEMA AMARILLO
 */
function createNotificationEmbed(title, message, type = "info") {
  const colors = {
    info: COLORS.COMBAT_YELLOW,
    success: COLORS.ACCENT_GREEN,
    warning: "#FF8C00",
    error: "#DC143C",
  }

  const emojis = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  }

  const embed = new EmbedBuilder()
    .setColor(colors[type])
    .setTitle(`${emojis[type]} ${title}`)
    .setDescription(`\`\`\`ansi\n\u001b[33m${message}\u001b[0m\n\`\`\``)
    .setTimestamp()

  return embed
}

/**
 * DISEÑO 5: EMBED DE ESTADÍSTICAS CON BARRAS VISUALES
 */
function createStatsEmbed(statsData) {
  const embed = new EmbedBuilder()
    .setColor(COLORS.COMBAT_YELLOW)
    .setTitle("📊 Server Statistics")
    .setDescription("Current server statistics and activity")

  // Estadísticas principales con barras de progreso
  let statsText = ""
  statsData.stats.forEach((stat) => {
    const progress = createProgressBar(stat.current, stat.max, 15)
    const percentage = Math.round((stat.current / stat.max) * 100)
    statsText += `\u001b[33m${stat.name}\u001b[0m: ${stat.current}/${stat.max}\n[${progress.bar}] ${percentage}%\n\n`
  })

  embed.addFields({
    name: "📈 Activity Metrics",
    value: `\`\`\`ansi\n${statsText}\`\`\``,
    inline: false,
  })

  embed
    .setFooter({
      text: "📊 Updated automatically every hour",
    })
    .setTimestamp()

  return embed
}

/**
 * FUNCIÓN PARA CREAR LÍNEA DECORATIVA ANIMADA
 */
function createDecorativeLine() {
  return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linea-imagen-animada-0429-hh8jWA1Ef2kbGmCpUxNrXWua0H6eEP.gif"
}

// Exportar todas las funciones de diseño
module.exports = {
  createUserProfileEmbed,
  createPokemonStatsEmbed,
  createCombatEmbed,
  createNotificationEmbed,
  createStatsEmbed,
  createDecorativeLine,
  COLORS,
}
