// character_creation_body.js - Starting equipment and character details

function createCharacterCreationBody(playerData) {
  const startingEquipment = [
    { name: "⚔️ Basic sword", description: "A simple iron sword for beginners", inline: true },
    { name: "❤️ x5 Health potions", description: "Restores 25 HP each", inline: true },
    { name: "💙 x5 Mana potions", description: "Restores 15 MP each", inline: true },
    { name: "🧹 x5 Cleanse potions", description: "Removes negative effects", inline: true },
  ]

  const characterStats = {
    name: "📊 Starting Stats",
    value: [
      `**Level:** 1`,
      `**HP:** 50/50`,
      `**MP:** 25/25`,
      `**Gold:** 100`,
      `**Class:** ${playerData.characterClass || "Adventurer"}`,
    ].join("\n"),
    inline: false,
  }

  return [...startingEquipment, characterStats]
}

function getRandomStartingClass() {
  const classes = ["Warrior", "Mage", "Rogue", "Archer", "Paladin", "Adventurer"]
  return classes[Math.floor(Math.random() * classes.length)]
}

module.exports = { createCharacterCreationBody, getRandomStartingClass }
