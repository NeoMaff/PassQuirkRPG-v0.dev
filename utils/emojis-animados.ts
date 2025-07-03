export const EMOJIS_ANIMADOS = {
  // Estrellas y Efectos
  ESTRELLAS: {
    PURPURA: "https://cdn3.emoji.gg/emojis/5417_star_purple.gif",
    AZUL: "https://cdn3.emoji.gg/emojis/70857-star-b.gif",
    ROJA: "https://cdn3.emoji.gg/emojis/42684-star-r.gif",
    AMARILLA: "https://cdn3.emoji.gg/emojis/19097-star-y.gif",
    GENERICA: "https://cdn3.emoji.gg/emojis/40437-star.gif",
    SPARKLES_VERDE: "https://cdn3.emoji.gg/emojis/5267-green-sparkles.gif",
    SPARKLE_STARS: "https://cdn3.emoji.gg/emojis/58229-sparklestars.gif",
  },

  // Coronas y Rangos
  CORONAS: {
    VERDE: "https://cdn3.emoji.gg/emojis/47232-crown-green.gif",
  },

  // Elementos y Efectos
  ELEMENTOS: {
    FUEGO_VERDE: "https://cdn3.emoji.gg/emojis/7384-greenfire.gif",
    TIERRA_MINECRAFT: "https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif",
  },

  // Celebración y Recompensas
  CELEBRACION: {
    REGALO_NAVIDAD: "https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif",
    GG: "https://cdn3.emoji.gg/emojis/68602-gg.gif",
    TADA: "https://cdn3.emoji.gg/emojis/65115-tada.gif",
  },

  // Utilidades
  UTILIDADES: {
    PAPELERA: "https://cdn3.emoji.gg/emojis/90616-bin.gif",
  },
}

export function emoji(categoria: keyof typeof EMOJIS_ANIMADOS, tipo: string): string {
  try {
    const categoriaObj = EMOJIS_ANIMADOS[categoria] as Record<string, string>
    return categoriaObj[tipo] || ""
  } catch (error) {
    console.warn(`Emoji no encontrado: ${categoria}.${tipo}`)
    return ""
  }
}

export function formatearConEmoji(texto: string, emojiUrl: string): string {
  return emojiUrl ? `${texto}` : texto
}

export function obtenerEmojiClaseAnimado(clase: string): string {
  const emojisClase: Record<string, string> = {
    Guerrero: emoji("ESTRELLAS", "ROJA"),
    Mago: emoji("ESTRELLAS", "PURPURA"),
    Arquero: emoji("ESTRELLAS", "SPARKLES_VERDE"),
    Sanador: emoji("ESTRELLAS", "AMARILLA"),
    Asesino: emoji("ESTRELLAS", "GENERICA"),
    Tanque: emoji("ESTRELLAS", "AZUL"),
    Berserker: emoji("ELEMENTOS", "FUEGO_VERDE"),
  }

  return emojisClase[clase] || emoji("ESTRELLAS", "SPARKLE_STARS")
}
