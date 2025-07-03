import type { PerfilJugador } from "../types/discord-embed"

export const perfilMock: PerfilJugador = {
  nombre: "Odino's Private Island",
  stats: 1,
  monedas: "848.9K",
  esmeraldas: 0,
  clase: "Tank",
  tier: "T3",
  arco: "🏹💀",
  fechaCreacion: "Feb 05 2021",
  gremio: "Worthy [✓]",
  armadura: "Tarantula",
  espada: "Leaping Sword",
  minions: [
    { nombre: "Minion [Tier 5]", tier: 5, gananciasPorSegundo: "3/s", icono: "⚪" },
    { nombre: "Minion [Tier 5]", tier: 5, gananciasPorSegundo: "5/s", icono: "⚪" },
    { nombre: "Minion [Tier 4]", tier: 4, gananciasPorSegundo: "6.5/s", icono: "🔷" },
    { nombre: "Minion [Tier 3]", tier: 3, gananciasPorSegundo: "9/s", icono: "🔶" },
  ],
  usuarioId: "5885",
  servidor: "Private Island",
  timestamp: "Today at 11:52 AM",
}
