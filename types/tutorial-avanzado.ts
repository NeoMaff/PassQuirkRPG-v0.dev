export interface SeccionTutorialAvanzada {
  id: string
  titulo: string
  descripcion: string
  emoji: string
  contenido: string[]
  imagen?: string
  video?: string
  tipo: "introduccion" | "creacion_personaje" | "combate" | "exploracion" | "final"
  completada: boolean
  requerimientos?: string[]
}

export interface EstadoTutorialAvanzado {
  seccionActual: number
  seccionesCompletadas: string[]
  personajeCreado: boolean
  combateCompletado: boolean
  tutorialIniciado: boolean
  fechaInicio: string
}

export interface PersonajeCompleto {
  id: string
  nombre: string
  clase: string
  reino: string
  genero: string
  historia: string
  quirk: string
  nivel: number
  experiencia: number
  estadisticas: {
    vida: number
    vidaMaxima: number
    mana: number
    manaMaximo: number
    fuerza: number
    agilidad: number
    inteligencia: number
    defensa: number
  }
  inventario: ObjetoInventario[]
}

export interface ObjetoInventario {
  id: string
  nombre: string
  tipo: string
  descripcion: string
  cantidad: number
}

export interface EstadoCombateTutorial {
  jugador: {
    nombre: string
    hp: number
    hpMax: number
    energia: number
    energiaMax: number
  }
  enemigo: {
    nombre: string
    hp: number
    hpMax: number
    nivel: number
    imagen: string
  }
  turno: "jugador" | "enemigo"
  accionesDisponibles: string[]
  mensajeCombate: string
  combateTerminado: boolean
  victoria: boolean
}
