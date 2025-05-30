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

  // Inventory Panel
  async showInventory(interaction, playerData, page = 1) {
    const embedData = createInventoryEmbed(playerData, page)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "inventory")
  }

  // Character Creation Panel
  async showCharacterCreation(interaction, playerData) {
    const embedData = createCharacterCreationEmbed(playerData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "character_creation")
  }

  // Battle Panel
  async showBattle(interaction, playerData, enemyData, locationData) {
    const embedData = createBattleEmbed(playerData, enemyData, locationData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "battle")
  }

  // Tournament Ranking Panel
  async showTournamentRanking(interaction, tournamentData) {
    const embedData = createTournamentRankingEmbed(tournamentData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "tournament")
  }

  // Dungeon Navigation Panel
  async showDungeonNavigation(interaction, playerData, dungeonData) {
    const embedData = createDungeonNavigationEmbed(playerData, dungeonData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "dungeon")
  }

  // Gear Equipped Panel
  async showGearEquipped(interaction, playerData, equippedItem) {
    const embedData = createGearEquippedEmbed(playerData, equippedItem)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "gear_equipped")
  }

  // Filtered Targets Panel
  async showFilteredTargets(interaction, playerData, completedTargets) {
    const embedData = createFilteredTargetsEmbed(playerData, completedTargets)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "filtered_targets")
  }

  // PvP Encounter Panel
  async showPvPEncounter(interaction, playerData, opponentData) {
    const embedData = createPvPEncounterEmbed(playerData, opponentData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, "pvp_encounter")
  }

  // Handle button interactions
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
    // Handle inventory pagination and actions
    if (customId.includes("next") || customId.includes("prev")) {
      const page = Number.parseInt(customId.split("_")[2]) || 1
      const newPage = customId.includes("next") ? page + 1 : page - 1
      // Reload inventory with new page
      // Implementation depends on your database structure
    }
  }

  async handleBattleButtons(interaction, customId) {
    const action = customId.split("_")[1]
    // Handle battle actions: shoot, bane, heal, potion, defend, escape
    await interaction.reply({ content: `You chose to ${action}!`, ephemeral: true })
  }

  async handleDungeonButtons(interaction, customId) {
    const direction = customId.split("_")[1]
    // Handle dungeon navigation: left, straight, right, potion, abandon
    await interaction.reply({ content: `You went ${direction}!`, ephemeral: true })
  }

  async handlePvPButtons(interaction, customId) {
    const action = customId.split("_")[1]
    // Handle PvP actions: shoot, bane, heal, defend, surrender
    await interaction.reply({ content: `You used ${action} in PvP!`, ephemeral: true })
  }

  async handleGenericButtons(interaction, customId) {
    // Handle other button interactions
    switch (customId) {
      case "start_quest":
        await interaction.reply({ content: "Starting your quest...", ephemeral: true })
        break
      case "view_character":
        await interaction.reply({ content: "Showing character profile...", ephemeral: true })
        break
      case "join_tournament":
        await interaction.reply({ content: "Joining tournament...", ephemeral: true })
        break
      default:
        await interaction.reply({ content: "Button action not implemented yet.", ephemeral: true })
        break
    }
  }

  // Clean up inactive embeds
  cleanupInactiveEmbeds() {
    // Remove embeds older than 15 minutes
    // Implementation depends on your needs
  }
}

module.exports = { BotPanelManager }
