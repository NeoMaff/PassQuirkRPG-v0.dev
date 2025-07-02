/**
 * ARCHIVO DE PRUEBAS PARA EMBEDS
 * Ejecutar con: node test/embed-tests.js
 */

const { EmbedBuilder } = require("discord.js")

// Importar clases del bot principal
// const { YellowThemeEmbedBuilder, COLORED_TEXT } = require('../bot.js');

/**
 * Pruebas de colores ANSI
 */
function testColoredText() {
  console.log("🧪 Probando texto coloreado...")

  const COLORED_TEXT = {
    YELLOW: (text) => `\`\`\`ansi\n\u001b[33m${text}\u001b[0m\n\`\`\``,
    GREEN: (text) => `\`\`\`ansi\n\u001b[32m${text}\u001b[0m\n\`\`\``,
    BLUE: (text) => `\`\`\`ansi\n\u001b[34m${text}\u001b[0m\n\`\`\``,
  }

  console.log("Amarillo:", COLORED_TEXT.YELLOW("Texto en amarillo"))
  console.log("Verde:", COLORED_TEXT.GREEN("Texto en verde"))
  console.log("Azul:", COLORED_TEXT.BLUE("Texto en azul"))

  console.log("✅ Pruebas de color completadas")
}

/**
 * Prueba de estructura de embed
 */
function testEmbedStructure() {
  console.log("🧪 Probando estructura de embed...")

  const testEmbed = new EmbedBuilder()
    .setColor("#FFD700")
    .setTitle("🌟 Embed de Prueba 🌟")
    .setDescription("```ansi\n\u001b[33mEste es un embed de prueba con tema amarillo\u001b[0m\n```")
    .addFields(
      {
        name: "⚡ Campo 1",
        value: "```ansi\n\u001b[33mValor en amarillo\u001b[0m\n```",
        inline: true,
      },
      {
        name: "🏆 Campo 2",
        value: "```ansi\n\u001b[32mValor en verde\u001b[0m\n```",
        inline: true,
      },
    )
    .setFooter({ text: "✨ Prueba completada ✨" })
    .setTimestamp()

  console.log("Embed creado:", JSON.stringify(testEmbed.toJSON(), null, 2))
  console.log("✅ Estructura de embed válida")
}

/**
 * Ejecutar todas las pruebas
 */
function runAllTests() {
  console.log("🚀 Iniciando pruebas del sistema de embeds...\n")

  try {
    testColoredText()
    console.log("")
    testEmbedStructure()
    console.log("\n🎉 Todas las pruebas completadas exitosamente!")
  } catch (error) {
    console.error("❌ Error en las pruebas:", error)
  }
}

// Ejecutar pruebas si el archivo se ejecuta directamente
if (require.main === module) {
  runAllTests()
}

module.exports = {
  testColoredText,
  testEmbedStructure,
  runAllTests,
}
