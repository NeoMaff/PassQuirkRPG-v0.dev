const { createInventoryEmbed } = require("./embeds/inventory-panel")
const { createCharacterCreationEmbed } = require("./embeds/character-creation-panel")
const { createBattleEmbed } = require("./embeds/battle-panel")
const { createTournamentRankingEmbed } = require("./embeds/tournament-ranking-panel")
const { createDungeonNavigationEmbed } = require("./embeds/dungeon-navigation-panel")
const { createGearEquippedEmbed } = require("./embeds/gear-equipped-panel")
const { createFilteredTargetsEmbed } = require("./embeds/filtered-targets-panel")
const { createPvPEncounterEmbed } = require("./embeds/pvp-encounter-panel")

class BotPanelManager {
  constructor() {
    this.activeEmbeds = new Map()
  }

  // Panel de Inventario
  async showInventory(interaction, playerData, page = 1) {
    const embedData = createInventoryEmbed(playerData, page)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "inventory")
  }

  // Panel de Creación de Personaje
  async showCharacterCreation(interaction, playerData) {
    const embedData = createCharacterCreationEmbed(playerData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "character_creation")
  }

  // Panel de Batalla
  async showBattle(interaction, playerData, enemyData, locationData) {
    const embedData = createBattleEmbed(playerData, enemyData, locationData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "battle")
  }

  // Panel de Clasificación de Torneo
  async showTournamentRanking(interaction, tournamentData) {
    const embedData = createTournamentRankingEmbed(tournamentData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "tournament")
  }

  // Panel de Navegación de Mazmorra
  async showDungeonNavigation(interaction, playerData, dungeonData) {
    const embedData = createDungeonNavigationEmbed(playerData, dungeonData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "dungeon")
  }

  // Panel de Equipo Equipado
  async showGearEquipped(interaction, playerData, equippedItem) {
    const embedData = createGearEquippedEmbed(playerData, equippedItem)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "gear_equipped")
  }

  // Panel de Objetivos Filtrados
  async showFilteredTargets(interaction, playerData, completedTargets) {
    const embedData = createFilteredTargetsEmbed(playerData, completedTargets)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "filtered_targets")
  }

  // Panel de Encuentro PvP
  async showPvPEncounter(interaction, playerData, opponentData) {
    const embedData = createPvPEncounterEmbed(playerData, opponentData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "pvp_encounter")
  }

  // Manejar interacciones de botones
  async handleButtonInteraction(interaction) {
    const customId = interaction.customId
    const userId = interaction.user.id
    const activeEmbed = this.activeEmbeds.get(userId)

    switch (true) {
      case customId.startsWith("inventory_"):
        await this.handleInventoryButtons(interaction, customId)
        break
      case customId.startsWith("battle_"):
        await this.handleBattleButtons(interaction, customId)
        break
      case customId.startsWith("dungeon_"):
        await this.handleDungeonButtons(interaction, customId)
        break
      case customId.startsWith("pvp_"):
        await this.handlePvPButtons(interaction, customId)
        break
      default:
        await this.handleGenericButtons(interaction, customId)
        break
    }
  }

  async handleInventoryButtons(interaction, customId) {
    // Manejar paginación de inventario y acciones
    if (customId.includes("next") || customId.includes("prev")) {
      const page = Number.parseInt(customId.split("_")[2]) || 1
      const newPage = customId.includes("next") ? page + 1 : page - 1
      // Recargar inventario con nueva página
      // La implementación depende de tu estructura de base de datos
    }
  }

  async handleBattleButtons(interaction, customId) {
    const actions = {
      battle_shoot: "🏹 ¡Disparaste una flecha!",
      battle_bane: "💀 ¡Lanzaste un hechizo de maldición!",
      battle_heal: "💚 ¡Te has curado!",
      battle_potion: "🧪 ¡Usaste una poción!",
      battle_defend: "🛡️ ¡Te defendiste!",
      battle_escape: "🏃 ¡Escapaste de la batalla!",
    }

    const message = actions[customId] || "¡Acción desconocida!"
    await interaction.reply({ content: message, ephemeral: true })

    if (customId === "battle_escape") {
      this.activeEmbeds.delete(interaction.user.id)
    }
  }

  async handleDungeonButtons(interaction, customId) {
    const direction = customId.split("_")[1]
    // Manejar navegación de mazmorra: izquierda, recto, derecha, poción, abandonar
    await interaction.reply({ content: `¡Fuiste ${direction}!`, ephemeral: true })
  }

  async handlePvPButtons(interaction, customId) {
    const action = customId.split("_")[1]
    // Manejar acciones PvP: disparar, maldición, curar, defender, rendirse
    await interaction.reply({ content: `¡Usaste ${action} en PvP!`, ephemeral: true })
  }

  async handleGenericButtons(interaction, customId) {
    // Manejar otras interacciones de botones
    switch (customId) {
      case "start_quest":
        await interaction.reply({ content: "Iniciando tu misión...", ephemeral: true })
        break
      case "view_character":
        await interaction.reply({ content: "Mostrando perfil de personaje...", ephemeral: true })
        break
      case "join_tournament":
        await interaction.reply({ content: "Uniéndose al torneo...", ephemeral: true })
        break
      default:
        await interaction.reply({ content: "Acción de botón aún no implementada.", ephemeral: true })
        break
    }
  }

  // Limpiar embeds inactivos
  cleanupInactiveEmbeds() {
    // Eliminar embeds más antiguos de 15 minutos
    // La implementación depende de tus necesidades
  }
}

module.exports = { BotPanelManager }
