const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
} = require("discord.js")

// Inicializar cliente de Discord con los intents necesarios
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

/**
 * ESQUEMA DE COLORES AMARILLO
 * Rationale: Los tonos amarillos evocan energía, positividad y atención
 * - Amarillo dorado: Representa prestigio y valor
 * - Amarillo brillante: Llama la atención sobre información importante
 * - Amarillo cálido: Crea una sensación acogedora y amigable
 */
const COLOR_SCHEME = {
  PRIMARY: "#FFD700", // Oro - Color principal para fondos de embed
  SECONDARY: "#FFA500", // Naranja dorado - Para acentos y elementos secundarios
  ACCENT: "#FFFF00", // Amarillo brillante - Para destacar información crítica
  WARM: "#FFEB3B", // Amarillo cálido - Para texto y elementos suaves
  DARK: "#B8860B", // Oro oscuro - Para contraste y profundidad
  LIGHT: "#FFFACD", // Amarillo claro - Para fondos sutiles
  SUCCESS: "#9ACD32", // Verde amarillento - Para mensajes de éxito
  WARNING: "#FF8C00", // Naranja oscuro - Para advertencias
  ERROR: "#DC143C", // Rojo - Para errores (contraste necesario)
}

/**
 * EMOJIS ANIMADOS PERSONALIZADOS
 * Nota: Reemplazar con IDs reales de emojis de emoji.gg
 * Formato: <a:nombre:ID> para emojis animados
 */
const ANIMATED_EMOJIS = {
  STAR: "<a:golden_star:123456789>",
  SPARKLE: "<a:yellow_sparkle:123456790>",
  FIRE: "<a:golden_fire:123456791>",
  LIGHTNING: "<a:yellow_lightning:123456792>",
  CROWN: "<a:golden_crown:123456793>",
  DIAMOND: "<a:yellow_diamond:123456794>",
  HEART: "<a:golden_heart:123456795>",
  ARROW: "<a:yellow_arrow:123456796>",
  COIN: "<a:spinning_coin:123456797>",
  TROPHY: "<a:golden_trophy:123456798>",
}

/**
 * TEXTO COLOREADO USANDO CÓDIGOS ANSI
 * Implementación del sistema de colores de Discord para texto
 * Referencia: https://rebane2001.com/discord-colored-text-generator/
 */
const COLORED_TEXT = {
  // Colores básicos
  YELLOW: (text) => `\`\`\`ansi\n\u001b[33m${text}\u001b[0m\n\`\`\``,
  ORANGE: (text) => `\`\`\`ansi\n\u001b[31m${text}\u001b[0m\n\`\`\``,
  GREEN: (text) => `\`\`\`ansi\n\u001b[32m${text}\u001b[0m\n\`\`\``,
  BLUE: (text) => `\`\`\`ansi\n\u001b[34m${text}\u001b[0m\n\`\`\``,
  PURPLE: (text) => `\`\`\`ansi\n\u001b[35m${text}\u001b[0m\n\`\`\``,
  CYAN: (text) => `\`\`\`ansi\n\u001b[36m${text}\u001b[0m\n\`\`\``,

  // Colores con fondo
  YELLOW_BG: (text) => `\`\`\`ansi\n\u001b[43m\u001b[30m${text}\u001b[0m\n\`\`\``,

  // Texto con múltiples colores en una línea
  MULTI_COLOR: (parts) => {
    const coloredParts = parts.map((part) => `\u001b[${part.code}m${part.text}\u001b[0m`).join(" ")
    return `\`\`\`ansi\n${coloredParts}\n\`\`\``
  },
}

/**
 * LÍNEAS DECORATIVAS ANIMADAS
 * Utiliza la imagen animada proporcionada como separador visual
 */
