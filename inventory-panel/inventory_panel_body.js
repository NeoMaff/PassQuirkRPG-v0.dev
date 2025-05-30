// inventory_panel_body.js - Componente del cuerpo para el panel de inventario
// Contiene listados de objetos con descripciones, estadísticas y valores

function createInventoryBody(page = 1) {
  const inventoryItems = {
    1: [
      {
        name: "🪢 Cuerda",
        description:
          "Una fina cuerda tejida con crin de caballo y hierbas, parece que puede soportar fácilmente el peso de un hombre grande u orco.",
        value: "💰 3 Valor",
        equipped: false,
      },
      {
        name: "🧪 Poción de Habilidad",
        description: "Habilidad +4: Repone tu puntuación de habilidad",
        value: "💰 2 Valor",
        equipped: false,
      },
      {
        name: "🧪 Poción de Resistencia",
        description: "Resistencia +4: Añade a tu puntuación de resistencia",
        value: "💰 3 Valor",
        equipped: false,
      },
    ],
    2: [
      {
        name: "🧪 Restaurador de Resistencia",
        description: "Resistencia +12: Restaura una gran cantidad de resistencia",
        value: "💰 5 Valor",
        equipped: false,
      },
      {
        name: "🧪 Restaurador de Resistencia",
        description: "Resistencia +12: Restaura una gran cantidad de resistencia",
        value: "💰 5 Valor",
        equipped: false,
      },
      {
        name: "🛡️ Armadura de estaño",
        description: "Armadura +1: Un conjunto de armadura de estaño bastante endeble",
        value: "💰 2 Valor",
        equipped: false,
      },
    ],
    3: [
      {
        name: "🪓 Hacha de estaño",
        description: "Arma +1: Un hacha de estaño endeble, utilizada en todo el campo para talar árboles pequeños",
        value: "🟡 Equipado 💰 5 Valor",
        equipped: true,
      },
      {
        name: "🔮 Bola de cristal",
        description:
          "Una bola de cristal de adivino, vieja, maltratada y usada. Hecha de vidrio, por supuesto, no de cristal real, y probablemente sin valor.",
        value: "💰 1 Valor",
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
