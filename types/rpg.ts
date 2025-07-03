export interface Personaje {
  id: string
  nombre: string
  clase: "Guerrero" | "Mago" | "Arquero" | "Sanador" | "Asesino"
  nivel: number
  experiencia: number
  estadisticas: {
    vida: number
    mana: number
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
  tipo: "Arma" | "Armadura" | "Poción" | "Accesorio" | "Material"
  rareza: "Común" | "Poco Común" | "Raro" | "Épico" | "Legendario"
  nivel: number
  precio: number
  descripcion: string
  estadisticas?: {
    ataque?: number
    defensa?: number
    vida?: number
    mana?: number
  }
}

export interface FiltrosBusqueda {
  nombre: string
  clase: string
  nivelMin: number
  nivelMax: number
  tipoObjeto: string
  rarezaObjeto: string
}