const DECORATIVE_ELEMENTS = {
  ANIMATED_LINE:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linea-imagen-animada-0429-hh8jWA1Ef2kbGmCpUxNrXWua0H6eEP.gif",

  // Líneas de texto ASCII para complementar
  TOP_BORDER: "```ansi\n\u001b[33m╔══════════════════════════════════════════════════════════════╗\u001b[0m\n```",
  MIDDLE_SEPARATOR: "```ansi\n\u001b[33m╠══════════════════════════════════════════════════════════════╣\u001b[0m\n```",
  BOTTOM_BORDER: "```ansi\n\u001b[33m╚══════════════════════════════════════════════════════════════╝\u001b[0m\n```",

  // Separadores más sutiles
  THIN_LINE: "```ansi\n\u001b[33m────────────────────────────────────────────────────────────────\u001b[0m\n```",
  DOTTED_LINE: "```ansi\n\u001b[33m┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\u001b[0m\n```",
}

/**
 * CLASE PRINCIPAL PARA CREAR EMBEDS PERSONALIZADOS
 * Esta clase encapsula toda la lógica para crear embeds con el tema amarillo
 */
class YellowThemeEmbedBuilder {
  constructor() {
    this.embed = new EmbedBuilder()
    this.attachments = []
  }

  /**
   * Configurar el tema base del embed
   * @param {string} type - Tipo de embed (success, warning, error, info)
   */
  setTheme(type = "info") {
    const themes = {
      info: COLOR_SCHEME.PRIMARY,
      success: COLOR_SCHEME.SUCCESS,
      warning: COLOR_SCHEME.WARNING,
      error: COLOR_SCHEME.ERROR,
    }

    this.embed.setColor(themes[type] || COLOR_SCHEME.PRIMARY)
    return this
  }

  /**
   * Añadir título con emoji animado
   * @param {string} title - Título del embed
   * @param {string} emoji - Emoji animado a usar
   */
  setAnimatedTitle(title, emoji = ANIMATED_EMOJIS.STAR) {
    this.embed.setTitle(`${emoji} ${title} ${emoji}`)
    return this
  }

  /**
   * Añadir descripción con texto coloreado
   * @param {string} description - Descripción principal
   * @param {boolean} useColoredText - Si usar texto coloreado ANSI
   */
  setColoredDescription(description, useColoredText = true) {
    if (useColoredText) {
      this.embed.setDescription(COLORED_TEXT.YELLOW(description))
    } else {
      this.embed.setDescription(description)
    }
    return this
  }

  /**
   * Añadir campo con formato especial
   * @param {string} name - Nombre del campo
   * @param {string} value - Valor del campo
   * @param {boolean} inline - Si el campo debe ser inline
   * @param {string} emoji - Emoji para el nombre del campo
   */
  addColoredField(name, value, inline = false, emoji = ANIMATED_EMOJIS.ARROW) {
    this.embed.addFields({
      name: `${emoji} ${name}`,
      value: COLORED_TEXT.MULTI_COLOR([
        { code: "33", text: value }, // Amarillo
      ]),
      inline,
    })
    return this
  }

  /**
   * Añadir múltiples campos con diferentes colores
   * @param {Array} fields - Array de objetos con información de campos
   */
  addMultiColorFields(fields) {
    fields.forEach((field) => {
      const coloredValue = COLORED_TEXT.MULTI_COLOR(field.colorParts || [{ code: "33", text: field.value }])

      this.embed.addFields({
        name: `${field.emoji || ANIMATED_EMOJIS.DIAMOND} ${field.name}`,
        value: coloredValue,
        inline: field.inline || false,
      })
    })
    return this
  }

  /**
   * Añadir imagen de línea animada como separador
   */
  addAnimatedSeparator() {
    // La línea animada se añade como imagen en el embed
    this.embed.setImage(DECORATIVE_ELEMENTS.ANIMATED_LINE)
    return this
  }

  /**
   * Configurar footer con información adicional
   * @param {string} text - Texto del footer
   * @param {string} iconURL - URL del icono del footer
   */
  setAnimatedFooter(text, iconURL = null) {
    this.embed.setFooter({
      text: `${ANIMATED_EMOJIS.SPARKLE} ${text} ${ANIMATED_EMOJIS.SPARKLE}`,
      iconURL,
    })
    return this
  }

