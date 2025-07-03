"use client"

import { useState } from "react"
import { TutorialEmbed } from "./components/tutorial-embed"
import { BotonesTutorial } from "./components/botones-tutorial"
import { CreacionPersonajeModal } from "./components/creacion-personaje-modal"
import { seccionesTutorial } from "./data/tutorial-data"
import type { PersonajeTutorial } from "./types/tutorial"
import { EmojiAnimadoTutorial } from "./components/emoji-animado-tutorial"

export default function TutorialPassQuirkCompleto() {
  const [seccionActual, setSeccionActual] = useState(0)
  const [personajeCreado, setPersonajeCreado] = useState<PersonajeTutorial | null>(null)
  const [mostrarCreacionPersonaje, setMostrarCreacionPersonaje] = useState(false)
  const [tutorialCompletado, setTutorialCompletado] = useState(false)

  const seccion = seccionesTutorial[seccionActual]
  const progreso = ((seccionActual + 1) / seccionesTutorial.length) * 100

  const siguienteSeccion = () => {
    if (seccionActual < seccionesTutorial.length - 1) {
      setSeccionActual(seccionActual + 1)
    } else {
      setTutorialCompletado(true)
    }
  }

  const seccionAnterior = () => {
    if (seccionActual > 0) {
      setSeccionActual(seccionActual - 1)
    }
  }

  const iniciarAventura = () => {
    alert(`¡Bienvenido a Space Central, ${personajeCreado?.nombre || "Explorador"}!

🎉 Has completado el tutorial de PassQuirk RPG
🏰 Ahora puedes explorar Space Central, la ciudad base
🗺️ Descubre misiones, tiendas y otros exploradores
⚔️ ¡Tu verdadera aventura comienza ahora!

Comandos disponibles:
• /explorar - Explora nuevas zonas
• /perfil - Ve tu información de personaje  
• /inventario - Revisa tus objetos
• /misiones - Busca nuevas aventuras`)
  }

  const crearPersonaje = () => {
    setMostrarCreacionPersonaje(true)
  }

  const combatePractica = () => {
    alert(`🥊 Combate de Práctica - Tutorial

ElSabio invoca un Slime para practicar:

🟢 Slime Nivel 1
❤️ HP: 30/30
⚡ Habilidades: Salto Pegajoso

Tu turno:
• ⚔️ Atacar (Daño: 15-20)
• 🛡️ Defender (Reduce daño 50%)
• 🧪 Usar Poción (Cura 25 HP)

¡Este es un combate por turnos como Pokémon!
¿Qué acción eliges?`)
  }

  const onPersonajeCreado = (personaje: PersonajeTutorial) => {
    setPersonajeCreado(personaje)
    alert(`¡Personaje creado exitosamente!

👤 Nombre: ${personaje.nombre}
🎭 Género: ${personaje.genero}
⚔️ Clase: ${personaje.clase}
🏰 Reino: ${personaje.reino}
✨ Quirk: ${personaje.quirk}

📖 Historia: ${personaje.historia}

¡Tu aventura en PassQuirk está lista para comenzar!`)
  }

  if (tutorialCompletado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="bg-[#36393f] rounded-lg p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-12 h-12" />
              <h1 className="text-4xl font-bold">¡Tutorial Completado!</h1>
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-12 h-12" />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-2">
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif" />
                <p className="text-xl">¡Bienvenido a Space Central!</p>
              </div>
              <p className="text-[#b9bbbe]">
                Has completado tu entrenamiento con ElSabio. Ahora puedes explorar el mundo de PassQuirk libremente.
              </p>
            </div>

            {personajeCreado && (
              <div className="bg-[#2f3136] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" />
                  Tu Personaje
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Nombre:</strong> {personajeCreado.nombre}
                    </p>
                    <p>
                      <strong>Clase:</strong> {personajeCreado.clase}
                    </p>
                    <p>
                      <strong>Reino:</strong> {personajeCreado.reino}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Género:</strong> {personajeCreado.genero}
                    </p>
                    <p>
                      <strong>Quirk:</strong> {personajeCreado.quirk}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={iniciarAventura}
              className="bg-[#fcd34d] hover:bg-[#f59e0b] text-black font-bold py-4 px-8 rounded-lg text-xl flex items-center gap-3 mx-auto transition-colors"
            >
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-6 h-6" />
              ¡Comenzar Aventura en Space Central!
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
            PassQuirk RPG - Tutorial Completo
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
          </h1>
          <p className="text-slate-300 flex items-center justify-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" />
            Aprende todo sobre el mundo interdimensional de PassQuirk
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" />
          </p>
        </div>

        {/* Embed del Tutorial */}
        <TutorialEmbed
          seccion={seccion}
          progreso={progreso}
          numeroSeccion={seccionActual + 1}
          totalSecciones={seccionesTutorial.length}
        />

        {/* Botones de Navegación */}
        <BotonesTutorial
          seccionActual={seccionActual}
          totalSecciones={seccionesTutorial.length}
          onAnterior={seccionAnterior}
          onSiguiente={siguienteSeccion}
          onIniciarAventura={iniciarAventura}
          onCrearPersonaje={crearPersonaje}
          onCombatePractica={combatePractica}
          mostrarIniciarAventura={seccionActual === seccionesTutorial.length - 1}
        />

        {/* Modal de Creación de Personaje */}
        <CreacionPersonajeModal
          isOpen={mostrarCreacionPersonaje}
          onClose={() => setMostrarCreacionPersonaje(false)}
          onPersonajeCreado={onPersonajeCreado}
        />

        {/* Información del Sistema */}
        <div className="bg-[#36393f] rounded-lg p-6 text-white max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" />
            Características del Tutorial PassQuirk
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-[#b9bbbe]">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif"
                  className="w-4 h-4 mt-1"
                />
                <span>
                  <strong>Guía Completa:</strong> 7 secciones detalladas del mundo PassQuirk
                </span>
              </div>
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif"
                  className="w-4 h-4 mt-1"
                />
                <span>
                  <strong>Creación de Personaje:</strong> Sistema completo de 5 pasos
                </span>
              </div>
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-4 h-4 mt-1" />
                <span>
                  <strong>Combate de Práctica:</strong> Tutorial interactivo contra Slime
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/5417_star_purple.gif"
                  className="w-4 h-4 mt-1"
                />
                <span>
                  <strong>Emojis Animados:</strong> Experiencia visual inmersiva
                </span>
              </div>
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-4 h-4 mt-1" />
                <span>
                  <strong>Progreso Visual:</strong> Barra de progreso y navegación
                </span>
              </div>
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif"
                  className="w-4 h-4 mt-1"
                />
                <span>
                  <strong>Acceso a Space Central:</strong> Ciudad base al completar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
