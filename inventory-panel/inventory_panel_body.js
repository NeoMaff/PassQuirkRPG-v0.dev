// inventory_panel_body.js - Body component for inventory panel
// Contains item listings with descriptions, stats, and values

function createInventoryBody(page = 1) {
  const inventoryItems = {
    1: [
      {
        name: "🪢 Rope",
        description:
          "A fine rope woven from horsehair and grasses, looks like it can easily hold the weight of a large man or orc.",
        value: "💰 3 Value",
        equipped: false,
      },
      {
        name: "🧪 Skill Potion",
        description: "Skill +4: Replenishes your skill score",
        value: "💰 2 Value",
        equipped: false,
      },
      {
        name: "🧪 Stamina Potion",
        description: "Stamina +4: Adds to your stamina score",
        value: "💰 3 Value",
        equipped: false,
      },
    ],
    2: [
      {
        name: "🧪 Stamina Restorer",
        description: "Stamina +12: Restores a large amount of stamina",
        value: "💰 5 Value",
        equipped: false,
      },
      {
        name: "🧪 Stamina Restorer",
        description: "Stamina +12: Restores a large amount of stamina",
        value: "💰 5 Value",
        equipped: false,
      },
      {
        name: "🛡️ Tin armour",
        description: "Armour +1: A set of quite flimsy tin armour",
        value: "💰 2 Value",
        equipped: false,
      },
    ],
    3: [
      {
        name: "🪓 Tin axe",
        description: "Weapon +1: A flimsy tin axe, used throughout the countryside for felling small trees",
        value: "🟡 Equipped 💰 5 Value",
        equipped: true,
      },
      {
        name: "🔮 Crystal ball",
        description:
          "A fortune tellers crystal ball, old battered and used. Made of glass of course, not real crystal, and probably worthless.",
        value: "💰 1 Value",
        equipped: false,
      },
    ],
  }

  const items = inventoryItems[page] || []

  return items.map((item) => ({
    name: item.name,
    value: `${item.description}\n${item.value}`,
    inline: true,
  }))
}

module.exports = { createInventoryBody }
