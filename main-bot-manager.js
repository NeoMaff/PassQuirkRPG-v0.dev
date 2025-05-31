// main-bot-manager.js - Central manager for all PassQuirkRPG bot panels

const { createInventoryEmbed } = require("./inventory-panel/inventory_panel_manager")
const { createBattleEmbed } = require("./battle-panel/battle_panel_manager")
const { createTournamentEmbed } = require("./tournament-panel/tournament_panel_manager")
const { createDungeonEmbed } = require("./dungeon-panel/dungeon_panel_manager")
const { createCharacterCreationEmbed } = require("./character-creation-panel/character_creation_manager")

class PassQuirkRPGBotManager {
  constructor() {
    this.activeEmbeds = new Map()
    this.playerSessions = new Map()
  }

  // Inventory System
  async showInventory(interaction, playerData, page = 1) {
    const embedData = createInventoryEmbed(playerData, page)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, { type: "inventory", page })
  }

  // Battle System
  async startBattle(interaction, playerData, enemyData, locationData) {
    const embedData = createBattleEmbed(playerData, enemyData, locationData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, { type: "battle", data: { playerData, enemyData, locationData } })
  }

  // Tournament System
  async showTournament(interaction, playerData) {
    const embedData = createTournamentEmbed(playerData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, { type: "tournament" })
  }

  // Dungeon System
  async enterDungeon(interaction, playerData, dungeonData) {
    const embedData = createDungeonEmbed(playerData, dungeonData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, { type: "dungeon", data: { playerData, dungeonData } })
  }

  // Character Creation
  async createCharacter(interaction, playerData) {
    const embedData = createCharacterCreationEmbed(playerData)
    await interaction.reply(embedData)
    this.activeEmbeds.set(interaction.user.id, { type: "character_creation" })
  }

  // Button Interaction Handler
  async handleButtonInteraction(interaction) {
    const customId = interaction.customId
    const userId = interaction.user.id
    const activeEmbed = this.activeEmbeds.get(userId)

    if (!activeEmbed) {
      return await interaction.reply({ content: "No active session found.", ephemeral: true })
    }

    try {
      switch (activeEmbed.type) {
        case "inventory":
          await this.handleInventoryButtons(interaction, customId, activeEmbed)
          break
        case "battle":
          await this.handleBattleButtons(interaction, customId, activeEmbed)
          break
        case "tournament":
          await this.handleTournamentButtons(interaction, customId)
          break
        case "dungeon":
          await this.handleDungeonButtons(interaction, customId, activeEmbed)
          break
        case "character_creation":
          await this.handleCharacterCreationButtons(interaction, customId)
          break
        default:
          await interaction.reply({ content: "Unknown interaction type.", ephemeral: true })
      }
    } catch (error) {
      console.error("Button interaction error:", error)
      await interaction.reply({ content: "An error occurred processing your action.", ephemeral: true })
    }
  }

  async handleInventoryButtons(interaction, customId, activeEmbed) {
    if (customId.startsWith("inventory_next") || customId.startsWith("inventory_prev")) {
      const currentPage = activeEmbed.page || 1
      const newPage = customId.includes("next") ? currentPage + 1 : currentPage - 1
      // Update inventory page logic here
      await interaction.reply({ content: `Showing page ${newPage}`, ephemeral: true })
    } else if (customId === "inventory_use") {
      await interaction.reply({ content: "Item usage system coming soon!", ephemeral: true })
    } else if (customId === "inventory_close") {
      this.activeEmbeds.delete(interaction.user.id)
      await interaction.update({ content: "Inventory closed.", embeds: [], components: [] })
    }
  }

  async handleBattleButtons(interaction, customId, activeEmbed) {
    const actions = {
      battle_shoot: "🏹 You shot an arrow!",
      battle_bane: "💀 You cast a bane spell!",
      battle_heal: "💚 You healed yourself!",
      battle_potion: "🧪 You used a potion!",
      battle_defend: "🛡️ You defended!",
      battle_escape: "🏃 You escaped from battle!",
    }

    const message = actions[customId] || "Unknown action!"
    await interaction.reply({ content: message, ephemeral: true })

    if (customId === "battle_escape") {
      this.activeEmbeds.delete(interaction.user.id)
    }
  }

  async handleTournamentButtons(interaction, customId) {
    const actions = {
      tournament_join: "You joined the tournament!",
      tournament_my_rank: "Showing your current ranking...",
      tournament_rules: "Displaying tournament rules...",
      tournament_history: "Showing tournament history...",
    }

    const message = actions[customId] || "Unknown tournament action!"
    await interaction.reply({ content: message, ephemeral: true })
  }

  async handleDungeonButtons(interaction, customId, activeEmbed) {
    const directions = {
      dungeon_left: "⬅️ You went left!",
      dungeon_straight: "⬆️ You went straight!",
      dungeon_right: "➡️ You went right!",
    }

    const actions = {
      dungeon_potion: "🧪 You used a potion!",
      dungeon_search: "🔍 You searched the room!",
      dungeon_rest: "😴 You rested and recovered!",
      dungeon_abandon: "🚪 You abandoned the dungeon!",
    }

    const message = directions[customId] || actions[customId] || "Unknown dungeon action!"
    await interaction.reply({ content: message, ephemeral: true })

    if (customId === "dungeon_abandon") {
      this.activeEmbeds.delete(interaction.user.id)
    }
  }

  async handleCharacterCreationButtons(interaction, customId) {
    const actions = {
      start_quest: "Starting your first quest...",
      view_character: "Showing character profile...",
      tutorial: "Opening tutorial...",
      character_customize: "Opening customization menu...",
    }

    const message = actions[customId] || "Unknown character action!"
    await interaction.reply({ content: message, ephemeral: true })
  }

  // Utility Methods
  getPlayerSession(userId) {
    return this.playerSessions.get(userId)
  }

  setPlayerSession(userId, sessionData) {
    this.playerSessions.set(userId, sessionData)
  }

  clearPlayerSession(userId) {
    this.playerSessions.delete(userId)
    this.activeEmbeds.delete(userId)
  }

  // Cleanup inactive sessions (call periodically)
  cleanupInactiveSessions() {
    const now = Date.now()
    const timeout = 15 * 60 * 1000 // 15 minutes

    for (const [userId, session] of this.playerSessions.entries()) {
      if (now - session.lastActivity > timeout) {
        this.clearPlayerSession(userId)
      }
    }
  }
}

module.exports = { PassQuirkRPGBotManager }