  /**
   * Añadir timestamp actual
   */
  addTimestamp() {
    this.embed.setTimestamp()
    return this
  }

  /**
   * Construir y retornar el embed final
   */
  build() {
    return {
      embeds: [this.embed],
      files: this.attachments,
    }
  }
}

/**
 * FUNCIONES PARA CREAR DIFERENTES TIPOS DE MENSAJES
 */

/**
 * Crear embed de bienvenida
 * @param {Object} user - Objeto usuario de Discord
 */
function createWelcomeEmbed(user) {
  return new YellowThemeEmbedBuilder()
    .setTheme("success")
    .setAnimatedTitle("¡Bienvenido al Servidor!", ANIMATED_EMOJIS.CROWN)
    .setColoredDescription(`¡Hola ${user.username}! Nos alegra tenerte aquí.`)
    .addColoredField(
      "Información del Usuario",
      `Usuario: ${user.username}\nID: ${user.id}\nCuenta creada: ${user.createdAt.toDateString()}`,
      false,
      ANIMATED_EMOJIS.STAR,
    )
    .addAnimatedSeparator()
    .setAnimatedFooter("Sistema de Bienvenida", user.displayAvatarURL())
    .addTimestamp()
    .build()
}

/**
 * Crear embed de estadísticas
 * @param {Object} stats - Objeto con estadísticas
 */
function createStatsEmbed(stats) {
  const fields = [
    {
      name: "Usuarios Totales",
      value: stats.totalUsers.toString(),
      emoji: ANIMATED_EMOJIS.TROPHY,
      colorParts: [{ code: "32", text: stats.totalUsers.toString() }],
      inline: true,
    },
    {
      name: "Usuarios Activos",
      value: stats.activeUsers.toString(),
      emoji: ANIMATED_EMOJIS.FIRE,
      colorParts: [{ code: "33", text: stats.activeUsers.toString() }],
      inline: true,
    },
    {
      name: "Mensajes Hoy",
      value: stats.messagesTotal.toString(),
      emoji: ANIMATED_EMOJIS.LIGHTNING,
      colorParts: [{ code: "36", text: stats.messagesTotal.toString() }],
      inline: true,
    },
  ]

  return new YellowThemeEmbedBuilder()
    .setTheme("info")
    .setAnimatedTitle("Estadísticas del Servidor", ANIMATED_EMOJIS.DIAMOND)
    .setColoredDescription("Aquí tienes las estadísticas más recientes del servidor")
    .addMultiColorFields(fields)
    .addAnimatedSeparator()
    .setAnimatedFooter("Actualizado automáticamente")
    .addTimestamp()
    .build()
}

/**
 * Crear embed de notificación
 * @param {string} title - Título de la notificación
 * @param {string} message - Mensaje de la notificación
 * @param {string} type - Tipo de notificación (info, warning, error, success)
 */
function createNotificationEmbed(title, message, type = "info") {
  const emojiMap = {
    info: ANIMATED_EMOJIS.STAR,
    success: ANIMATED_EMOJIS.TROPHY,
    warning: ANIMATED_EMOJIS.LIGHTNING,
    error: ANIMATED_EMOJIS.FIRE,
  }

  return new YellowThemeEmbedBuilder()
    .setTheme(type)
    .setAnimatedTitle(title, emojiMap[type])
    .setColoredDescription(message)
    .addAnimatedSeparator()
    .setAnimatedFooter("Sistema de Notificaciones")
    .addTimestamp()
    .build()
}

/**
 * Crear botones interactivos con tema amarillo
 * @param {string} type - Tipo de botones a crear
 */
