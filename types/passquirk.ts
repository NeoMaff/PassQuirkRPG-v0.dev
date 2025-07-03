export interface ExploradorPassQuirk {
  id: string
  nombre: string
  clase: "Guerrero" | "Mago" | "Arquero" | "Sanador" | "Asesino" | "Tanque" | "Berserker"
  nivel: number
  quirk: string
  reino: string
  zona: string
  poderTotal: number
  avatar: string
  estadisticas: {
    vida: number
    vidaMaxima: number
    mana: number
    manaMaximo: number
    energiaQuirk: number
    fuerza: number
    agilidad: number
    inteligencia: number
    defensa: number
    resistenciaQuirk: number
    critico: number
    precision: number
  }
  quirkInfo: {
    nombre: string
    tipo: string
    nivelPoder: number
    rareza: string
    descripcion: string
    habilidades: string[]
  }
  ubicacionDimensional: {
    reino: string
    zona: string
    coordenadas: string
    portalAcceso: string
    tiempoEnReino: string
  }
  experiencia: number
  ultimaActividad: string
}

export interface EstadoNavegacion {
  puedeIrAtras: boolean
  puedeIrSiguiente: boolean
  numeroExploracion: number
  totalExploraciones: number
}

export interface SesionExploracion {
  historial: ExploradorPassQuirk[]
  indiceActual: number
  contadorExploraciones: number
}
