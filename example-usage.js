const { Client, GatewayIntentBits } = require("discord.js")
const { BotPanelManager } = require("./bot-panel-manager")

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

const panelManager = new BotPanelManager()

// Example usage of the panels
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand() && !interaction.isButton()) return

  try {
    if (interaction.isCommand()) {
      const { commandName } = interaction

      switch (commandName) {
        case "inventory":
          const playerData = {
            name: interaction.user.username,
            avatar: interaction.user.displayAvatarURL(),
            level: 5,
            currentHp: 45,
            maxHp: 50,
            currentMp: 30,
            maxMp: 35,
            gold: 150,
            medals: 3,
          }
          await panelManager.showInventory(interaction, playerData)
          break

        case "battle":
          const battlePlayerData = {
            name: interaction.user.username,
            level: 1,
            currentHp: 13,
            maxHp: 24,
            currentMp: 7,
            maxMp: 11,
          }
          const enemyData = {
            name: "Monster4",
            currentHp: 25,
            maxHp: 25,
            currentMp: 25,
            maxMp: 25,
          }
          const locationData = {
            name: "Forbidden Tomb of the White Baron",
            battleImage: "https://cdn.discordapp.com/attachments/placeholder/battle.png",
          }
          await panelManager.showBattle(interaction, battlePlayerData, enemyData, locationData)
          break

        case "tournament":
          const tournamentData = {
            playerName: interaction.user.username,
            playerMedals: 6,
          }
          await panelManager.showTournamentRanking(interaction, tournamentData)
          break

        case "dungeon":
          const dungeonPlayerData = {
            name: interaction.user.username,
            level: 1,
            currentHp: 13,
            maxHp: 24,
            currentMp: 7,
            maxMp: 11,
            gold: 2397,
            medals: 528,
          }
          const dungeonData = {
            name: "Forbidden Tomb of the White Baron",
            roomImage: "https://cdn.discordapp.com/attachments/placeholder/dungeon.png",
          }
          await panelManager.showDungeonNavigation(interaction, dungeonPlayerData, dungeonData)
          break

        case "create-character":
          const newPlayerData = {
            name: interaction.user.username,
            characterAvatar: "https://cdn.discordapp.com/attachments/placeholder/character.png",
          }
          await panelManager.showCharacterCreation(interaction, newPlayerData)
          break
      }
    }

    if (interaction.isButton()) {
      await panelManager.handleButtonInteraction(interaction)
    }
  } catch (error) {
    console.error("Error handling interaction:", error)
    if (!interaction.replied) {
      await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true })
    }
  }
})

client.login("YOUR_BOT_TOKEN")

module.exports = { client, panelManager }
