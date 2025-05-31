const { Client, GatewayIntentBits } = require("discord.js")
const { BotPanelManager } = require("./bot-panel-manager")

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

const panelManager = new BotPanelManager()

// Ejemplo de uso de los paneles
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand() && !interaction.isButton()) return

  try {
    if (interaction.isCommand()) {
      const { commandName } = interaction

      switch (commandName) {
        case "inventario":
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

        case "batalla":
          const battlePlayerData = {
            name: interaction.user.username,
            level: 1,
            currentHp: 13,
            maxHp: 24,
            currentMp: 7,
            maxMp: 11,
          }
          const enemyData = {
            name: "Monstruo4",
            currentHp: 25,
            maxHp: 25,
            currentMp: 25,
            maxMp: 25,
          }
          const locationData = {
            name: "Tumba Prohibida del Barón Blanco",
            battleImage: "https://cdn.discordapp.com/attachments/placeholder/battle.png",
          }
          await panelManager.showBattle(interaction, battlePlayerData, enemyData, locationData)
          break

        case "torneo":
          const tournamentData = {
            playerName: interaction.user.username,
            playerMedals: 6,
          }
          await panelManager.showTournamentRanking(interaction, tournamentData)
          break

        case "mazmorra":
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
            name: "Tumba Prohibida del Barón Blanco",
            roomImage: "https://cdn.discordapp.com/attachments/placeholder/dungeon.png",
          }
          await panelManager.showDungeonNavigation(interaction, dungeonPlayerData, dungeonData)
          break

        case "crear-personaje":
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
    console.error("Error al manejar la interacción:", error)
    if (!interaction.replied) {
      await interaction.reply({ content: "Ocurrió un error al procesar tu solicitud.", ephemeral: true })
    }
  }
})

client.login("TU_TOKEN_DE_BOT")

module.exports = { client, panelManager }
