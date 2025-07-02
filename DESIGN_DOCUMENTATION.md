# Discord Embed Designs - Documentation

## 🎨 Diseños Disponibles

### 1. **User Profile Embed** (Basado en imagen 1)
- **Función**: `createUserProfileEmbed(userData)`
- **Características**:
  - Fondo oscuro (#2F3136)
  - Información de ranking con colores ANSI
  - Barras de progreso para Fortress y Pro Lab
  - Indicadores activos/inactivos
  - Formato exacto de la imagen de referencia

### 2. **Pokemon Stats Embed** (Basado en imagen 2)
- **Función**: `createPokemonStatsEmbed(pokemonData)`
- **Características**:
  - Color morado (#8B5CF6) como el Gengar
  - Layout de dos columnas
  - Estadísticas base con barras de progreso
  - Power Items con formato detallado
  - Información completa de IVs/EVs

### 3. **Combat Interface Embed** (Basado en imagen 3)
- **Función**: `createCombatEmbed(combatData)`
- **Características**:
  - Tema amarillo dorado
  - Estadísticas de HP/MP lado a lado
  - Imagen de batalla integrada
  - Formato de pregunta de acción

### 4. **Notification Embed**
- **Función**: `createNotificationEmbed(title, message, type)`
- **Características**:
  - Colores según tipo (info, success, warning, error)
  - Texto coloreado ANSI
  - Emojis contextuales

### 5. **Statistics Embed**
- **Función**: `createStatsEmbed(statsData)`
- **Características**:
  - Barras de progreso visuales
  - Métricas de actividad
  - Formato tabular

## 🎯 Elementos de Diseño

### Colores Principales
\`\`\`javascript
COLORS = {
  PROFILE_DARK: "#2F3136",    // Perfil oscuro
  POKEMON_PURPLE: "#8B5CF6",  // Morado Pokémon
  COMBAT_YELLOW: "#FFD700",   // Amarillo combate
  ACCENT_GREEN: "#10B981",    // Verde acentos
  ACCENT_BLUE: "#3B82F6"      // Azul elementos
}
\`\`\`

### Barras de Progreso
- Función: `createProgressBar(current, max, length, filled, empty)`
- Caracteres: `█` para lleno, `░` para vacío
- Longitud personalizable
- Cálculo automático de porcentaje

### Texto Coloreado ANSI
- Amarillo: `\u001b[33m`
- Verde: `\u001b[32m`
- Azul: `\u001b[34m`
- Rojo: `\u001b[31m`
- Reset: `\u001b[0m`

## 📋 Estructura de Datos

### UserData
\`\`\`javascript
{
  username, avatar, title, team, description,
  rank, level, points, location, respect,
  owns: { mobile, desktop, other },
  nextRank, lastUpdate,
  fortress: [{ name, current, percentage }],
  proLab: [{ name, current, percentage, active }]
}
\`\`\`

### PokemonData
\`\`\`javascript
{
  name, id, level, description, type, ability, nature,
  rarity, shiny, dateCaught, sprite,
  stats: { hp, attack, defense, specialAttack, specialDefense, speed },
  ivs: { ... }, evs: { ... },
  totalPower, currentExp, nextLevelExp,
  powerItems: [{ name, level, stats: [{ type, name, value }] }]
}
\`\`\`

### CombatData
\`\`\`javascript
{
  location, playerName, description, question, battleImage,
  player: { name, hp, maxHp, mp, maxMp },
  enemy: { name, hp, maxHp, mp, maxMp }
}
\`\`\`

## 🔧 Uso Recomendado

1. **Importar las funciones**:
   \`\`\`javascript
   const { createUserProfileEmbed } = require('./embed-designs.js')
   \`\`\`

2. **Preparar los datos**:
   \`\`\`javascript
   const userData = { /* datos del usuario */ }
   \`\`\`

3. **Generar el embed**:
   \`\`\`javascript
   const embed = createUserProfileEmbed(userData)
   \`\`\`

4. **Enviar con Discord.js**:
   \`\`\`javascript
   await message.reply({ embeds: [embed] })
   \`\`\`

## 🎨 Línea Decorativa Animada

- **URL**: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/linea-imagen-animada-0429-hh8jWA1Ef2kbGmCpUxNrXWua0H6eEP.gif`
- **Uso**: Como separador visual entre secciones
- **Función**: `createDecorativeLine()`
