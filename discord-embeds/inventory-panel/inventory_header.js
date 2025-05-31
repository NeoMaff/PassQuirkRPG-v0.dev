/**
 * Inventory Panel Header Component
 * Handles title, author information, and thumbnail display
 * Based on reference: "Diseño para la tienda y diálogos con los NPC"
 */

class InventoryHeaderComponent {
  /**
   * Creates the header configuration for inventory embed
   * @param {Object} playerData - Player information
   * @param {number} page - Current page number
   * @param {number} totalPages - Total number of pages
   * @returns {Object} Header configuration object
   */
  createHeader(playerData, page = 1, totalPages = 3) {
    return {
      title: `📦 Inventory (page ${page} of ${totalPages})`,
      color: 0x2f3136, // Dark Discord theme color
      author: {
        name: `${playerData.name}'s Inventory`,
        iconURL: playerData.avatar || "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      thumbnail: {
        url: playerData.characterAvatar || playerData.avatar || "https://cdn.discordapp.com/embed/avatars/0.png",
      },
    }
  }

  /**
   * Validates player data for header creation
   * @param {Object} playerData - Player data to validate
   * @returns {boolean} True if valid, false otherwise
   */
  validatePlayerData(playerData) {
    return playerData && typeof playerData.name === "string" && playerData.name.length > 0
  }

  /**
   * Gets default header for error cases
   * @returns {Object} Default header configuration
   */
  getDefaultHeader() {
    return {
      title: "📦 Inventory",
      color: 0x2f3136,
      author: {
        name: "Unknown Player's Inventory",
        iconURL: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      thumbnail: {
        url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
    }
  }
}

module.exports = { InventoryHeaderComponent }