function createYellowThemeButtons(type = "default") {
  const row = new ActionRowBuilder()

  switch (type) {
    case "welcome":
      row.addComponents(
        new ButtonBuilder()
          .setCustomId("view_rules")
          .setLabel("Ver Reglas")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("📋"),
        new ButtonBuilder()
          .setCustomId("get_roles")
          .setLabel("Obtener Roles")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("🎭"),
        new ButtonBuilder().setCustomId("help").setLabel("Ayuda").setStyle(ButtonStyle.Success).setEmoji("❓"),
      )
      break

    case "stats":
      row.addComponents(
        new ButtonBuilder()
          .setCustomId("refresh_stats")
          .setLabel("Actualizar")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🔄"),
        new ButtonBuilder()
          .setCustomId("detailed_stats")
          .setLabel("Detalles")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("📊"),
      )
      break

    default:
      row.addComponents(
        new ButtonBuilder().setCustomId("confirm").setLabel("Confirmar").setStyle(ButtonStyle.Success).setEmoji("✅"),
        new ButtonBuilder().setCustomId("cancel").setLabel("Cancelar").setStyle(ButtonStyle.Danger).setEmoji("❌"),
      )
  }

  return row
}

/**
 * COMANDOS DEL BOT
 */
client.on("messageCreate", async (message) => {
  // Ignorar mensajes de bots
  if (message.author.bot) return

  // Solo procesar comandos que empiecen con !
  if (!message.content.startsWith("!")) return

  const args = message.content.slice(1).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  try {
    switch (command) {
      case "bienvenida":
      case "welcome":
        const welcomeData = createWelcomeEmbed(message.author)
        const welcomeButtons = createYellowThemeButtons("welcome")

        await message.reply({
          content: DECORATIVE_ELEMENTS.TOP_BORDER,
          ...welcomeData,
          components: [welcomeButtons],
        })
        break

      case "stats":
      case "estadisticas":
        // Simular estadísticas del servidor
        const mockStats = {
          totalUsers: message.guild?.memberCount || 100,
          activeUsers: Math.floor((message.guild?.memberCount || 100) * 0.3),
          messagesTotal: Math.floor(Math.random() * 1000) + 500,
        }

        const statsData = createStatsEmbed(mockStats)
        const statsButtons = createYellowThemeButtons("stats")

        await message.reply({
          content: DECORATIVE_ELEMENTS.TOP_BORDER,
          ...statsData,
          components: [statsButtons],
        })
        break

      case "notificacion":
      case "notify":
        const notifyType = args[0] || "info"
        const notifyTitle = args[1] || "Notificación"
        const notifyMessage = args.slice(2).join(" ") || "Este es un mensaje de prueba"

        const notificationData = createNotificationEmbed(notifyTitle, notifyMessage, notifyType)

        await message.reply({
          content: DECORATIVE_ELEMENTS.TOP_BORDER,
          ...notificationData,
        })
        break

      case "test":
        // Comando de prueba para mostrar todas las características
        const testEmbed = new YellowThemeEmbedBuilder()
          .setTheme("info")
          .setAnimatedTitle("Prueba de Características", ANIMATED_EMOJIS.CROWN)
          .setColoredDescription("Este embed demuestra todas las características del tema amarillo")
          .addMultiColorFields([
            {
              name: "Texto Amarillo",
              value: "Este texto está en amarillo",
              emoji: ANIMATED_EMOJIS.STAR,
              colorParts: [{ code: "33", text: "Este texto está en amarillo" }],
              inline: true,
            },
            {
              name: "Texto Verde",
              value: "Este texto está en verde",
              emoji: ANIMATED_EMOJIS.TROPHY,
              colorParts: [{ code: "32", text: "Este texto está en verde" }],
              inline: true,
            },
            {
              name: "Texto Multicolor",
              value: "Amarillo y Azul juntos",
              emoji: ANIMATED_EMOJIS.DIAMOND,
              colorParts: [
                { code: "33", text: "Amarillo" },
                { code: "34", text: "y" },
                { code: "36", text: "Azul" },
                { code: "33", text: "juntos" },
              ],
              inline: false,
            },
          ])
          .addAnimatedSeparator()
          .setAnimatedFooter("Sistema de Pruebas Completo")
          .addTimestamp()
          .build()

        await message.reply({
          content: DECORATIVE_ELEMENTS.TOP_BORDER,
          ...testEmbed,
        })
        break

      case "help":
      case "ayuda":
        const helpEmbed = new YellowThemeEmbedBuilder()
          .setTheme("info")
          .setAnimatedTitle("Comandos Disponibles", ANIMATED_EMOJIS.LIGHTNING)
          .setColoredDescription("Lista completa de comandos del bot")
          .addMultiColorFields([
            {
              name: "!bienvenida",
              value: "Muestra mensaje de bienvenida",
              emoji: ANIMATED_EMOJIS.CROWN,
              inline: true,
            },
            {
              name: "!stats",
              value: "Muestra estadísticas del servidor",
              emoji: ANIMATED_EMOJIS.TROPHY,
              inline: true,
            },
            {
              name: "!notificacion [tipo] [título] [mensaje]",
              value: "Crea una notificación personalizada",
              emoji: ANIMATED_EMOJIS.FIRE,
              inline: false,
            },
            {
              name: "!test",
              value: "Prueba todas las características visuales",
              emoji: ANIMATED_EMOJIS.DIAMOND,
              inline: true,
            },
          ])
          .addAnimatedSeparator()
          .setAnimatedFooter("Bot de Embeds Temáticos v1.0")
          .addTimestamp()
          .build()

        await message.reply({
          content: DECORATIVE_ELEMENTS.TOP_BORDER,
          ...helpEmbed,
        })
        break

      default:
        const unknownEmbed = createNotificationEmbed(
          "Comando Desconocido",
          `El comando "${command}" no existe. Usa !help para ver los comandos disponibles.`,
          "warning",
        )

        await message.reply({
          content: DECORATIVE_ELEMENTS.TOP_BORDER,
          ...unknownEmbed,
        })
    }
  } catch (error) {
    console.error("Error ejecutando comando:", error)

    const errorEmbed = createNotificationEmbed(
      "Error del Sistema",
      "Ocurrió un error al procesar tu comando. Por favor, inténtalo de nuevo.",
      "error",
    )

    await message.reply({
      content: DECORATIVE_ELEMENTS.TOP_BORDER,
      ...errorEmbed,
    })
  }
})

