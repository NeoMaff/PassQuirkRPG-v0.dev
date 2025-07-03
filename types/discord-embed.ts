export interface PerfilJugador {
  nombre: string
  stats: number
  monedas: string
  esmeraldas: number
  clase: string
  tier: string
  arco: string
  fechaCreacion: string
  gremio: string
  armadura: string
  espada: string
  minions: Minion[]
  usuarioId: string
  servidor: string
  timestamp: string
}

export interface Minion {
  nombre: string
  tier: number
  gananciasPorSegundo: string
  icono: string
}
