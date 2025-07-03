import type { SeccionTutorial } from "../types/tutorial"

export const seccionesTutorial: SeccionTutorial[] = [
  {
    id: "bienvenida",
    titulo: "Bienvenido a PassQuirk RPG",
    descripcion: "Descubre el mundo interdimensional de PassQuirk",
    emoji: "https://cdn3.emoji.gg/emojis/58229-sparklestars.gif",
    contenido: [
      "¡Bienvenido, valiente explorador! Soy ElSabio, tu guía en este mundo mágico.",
      "PassQuirk es un universo donde cada persona posee un don único llamado **Quirk**.",
      "Estos poderes se despiertan al cruzar portales interdimensionales.",
      "¿Estás listo para descubrir tu destino?",
    ],
    completada: false,
  },
  {
    id: "creacion_personaje",
    titulo: "Creación de Personaje",
    descripcion: "Crea tu avatar único en el mundo de PassQuirk",
    emoji: "https://cdn3.emoji.gg/emojis/47232-crown-green.gif",
    contenido: [
      "Primero, necesitamos crear tu personaje único.",
      "Elegirás tu nombre, apariencia, clase y reino de origen.",
      "Cada decisión afectará tu aventura en PassQuirk.",
      "¡Tu historia comienza aquí!",
    ],
    completada: false,
  },
  {
    id: "reinos",
    titulo: "Los Tres Reinos Principales",
    descripcion: "Conoce los reinos de Akai, Say y Masai",
    emoji: "https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif",
    contenido: [
      "🔴 **Reino de Akai**: Especializado en guerreros y combate cuerpo a cuerpo",
      "🟢 **Reino de Say**: Famoso por su dominio de la magia y sabiduría ancestral",
      "🟡 **Reino de Masai**: Núcleo del comercio, artesanos y diplomacia",
      "Cada reino tiene su cultura, gobierno y especialidades únicas.",
    ],
    completada: false,
  },
  {
    id: "quirks_passquirk",
    titulo: "Quirks y PassQuirks",
    descripcion: "Aprende sobre los poderes y las esferas legendarias",
    emoji: "https://cdn3.emoji.gg/emojis/5417_star_purple.gif",
    contenido: [
      "Los **Quirks** son poderes únicos que cada persona desarrolla.",
      "Las **10 PassQuirk** son esferas moradas legendarias esparcidas por el mundo.",
      "Estas esferas eligen a su portador y potencian cualquier Quirk a niveles inhumanos.",
      "Solo combinando las 10 PassQuirk se puede enfrentar al Rey Demonio.",
    ],
    completada: false,
  },
  {
    id: "combate",
    titulo: "Sistema de Combate",
    descripcion: "Aprende los fundamentos del combate por turnos",
    emoji: "https://cdn3.emoji.gg/emojis/7384-greenfire.gif",
    contenido: [
      "El combate en PassQuirk es por turnos, similar a Pokémon.",
      "Puedes **Atacar**, **Defender** o usar **Objetos** del inventario.",
      "Cada clase tiene habilidades especiales únicas.",
      "¡Practiquemos contra un Slime!",
    ],
    completada: false,
  },
  {
    id: "dragones",
    titulo: "Jerarquía de Enemigos",
    descripción: "Conoce a los enemigos más poderosos del mundo",
    emoji: "https://cdn3.emoji.gg/emojis/42684-star-r.gif",
    contenido: [
      "🐉 **Dragones Clase Baja**: Comunes pero difíciles de encontrar",
      "🐲 **Dragones Clase Media**: Uno puede aniquilar ciudades enteras",
      "🔥 **Dragones Clase Alta**: Pueden conquistar planetas completos",
      "👑 **Rey Demonio**: El enemigo final, solo derrotable con las 10 PassQuirk",
    ],
    completada: false,
  },
  {
    id: "space_central",
    titulo: "Space Central",
    descripcion: "Tu ciudad base y centro de aventuras",
    emoji: "https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif",
    contenido: [
      "**Space Central** es la ciudad base y corazón del mundo PassQuirk.",
      "Aquí encontrarás tiendas, misiones, otros jugadores y portales.",
      "Es tu punto de partida para todas las aventuras.",
      "¡Bienvenido a tu nuevo hogar, explorador!",
    ],
    completada: false,
  },
]

export const clasesDisponibles = [
  { id: "arquero", nombre: "Arquero", emoji: "🎯", descripcion: "Maestro del combate a distancia" },
  { id: "ninja", nombre: "Ninja", emoji: "🥷", descripcion: "Sigiloso y letal en las sombras" },
  { id: "espadachin", nombre: "Espadachín", emoji: "🗡️", descripcion: "Experto en el arte de la espada" },
  { id: "guerrero", nombre: "Guerrero", emoji: "🛡️", descripcion: "Tanque resistente en primera línea" },
  { id: "mago", nombre: "Mago", emoji: "🧙‍♂️", descripcion: "Manipulador de las artes arcanas" },
]

export const reinosDisponibles = [
  { id: "akai", nombre: "Reino Rojo: Akai", emoji: "🌋", descripcion: "Especializado en guerreros" },
  { id: "say", nombre: "Reino Verde: Say", emoji: "🌲", descripcion: "Dominio de la magia" },
  { id: "masai", nombre: "Reino Amarillo: Masai", emoji: "🏜️", descripcion: "Centro del comercio" },
  { id: "bosque", nombre: "Bosque Misterioso", emoji: "🌑", descripcion: "Lleno de secretos" },
  { id: "cueva", nombre: "Cueva Oscura", emoji: "🕳️", descripcion: "Peligrosa pero rica en tesoros" },
]
