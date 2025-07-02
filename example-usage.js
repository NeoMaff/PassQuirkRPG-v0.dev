/**
 * EJEMPLOS DE USO DE LOS DISEÑOS DE EMBED
 * Estos son ejemplos de cómo usar las funciones de diseño
 */

const {
  createUserProfileEmbed,
  createPokemonStatsEmbed,
  createCombatEmbed,
  createNotificationEmbed,
  createStatsEmbed,
  createDecorativeLine,
} = require("./embed-designs.js")

/**
 * EJEMPLO 1: Datos para perfil de usuario (imagen 1)
 */
const exampleUserData = {
  username: "0xc45",
  avatar: "https://example.com/avatar.png",
  title: "Elite Hacker",
  team: "CommandlineKings",
  description: "0xc45 often dreams about achieving the rank of Guru, but so far the goal has proved elusive.",
  rank: 725,
  level: 30,
  points: 163,
  location: "Netherlands",
  respect: 47,
  owns: { mobile: 92, desktop: 91, other: 22 },
  nextRank: "Guru",
  lastUpdate: "4 minutes ago",
  fortress: [
    { name: "Jet", current: 0, percentage: 0 },
    { name: "Akerva", current: 38, percentage: 38 },
    { name: "Context", current: 0, percentage: 0 },
  ],
  proLab: [
    { name: "RastaLabs", current: 0, percentage: 0, active: false },
    { name: "Offshore", current: 100, percentage: 100, active: true },
    { name: "Cybernetics", current: 0, percentage: 0, active: false },
    { name: "Dante", current: 0, percentage: 0, active: true },
  ],
}

/**
 * EJEMPLO 2: Datos para Pokémon (imagen 2)
 */
const examplePokemonData = {
  name: "Gengar",
  id: 94,
  level: 94,
  description: "Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright.",
  type: "👻 Ghost",
  ability: "#130 Cursed Body",
  nature: "Bashful (No stat change)",
  rarity: "Epic",
  shiny: false,
  dateCaught: "6/1/2023",
  sprite: "https://example.com/gengar.png",
  stats: {
    hp: 269,
    attack: 248,
    defense: 270,
    specialAttack: 392,
    specialDefense: 236,
    speed: 428,
  },
  ivs: {
    hp: 20,
    attack: 11,
    defense: 16,
    specialAttack: 51,
    specialDefense: 14,
    speed: 26,
  },
  evs: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  totalPower: 1935,
  currentExp: 75,
  nextLevelExp: 100,
  powerItems: [
    {
      name: "Power Weight",
      level: 8,
      stats: [
        { type: "PRI", name: "Base HP", value: 12 },
        { type: "SEC", name: "Flat Spe", value: 74 },
        { type: "Sub", name: "Flat SpD", value: 7 },
      ],
    },
    {
      name: "Power Bracer",
      level: 8,
      stats: [
        { type: "PRI", name: "Base Atk", value: 13 },
        { type: "SEC", name: "Flat SpA", value: 70 },
        { type: "Sub", name: "Flat SpD", value: 6 },
      ],
    },
  ],
}

/**
 * EJEMPLO 3: Datos para combate (imagen 3)
 */
const exampleCombatData = {
  location: "Forbidden Tomb of the White Baron",
  playerName: "Yeonbi",
  description: "in front of you stands a Monster4!",
  question: "Will you fight the Monster4 or ran away like a coward?",
  battleImage: "https://example.com/battle-scene.png",
  player: {
    name: "Yeonbi",
    hp: 13,
    maxHp: 24,
    mp: 7,
    maxMp: 11,
  },
  enemy: {
    name: "Monster4",
    hp: 25,
    maxHp: 25,
    mp: 25,
    maxMp: 25,
  },
}

/**
 * EJEMPLO 4: Datos para estadísticas
 */
const exampleStatsData = {
  stats: [
    { name: "Active Users", current: 150, max: 200 },
    { name: "Messages Today", current: 1250, max: 2000 },
    { name: "Server Load", current: 65, max: 100 },
  ],
}

/**
 * FUNCIONES PARA GENERAR LOS EMBEDS
 */
function generateExampleEmbeds() {
  return {
    userProfile: createUserProfileEmbed(exampleUserData),
    pokemonStats: createPokemonStatsEmbed(examplePokemonData),
    combat: createCombatEmbed(exampleCombatData),
    notification: createNotificationEmbed("Test Notification", "This is a test message", "info"),
    stats: createStatsEmbed(exampleStatsData),
    decorativeLine: createDecorativeLine(),
  }
}

module.exports = {
  exampleUserData,
  examplePokemonData,
  exampleCombatData,
  exampleStatsData,
  generateExampleEmbeds,
}
