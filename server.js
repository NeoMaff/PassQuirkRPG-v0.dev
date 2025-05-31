/**
 * Express server for web preview of Discord embeds
 * Serves static files and provides API endpoints for embed data
 */

const express = require("express")
const cors = require("cors")
const path = require("path")

// Import Discord embed managers
const { InventoryEmbedManager } = require("./discord-embeds/inventory-panel/inventory_manager")
const { BattleEmbedManager } = require("./discord-embeds/battle-panel/battle_manager")
const { TournamentEmbedManager } = require("./discord-embeds/tournament-panel/tournament_manager")
const { DungeonEmbedManager } = require("./discord-embeds/dungeon-panel/dungeon_manager")
const {
  CharacterCreationEmbedManager,
} = require("./discord-embeds/character-creation-panel/character_creation_manager")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static("web-preview"))
app.use("/assets", express.static("assets"))

// Initialize embed managers
const inventoryManager = new InventoryEmbedManager()
const battleManager = new BattleEmbedManager()
const tournamentManager = new TournamentEmbedManager()
const dungeonManager = new DungeonEmbedManager()
const characterManager = new CharacterCreationEmbedManager()

// Sample data for previews
const samplePlayerData = {
  name: "Yeonbi",
  level: 1,
  currentHp: 13,
  maxHp: 24,
  currentMp: 7,
  maxMp: 11,
  gold: 2397,
  medals: 528,
  avatar: "/assets/avatars/player-avatar.png",
  characterAvatar: "/assets/avatars/character-avatar.png",
}

const sampleEnemyData = {
  name: "Monster4",
  currentHp: 25,
  maxHp: 25,
  currentMp: 25,
  maxMp: 25,
}

const sampleLocationData = {
  name: "Forbidden Tomb of the White Baron",
  battleImage: "/assets/images/battle-scene.png",
  roomImage: "/assets/images/dungeon-room.png",
}

// API Routes for embed data
app.get("/api/embeds/inventory/:page?", (req, res) => {
  const page = Number.parseInt(req.params.page) || 1
  const embedData = inventoryManager.createInventoryEmbed(samplePlayerData, page)
  res.json(embedData)
})

app.get("/api/embeds/battle", (req, res) => {
  const embedData = battleManager.createBattleEmbed(samplePlayerData, sampleEnemyData, sampleLocationData)
  res.json(embedData)
})

app.get("/api/embeds/tournament", (req, res) => {
  const embedData = tournamentManager.createTournamentEmbed(samplePlayerData)
  res.json(embedData)
})

app.get("/api/embeds/dungeon", (req, res) => {
  const embedData = dungeonManager.createDungeonEmbed(samplePlayerData, sampleLocationData)
  res.json(embedData)
})

app.get("/api/embeds/character-creation", (req, res) => {
  const embedData = characterManager.createCharacterCreationEmbed(samplePlayerData)
  res.json(embedData)
})

// Serve main preview page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "web-preview", "index.html"))
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PassQuirkRPG Embed Preview Server running on http://localhost:${PORT}`)
  console.log(`📱 Open your browser to preview Discord embeds`)
  console.log(`🔧 API endpoints available at /api/embeds/*`)
})

module.exports = app
