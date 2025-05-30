/**
 * Inventory Panel Footer Component
 * Handles pagination controls and action buttons
 * Manages footer text and button interactions
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

class InventoryFooterComponent {
  /**
   * Creates footer text for the inventory embed
   * @param {number} page - Current page number
   * @param {number} totalPages - Total number of pages
   * @param {Object} stats - Inventory statistics
   * @returns {Object} Footer configuration
   */
  createFooter(page = 1, totalPages = 3, stats = {}) {
    const footerText = [
      `Use items with /use <item> • Page ${page}/${totalPages}`,
      stats.totalItems ? `Total Items: ${stats.totalItems}` : "",
      stats.totalValue ? `Total Value: ${stats.totalValue} Gold` : "",
      "Type /help for commands",
    ]
      .filter(Boolean)
      .join(" • ")

    return {
      text: footerText,
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/rpg-icon.png",
    }
  }

  /**
   * Creates action buttons for inventory interactions
   * @param {number} page - Current page number
   * @param {number} totalPages - Total number of pages
   * @returns {Array} Array of ActionRow components
   */
  createButtons(page = 1, totalPages = 3) {
    // Navigation buttons row
    const navigationRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`inventory_prev_${page}`)
        .setLabel("◀️ Previous")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 1),
      new ButtonBuilder()
        .setCustomId(`inventory_next_${page}`)
        .setLabel("Next ▶️")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === totalPages),
      new ButtonBuilder().setCustomId("inventory_search").setLabel("🔍 Search").setStyle(ButtonStyle.Secondary),
    )

    // Action buttons row
    const actionRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("inventory_use").setLabel("🎒 Use Item").setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId("inventory_sort").setLabel("📊 Sort").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("inventory_close").setLabel("❌ Close").setStyle(ButtonStyle.Danger),
    )

    return [navigationRow, actionRow]
  }

  /**
   * Creates simplified button set for mobile/compact view
   * @param {number} page - Current page number
   * @param {number} totalPages - Total number of pages
   * @returns {Array} Array of ActionRow components
   */
  createCompactButtons(page = 1, totalPages = 3) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`inventory_prev_${page}`)
        .setLabel("◀️")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 1),
      new ButtonBuilder().setCustomId("inventory_use").setLabel("🎒 Use").setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`inventory_next_${page}`)
        .setLabel("▶️")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === totalPages),
      new ButtonBuilder().setCustomId("inventory_close").setLabel("❌").setStyle(ButtonStyle.Danger),
    )

    return [row]
  }

  /**
   * Handles button interaction logic
   * @param {string} customId - Button custom ID
   * @param {number} currentPage - Current page number
   * @param {number} totalPages - Total pages
   * @returns {Object} Interaction result
   */
  handleButtonInteraction(customId, currentPage, totalPages) {
    const result = {
      action: null,
      newPage: currentPage,
      message: null,
      shouldUpdate: false,
    }

    if (customId.startsWith("inventory_prev")) {
      result.action = "previous_page"
      result.newPage = Math.max(1, currentPage - 1)
      result.shouldUpdate = currentPage > 1
      result.message = result.shouldUpdate ? `Showing page ${result.newPage}` : "Already on first page"
    } else if (customId.startsWith("inventory_next")) {
      result.action = "next_page"
      result.newPage = Math.min(totalPages, currentPage + 1)
      result.shouldUpdate = currentPage < totalPages
      result.message = result.shouldUpdate ? `Showing page ${result.newPage}` : "Already on last page"
    } else if (customId === "inventory_use") {
      result.action = "use_item"
      result.message = "Please select an item to use or specify with `/use <item_name>`"
    } else if (customId === "inventory_search") {
      result.action = "search"
      result.message = "Use `/search <item_name>` to find specific items"
    } else if (customId === "inventory_sort") {
      result.action = "sort"
      result.message = "Inventory sorting options: name, value, rarity, type"
    } else if (customId === "inventory_close") {
      result.action = "close"
      result.message = "Inventory closed"
      result.shouldUpdate = true
    }

    return result
  }

  /**
   * Creates footer for error states
   * @param {string} error - Error message
   * @returns {Object} Error footer configuration
   */
  createErrorFooter(error) {
    return {
      text: `Error: ${error} • Type /help for assistance`,
      iconURL: "https://cdn.discordapp.com/attachments/placeholder/error-icon.png",
    }
  }

  /**
   * Validates page numbers for button creation
   * @param {number} page - Current page
   * @param {number} totalPages - Total pages
   * @returns {boolean} True if valid
   */
  validatePageNumbers(page, totalPages) {
    return Number.isInteger(page) && Number.isInteger(totalPages) && page >= 1 && totalPages >= 1 && page <= totalPages
  }
}

module.exports = { InventoryFooterComponent }
