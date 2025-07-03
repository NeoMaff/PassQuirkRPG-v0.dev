"use client"

import { useState } from "react"
import { TutorialEmbedAvanzado } from "./components/tutorial-embed-avanzado"
import { BotonesTutorialAvanzado } from "./components/botones-tutorial-avanzado"
import { CreacionPersonajeAvanzado } from "./components/creacion-personaje-avanzado"
import { CombateTutorial } from "./components/combate-tutorial"
import { seccionesTutorialAvanzadas } from "./data/tutorial-avanzado-data"
import type { PersonajeCompleto, EstadoTutorialAvanzado } from "./types/tutorial-avanzado"
import { EmojiAnimadoTutorial } from "./components/emoji-animado-tutorial"

export default function TutorialPassQuirkCompletoAvanzado() {
  const [seccionActual, setSeccionActual] = useState(0)
  const [estadoTutorial, setEstadoTutorial] = useState<EstadoTutorialAvanzado>({
    seccionActual: 0,
    seccionesCompletadas: [],
    personajeCreado: false,
    combateCompletado: false,
    tutorialIniciado: true,
    fechaInicio: new Date().toISOString(),
  })
  const [personaje, setPersonaje] = useState<PersonajeCompleto | null>(null)
  const [mostrarCreacionPersonaje, setMostrarCreacionPersonaje] = useState(false)
  const [mostrarCombate, setMostrarCombate] = useState(false)
  const [tutorialCompletado, setTutorialCompletado] = useState(false)

  const seccion = seccionesTutorialAvanzadas[seccionActual]
  const progreso = ((seccionActual + 1) / seccionesTutorialAvanzadas.length) * 100

  const siguienteSeccion = () => {
    if (seccionActual < seccionesTutorialAvanzadas.length - 1) {
      const nuevaSeccion = seccionActual + 1
      setSeccionActual(nuevaSeccion)
      setEstadoTutorial((prev) => ({
        ...prev,
        seccionActual: nuevaSeccion,
        seccionesCompletadas: [...prev.seccionesCompletadas, seccion.id],
      }))
    }
  }

  const seccionAnterior = () => {
    if (seccionActual > 0) {
      setSeccionActual(seccionActual - 1)
    }
  }

  const crearPersonaje = () => {
    setMostrarCreacionPersonaje(true)
  }

  const onPersonajeCreado = (nuevoPersonaje: PersonajeCompleto) => {
    setPersonaje(nuevoPersonaje)
    setEstadoTutorial((prev) => ({ ...prev, personajeCreado: true }))
    alert(`¡Personaje creado exitosamente!

👤 **${nuevoPersonaje.nombre}**
🎭 Género: ${nuevoPersonaje.genero}
⚔️ Clase: ${nuevoPersonaje.clase}
🏰 Reino: ${nuevoPersonaje.reino}
✨ Quirk: ${nuevoPersonaje.quirk}

📊 **Estadísticas:**
❤️ HP: ${nuevoPersonaje.estadisticas.vida}/${nuevoPersonaje.estadisticas.vidaMaxima}
💙 MP: ${nuevoPersonaje.estadisticas.mana}/${nuevoPersonaje.estadisticas.manaMaximo}
💪 Fuerza: ${nuevoPersonaje.estadisticas.fuerza}
🏃 Agilidad: ${nuevoPersonaje.estadisticas.agilidad}
🧠 Inteligencia: ${nuevoPersonaje.estadisticas.inteligencia}
🛡️ Defensa: ${nuevoPersonaje.estadisticas.defensa}

¡Tu aventura en PassQuirk está lista para comenzar!`)
  }

  const iniciarCombate = () => {
    if (!personaje) {
      alert("¡Debes crear tu personaje antes de entrar en combate!")
      return
    }
    setMostrarCombate(true)
  }

  const onCombateCompletado = () => {
    setEstadoTutorial((prev) => ({ ...prev, combateCompletado: true }))
    alert(`¡Combate completado exitosamente!

🎉 ¡Has derrotado al Slime de Entrenamiento!
⭐ +15 Puntos de Experiencia
🧪 +1 Poción de Vida añadida al inventario
🏆 Has dominado los fundamentos del combate

¡Ahora estás listo para enfrentar enemigos más poderosos en PassQuirk!`)
  }

  const completarTutorial = () => {
    setTutorialCompletado(true)
  }

  if (tutorialCompletado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="bg-[#36393f] rounded-lg p-8 text-white">
            <div className="flex items-center justify-center gap-4 mb-8">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-16 h-16" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ¡Tutorial Completado!
              </h1>
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-16 h-16" />
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif" className="w-8 h-8" />
                <p className="text-2xl font-semibold">¡Bienvenido a Space Central!</p>
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif" className="w-8 h-8" />
              </div>
              <p className="text-[#b9bbbe] text-lg leading-relaxed max-w-3xl mx-auto">
                Has completado exitosamente tu entrenamiento con El Sabio. Ahora tienes acceso completo a
                <strong className="text-white"> Space Central</strong>, la ciudad más importante del mundo PassQuirk,
                donde tu verdadera aventura comienza.
              </p>
            </div>

            {/* Resumen del Progreso */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#2f3136] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Personaje</h3>
                </div>
                {personaje ? (
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Nombre:</strong> {personaje.nombre}
                    </p>
                    <p>
                      <strong>Clase:</strong> {personaje.clase}
                    </p>
                    <p>
                      <strong>Reino:</strong> {personaje.reino}
                    </p>
                    <p>
                      <strong>Quirk:</strong> {personaje.quirk}
                    </p>
                  </div>
                ) : (
                  <p className="text-[#b9bbbe] text-sm">No creado</p>
                )}
              </div>

              <div className="bg-[#2f3136] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Combate</h3>
                </div>
                <div className="text-sm space-y-1">
                  <p className={estadoTutorial.combateCompletado ? "text-green-400" : "text-red-400"}>
                    {estadoTutorial.combateCompletado ? "✅ Completado" : "❌ No completado"}
                  </p>
                  {estadoTutorial.combateCompletado && <p className="text-[#b9bbbe]">Slime derrotado</p>}
                </div>
              </div>

              <div className="bg-[#2f3136] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Progreso</h3>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Secciones:</strong> {seccionesTutorialAvanzadas.length}/{seccionesTutorialAvanzadas.length}
                  </p>
                  <p>
                    <strong>Completado:</strong> 100%
                  </p>
                  <p className="text-green-400">¡Tutorial finalizado!</p>
                </div>
              </div>
            </div>

            {/* Botón Principal */}
            <button
              onClick={() =>
                alert(`🎮 ¡Bienvenido a Space Central!

🏰 **Lugares disponibles:**
• 🏪 Tiendas - Compra equipamiento y pociones
• 📋 Tablón de Misiones - Acepta aventuras
• 🏛️ Gremios - Únete a otros exploradores
• 🌀 Portales - Viaja a diferentes reinos
• 👥 Plaza Central - Interactúa con NPCs

⚔️ **Comandos disponibles:**
• /explorar - Explora nuevas zonas
• /perfil - Ve tu información
• /inventario - Revisa tus objetos
• /misiones - Busca aventuras
• /gremio - Gestiona tu gremio

¡Tu aventura real comienza ahora!`)
              }
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-6 px-12 rounded-xl text-2xl flex items-center gap-4 mx-auto transition-all duration-300 transform hover:scale-105"
            >
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
              ¡Entrar a Space Central!
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
            </button>

            {/* Información adicional */}
            <div className="mt-8 p-6 bg-[#2f3136] rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" />
                ¿Qué sigue?
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-[#b9bbbe]">
                <div>
                  <p className="mb-2">
                    <strong className="text-white">Exploración:</strong>
                  </p>
                  <p>• Visita los 3 reinos principales</p>
                  <p>• Descubre zonas secretas</p>
                  <p>• Encuentra las 10 PassQuirk legendarias</p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong className="text-white">Progresión:</strong>
                  </p>
                  <p>• Sube de nivel tu personaje</p>
                  <p>• Mejora tu equipamiento</p>
                  <p>• Desarrolla tu Quirk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-12 h-12" />
            PassQuirk RPG - Tutorial Avanzado
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-12 h-12" />
          </h1>
          <p className="text-slate-300 text-xl flex items-center justify-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" />
            Domina el mundo interdimensional de PassQuirk con El Sabio
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" />
          </p>
        </div>

        {/* Embed del Tutorial */}
        <TutorialEmbedAvanzado
          seccion={seccion}
          progreso={progreso}
          numeroSeccion={seccionActual + 1}
          totalSecciones={seccionesTutorialAvanzadas.length}
        />

        {/* Botones de Navegación */}
        <BotonesTutorialAvanzado
          seccionActual={seccionActual}
          totalSecciones={seccionesTutorialAvanzadas.length}
          tipoSeccionActual={seccion.tipo}
          onAnterior={seccionAnterior}
          onSiguiente={siguienteSeccion}
          onCrearPersonaje={crearPersonaje}
          onIniciarCombate={iniciarCombate}
          onCompletarTutorial={completarTutorial}
          personajeCreado={estadoTutorial.personajeCreado}
          combateCompletado={estadoTutorial.combateCompletado}
          mostrarCompletarTutorial={seccionActual === seccionesTutorialAvanzadas.length - 1}
        />

        {/* Modales */}
        <CreacionPersonajeAvanzado
          isOpen={mostrarCreacionPersonaje}
          onClose={() => setMostrarCreacionPersonaje(false)}
          onPersonajeCreado={onPersonajeCreado}
        />

        <CombateTutorial
          isOpen={mostrarCombate}
          onClose={() => setMostrarCombate(false)}
          onCombateCompletado={onCombateCompletado}
          personaje={personaje}
        />

        {/* Panel de Estado */}
        <div className="bg-[#36393f] rounded-lg p-6 text-white max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" />
            Estado del Tutorial PassQuirk
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-[#b9bbbe]">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif"
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <strong className="text-white">Sistema Avanzado:</strong>
                  <p>6 secciones interactivas con videos y navegación completa</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif"
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <strong className="text-white">Creación Completa:</strong>
                  <p>Sistema de 5 pasos con estadísticas y bonificaciones</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-5 h-5 mt-1" />
                <div>
                  <strong className="text-white">Combate Realista:</strong>
                  <p>Sistema por turnos con HP, energía y habilidades Quirk</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/5417_star_purple.gif"
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <strong className="text-white">Videos Integrados:</strong>
                  <p>El Sabio y PassQuirks con contenido multimedia</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-5 h-5 mt-1" />
                <div>
                  <strong className="text-white">Progreso Persistente:</strong>
                  <p>Estado guardado y seguimiento completo</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif"
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <strong className="text-white">Acceso a Space Central:</strong>
                  <p>Ciudad base desbloqueada al completar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
