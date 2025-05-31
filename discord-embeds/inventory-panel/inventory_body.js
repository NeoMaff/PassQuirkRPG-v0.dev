/**
 * Inventory Panel Body Component
 * Handles item listings, descriptions, stats, and values
 * Contains the main content of the inventory display
 */

class InventoryBodyComponent {
  constructor() {
    // Define inventory items for each page
    this.inventoryItems = {
      1: [
        {
          name: "🪢 Rope",
          description:
            "A fine rope woven from horsehair and grasses, looks like it can easily hold the weight of a large man or orc.",
          value: "💰 3 Value",
          equipped: false,
          rarity: "common",
        },
        {
          name: "🧪 Skill Potion",
          description: "Skill +4: Replenishes your skill score",
          value: "💰 2 Value",
          equipped: false,
          rarity: "common",
        },
        {
          name: "🧪 Stamina Potion",
          description: "Stamina +4: Adds to your stamina score",
          value: "💰 3 Value",
          equipped: false,
          rarity: "common",
        },
      ],
      2: [
        {
          name: "🧪 Stamina Restorer",
          description: "Stamina +12: Restores a large amount of stamina",
          value: "💰 5 Value",
          equipped: false,
          rarity: "uncommon",
        },
        {
          name: "🧪 Stamina Restorer",
          description: "Stamina +12: Restores a large amount of stamina",
          value: "💰 5 Value",
          equipped: false,
          rarity: "uncommon",
        },
        {
          name: "🛡️ Tin armour",
          description: "Armour +1: A set of quite flimsy tin armour",
          value: "💰 2 Value",
          equipped: false,
          rarity: "common",
        },
      ],
      3: [
        {
          name: "🪓 Tin axe",
          description: "Weapon +1: A flimsy tin axe, used throughout the countryside for felling small trees",
          value: "🟡 Equipped 💰 5 Value",
          equipped: true,
          rarity: "common",
        },
        {
          name: "🔮 Crystal ball",
          description:
            "A fortune tellers crystal ball, old battered and used. Made of glass of course, not real crystal, and probably worthless.",
          value: "💰 1 Value",
          equipped: false,
          rarity: "poor",
        },
      ],
    }
  }

  /**
   * Creates the body fields for the inventory embed
   * @param {number} page - Current page number
   * @returns {Array} Array of field objects for the embed
   */
  createBodyFields(page = 1) {
    const items = this.inventoryItems[page] || []

    return items.map((item) => ({
      name: this.formatItemName(item),
      value: this.formatItemValue(item),
      inline: true,
    }))
  }

  /**
   * Formats the item name with rarity indicators
   * @param {Object} item - Item object
   * @returns {string} Formatted item name
   */
  formatItemName(item) {
    let name = item.name

    // Add rarity indicator
    const rarityEmojis = {
      poor: "⚪",
      common: "🟢",
      uncommon: "🔵",
      rare: "🟣",
      epic: "🟡",
      legendary: "🔴",
    }

    const rarityEmoji = rarityEmojis[item.rarity] || ""
    if (rarityEmoji) {
      name = `${rarityEmoji} ${name}`
    }

    return name
  }

  /**
   * Formats the item value and description
   * @param {Object} item - Item object
   * @returns {string} Formatted item description and value
   */
  formatItemValue(item) {
    let value = `${item.description}\n${item.value}`

    // Add equipped status
    if (item.equipped) {
      value = `${item.description}\n🟡 **EQUIPPED** ${item.value}`
    }

    return value
  }

  /**
   * Gets items for a specific page
   * @param {number} page - Page number
   * @returns {Array} Array of items for the page
   */
  getItemsForPage(page) {
    return this.inventoryItems[page] || []
  }

  /**
   * Gets total number of pages
   * @returns {number} Total pages available
   */
  getTotalPages() {
    return Object.keys(this.inventoryItems).length
  }

  /**
   * Checks if a page exists
   * @param {number} page - Page number to check
   * @returns {boolean} True if page exists
   */
  isValidPage(page) {
    return page >= 1 && page <= this.getTotalPages()
  }

  /**
   * Gets inventory statistics
   * @returns {Object} Inventory stats
   */
  getInventoryStats() {
    let totalItems = 0
    let equippedItems = 0
    let totalValue = 0

    Object.values(this.inventoryItems).forEach((pageItems) => {
      pageItems.forEach((item) => {
        totalItems++
        if (item.equipped) equippedItems++

        // Extract numeric value from item.value string
        const valueMatch = item.value.match(/(\d+) Value/)
        if (valueMatch) {
          totalValue += Number.parseInt(valueMatch[1])
        }
      })
    })

    return {
      totalItems,
      equippedItems,
      totalValue,
      pages: this.getTotalPages(),
    }
  }
}

module.exports = { InventoryBodyComponent }