/**
 * MANEJO DE INTERACCIONES DE BOTONES
 */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return

  const responses = {
    view_rules: {
      title: "Reglas del Servidor",
      message: "Aquí están las reglas principales del servidor...",
      type: "info",
    },
    get_roles: {
      title: "Roles Disponibles",
      message: "Selecciona los roles que te interesan...",
      type: "success",
    },
    help: {
      title: "Centro de Ayuda",
      message: "Si necesitas ayuda, contacta con los moderadores.",
      type: "info",
    },
    refresh_stats: {
      title: "Estadísticas Actualizadas",
      message: "Las estadísticas han sido actualizadas correctamente.",
      type: "success",
    },
    detailed_stats: {
      title: "Estadísticas Detalladas",
      message: "Mostrando información detallada del servidor...",
      type: "info",
    },
    confirm: {
      title: "Acción Confirmada",
      message: "Tu acción ha sido procesada correctamente.",
      type: "success",
    },
    cancel: {
      title: "Acción Cancelada",
      message: "La operación ha sido cancelada.",
      type: "warning",
    },
  }

  const response = responses[interaction.customId]
  if (response) {
    const responseEmbed = createNotificationEmbed(response.title, response.message, response.type)

    await interaction.reply({
      ...responseEmbed,
      ephemeral: true,
    })
  }
})

/**
 * EVENTO DE CONEXIÓN DEL BOT
 */
client.on("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`)
  console.log(`🎨 Tema amarillo activado con líneas animadas`)
  console.log(`🚀 Bot listo para usar en ${client.guilds.cache.size} servidores`)

  // Establecer actividad del bot
  client.user.setActivity("🌟 Embeds Temáticos Amarillos", {
    type: "WATCHING",
  })
})

/**
 * MANEJO DE ERRORES GLOBALES
 */
client.on("error", (error) => {
  console.error("❌ Error del cliente Discord:", error)
})

process.on("unhandledRejection", (error) => {
  console.error("❌ Error no manejado:", error)
})

// Conectar el bot (reemplazar con tu token real)
client.login("TU_TOKEN_DE_BOT_AQUI")
