/**
 * Inventory Panel Manager
 * Main coordinator that combines header, body, and footer components
 * Provides the primary interface for creating inventory embeds
 */

const { EmbedBuilder } = require("discord.js")
const { InventoryHeaderComponent } = require("./inventory_header")
const { InventoryBodyComponent } = require("./inventory_body")
const { InventoryFooterComponent } = require("./inventory_footer")

class InventoryEmbedManager {
  constructor() {
    this.headerComponent = new InventoryHeaderComponent()
    this.bodyComponent = new InventoryBodyComponent()
    this.footerComponent = new InventoryFooterComponent()
  }

  /**
   * Creates a complete inventory embed with all components
   * @param {Object} playerData - Player information
   * @param {number} page - Current page number (default: 1)
   * @param {boolean} compact - Use compact layout for mobile (default: false)
   * @returns {Object} Complete embed object with components
   */
  createInventoryEmbed(playerData, page = 1, compact = false) {
    try {
      // Validate inputs
      if (!this.headerComponent.validatePlayerData(playerData)) {
        throw new Error("Invalid player data provided")
      }

      const totalPages = this.bodyComponent.getTotalPages()

      if (!this.bodyComponent.isValidPage(page)) {
        throw new Error(`Invalid page number: ${page}. Valid range: 1-${totalPages}`)
      }

      // Get components
      const header = this.headerComponent.createHeader(playerData, page, totalPages)
      const bodyFields = this.bodyComponent.createBodyFields(page)
      const stats = this.bodyComponent.getInventoryStats()
      const footer = this.footerComponent.createFooter(page, totalPages, stats)
      const buttons = compact
        ? this.footerComponent.createCompactButtons(page, totalPages)
        : this.footerComponent.createButtons(page, totalPages)

      // Build embed
      const embed = new EmbedBuilder()
        .setTitle(header.title)
        .setColor(header.color)
        .setAuthor(header.author)
        .setThumbnail(header.thumbnail.url)
        .addFields(bodyFields)
        .setFooter(footer)
        .setTimestamp()

      return {
        embeds: [embed],
        components: buttons,
        metadata: {
          type: "inventory",
          page: page,
          totalPages: totalPages,
          playerName: playerData.name,
          stats: stats,
        },
      }
    } catch (error) {
      console.error("Error creating inventory embed:", error)
      return this.createErrorEmbed(error.message)
    }
  }

  /**
   * Creates an error embed for when something goes wrong
   * @param {string} errorMessage - Error description
   * @returns {Object} Error embed object
   */
  createErrorEmbed(errorMessage) {
    const embed = new EmbedBuilder()
      .setTitle("❌ Inventory Error")
      .setColor(0xed4245)
      .setDescription(`Unable to load inventory: ${errorMessage}`)
      .setFooter(this.footerComponent.createErrorFooter(errorMessage))
      .setTimestamp()

    return {
      embeds: [embed],
      components: [],
      metadata: {
        type: "error",
        error: errorMessage,
      },
    }
  }

  /**
   * Handles button interactions for inventory
   * @param {string} customId - Button custom ID
   * @param {Object} currentState - Current embed state
   * @returns {Object} Updated embed or interaction result
   */
  async handleButtonInteraction(customId, currentState) {
    const { page, totalPages, playerData } = currentState

    const result = this.footerComponent.handleButtonInteraction(customId, page, totalPages)

    if (result.shouldUpdate && result.action !== "close") {
      // Create new embed with updated page
      return this.createInventoryEmbed(playerData, result.newPage)
    }

    return {
      action: result.action,
      message: result.message,
      ephemeral: true,
    }
  }

  /**
   * Gets inventory data for web preview
   * @param {Object} playerData - Player information
   * @param {number} page - Page number
   * @returns {Object} Formatted data for web preview
   */
  getPreviewData(playerData, page = 1) {
    const embedData = this.createInventoryEmbed(playerData, page)

    return {
      embed: this.convertEmbedForPreview(embedData.embeds[0]),
      buttons: this.convertButtonsForPreview(embedData.components),
      metadata: embedData.metadata,
    }
  }

  /**
   * Converts Discord embed to web preview format
   * @param {EmbedBuilder} embed - Discord embed
   * @returns {Object} Web-compatible embed data
   */
  convertEmbedForPreview(embed) {
    const embedData = embed.toJSON()

    return {
      title: embedData.title,
      description: embedData.description,
      color: embedData.color,
      author: embedData.author,
      thumbnail: embedData.thumbnail,
      fields: embedData.fields,
      footer: embedData.footer,
      timestamp: embedData.timestamp,
    }
  }

  /**
   * Converts Discord buttons to web preview format
   * @param {Array} components - Discord button components
   * @returns {Array} Web-compatible button data
   */
  convertButtonsForPreview(components) {
    return components.map((row) =>
      row.components.map((button) => ({
        customId: button.data.custom_id,
        label: button.data.label,
        style: this.getButtonStyleName(button.data.style),
        disabled: button.data.disabled || false,
      })),
    )
  }

  /**
   * Gets button style name from Discord style number
   * @param {number} style - Discord button style number
   * @returns {string} Style name
   */
  getButtonStyleName(style) {
    const styles = {
      1: "primary",
      2: "secondary",
      3: "success",
      4: "danger",
    }
    return styles[style] || "secondary"
  }

  /**
   * Gets sample data for testing
   * @returns {Object} Sample player data
   */
  getSampleData() {
    return {
      name: "TestPlayer",
      avatar: "/assets/avatars/default-avatar.png",
      characterAvatar: "/assets/avatars/character-avatar.png",
    }
  }
}

module.exports = { InventoryEmbedManager }
