export interface SeccionTutorial {
  id: string
  titulo: string
  descripcion: string
  emoji: string
  contenido: string[]
  completada: boolean
}

export interface EstadoTutorial {
  seccionActual: number
  seccionesCompletadas: string[]
  personajeCreado: boolean
  combateCompletado: boolean
}

export interface PersonajeTutorial {
  nombre: string
  clase: string
  reino: string
  genero: string
  historia: string
  quirk: string
}
