"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"
import type { EstadoCombateTutorial, PersonajeCompleto } from "../types/tutorial-avanzado"

interface CombateTutorialProps {
  isOpen: boolean
  onClose: () => void
  onCombateCompletado: () => void
  personaje: PersonajeCompleto | null
}

export function CombateTutorial({ isOpen, onClose, onCombateCompletado, personaje }: CombateTutorialProps) {
  const [estadoCombate, setEstadoCombate] = useState<EstadoCombateTutorial>({
    jugador: {
      nombre: personaje?.nombre || "Explorador",
      hp: personaje?.estadisticas.vida || 100,
      hpMax: personaje?.estadisticas.vidaMaxima || 100,
      energia: 100,
      energiaMax: 100,
    },
    enemigo: {
      nombre: "Slime de Entrenamiento",
      hp: 30,
      hpMax: 30,
      nivel: 1,
      imagen: "/slime-tutorial.png",
    },
    turno: "jugador",
    accionesDisponibles: ["atacar", "defender", "usar_pocion", "habilidad_quirk"],
    mensajeCombate: "¡El combate ha comenzado! Es tu turno.",
    combateTerminado: false,
    victoria: false,
  })

  if (!isOpen) return null

  const ejecutarAccion = (accion: string) => {
    if (estadoCombate.combateTerminado) return

    const nuevoEstado = { ...estadoCombate }
    let mensaje = ""

    switch (accion) {
      case "atacar":
        const dano = Math.floor(Math.random() * 10) + 10 // 10-19 daño
        nuevoEstado.enemigo.hp = Math.max(0, nuevoEstado.enemigo.hp - dano)
        mensaje = `¡Atacaste al Slime por ${dano} puntos de daño!`
        break

      case "defender":
        mensaje = "Te preparas para defenderte. El próximo ataque hará menos daño."
        break

      case "usar_pocion":
        const curacion = 25
        nuevoEstado.jugador.hp = Math.min(nuevoEstado.jugador.hpMax, nuevoEstado.jugador.hp + curacion)
        mensaje = `Usaste una Poción de Vida y recuperaste ${curacion} HP.`
        break

      case "habilidad_quirk":
        if (nuevoEstado.jugador.energia >= 20) {
          const danoQuirk = Math.floor(Math.random() * 15) + 15 // 15-29 daño
          nuevoEstado.enemigo.hp = Math.max(0, nuevoEstado.enemigo.hp - danoQuirk)
          nuevoEstado.jugador.energia -= 20
          mensaje = `¡Usaste tu Quirk "${personaje?.quirk}" por ${danoQuirk} puntos de daño!`
        } else {
          mensaje = "No tienes suficiente energía para usar tu Quirk."
          return
        }
        break
    }

    // Verificar si el enemigo fue derrotado
    if (nuevoEstado.enemigo.hp <= 0) {
      nuevoEstado.combateTerminado = true
      nuevoEstado.victoria = true
      mensaje += " ¡Has derrotado al Slime! ¡Victoria!"
    } else {
      // Turno del enemigo
      nuevoEstado.turno = "enemigo"
      setTimeout(() => {
        const danoEnemigo = Math.floor(Math.random() * 8) + 5 // 5-12 daño
        const danoRecibido = accion === "defender" ? Math.floor(danoEnemigo / 2) : danoEnemigo

        setEstadoCombate((prev) => {
          const estadoEnemigo = { ...prev }
          estadoEnemigo.jugador.hp = Math.max(0, estadoEnemigo.jugador.hp - danoRecibido)
          estadoEnemigo.turno = "jugador"
          estadoEnemigo.mensajeCombate = `El Slime te atacó con Salto Pegajoso por ${danoRecibido} puntos de daño.`

          if (estadoEnemigo.jugador.hp <= 0) {
            estadoEnemigo.combateTerminado = true
            estadoEnemigo.victoria = false
            estadoEnemigo.mensajeCombate += " ¡Has sido derrotado!"
          }

          return estadoEnemigo
        })
      }, 1500)
    }

    nuevoEstado.mensajeCombate = mensaje
    setEstadoCombate(nuevoEstado)
  }

  const reiniciarCombate = () => {
    setEstadoCombate({
      jugador: {
        nombre: personaje?.nombre || "Explorador",
        hp: personaje?.estadisticas.vida || 100,
        hpMax: personaje?.estadisticas.vidaMaxima || 100,
        energia: 100,
        energiaMax: 100,
      },
      enemigo: {
        nombre: "Slime de Entrenamiento",
        hp: 30,
        hpMax: 30,
        nivel: 1,
        imagen: "/slime-tutorial.png",
      },
      turno: "jugador",
      accionesDisponibles: ["atacar", "defender", "usar_pocion", "habilidad_quirk"],
      mensajeCombate: "¡El combate ha comenzado! Es tu turno.",
      combateTerminado: false,
      victoria: false,
    })
  }

  const completarCombate = () => {
    if (estadoCombate.victoria) {
      onCombateCompletado()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#36393f] text-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-8 h-8" />
            Combate Tutorial - PassQuirk RPG
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-[#4f545c]">
            ✕
          </Button>
        </div>

        {/* Estado del Combate */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Jugador */}
          <div className="bg-[#2f3136] p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" className="w-6 h-6" />
              {estadoCombate.jugador.nombre}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">HP</span>
                  <span className="text-sm">
                    {estadoCombate.jugador.hp}/{estadoCombate.jugador.hpMax}
                  </span>
                </div>
                <Progress value={(estadoCombate.jugador.hp / estadoCombate.jugador.hpMax) * 100} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Energía</span>
                  <span className="text-sm">
                    {estadoCombate.jugador.energia}/{estadoCombate.jugador.energiaMax}
                  </span>
                </div>
                <Progress
                  value={(estadoCombate.jugador.energia / estadoCombate.jugador.energiaMax) * 100}
                  className="h-3"
                />
              </div>
            </div>
          </div>

          {/* Enemigo */}
          <div className="bg-[#2f3136] p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🟢</span>
              {estadoCombate.enemigo.nombre}
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={estadoCombate.enemigo.imagen || "/placeholder.svg"}
                alt="Slime Tutorial"
                className="w-16 h-16 rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">HP</span>
                  <span className="text-sm">
                    {estadoCombate.enemigo.hp}/{estadoCombate.enemigo.hpMax}
                  </span>
                </div>
                <Progress value={(estadoCombate.enemigo.hp / estadoCombate.enemigo.hpMax) * 100} className="h-3" />
                <div className="text-xs text-[#b9bbbe] mt-1">Nivel {estadoCombate.enemigo.nivel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de Combate */}
        <div className="bg-[#2f3136] p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-5 h-5" />
            <span className="font-semibold">Estado del Combate</span>
          </div>
          <p className="text-[#b9bbbe]">{estadoCombate.mensajeCombate}</p>
          {estadoCombate.turno === "jugador" && !estadoCombate.combateTerminado && (
            <p className="text-green-400 mt-2">¡Es tu turno! Elige una acción.</p>
          )}
          {estadoCombate.turno === "enemigo" && !estadoCombate.combateTerminado && (
            <p className="text-red-400 mt-2">Turno del enemigo...</p>
          )}
        </div>

        {/* Acciones de Combate */}
        {!estadoCombate.combateTerminado && estadoCombate.turno === "jugador" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Button
              onClick={() => ejecutarAccion("atacar")}
              className="bg-[#e74c3c] hover:bg-[#c0392b] text-white h-16 flex flex-col gap-1"
            >
              <span className="text-xl">⚔️</span>
              <span className="text-sm">Atacar</span>
            </Button>
            <Button
              onClick={() => ejecutarAccion("defender")}
              className="bg-[#3498db] hover:bg-[#2980b9] text-white h-16 flex flex-col gap-1"
            >
              <span className="text-xl">🛡️</span>
              <span className="text-sm">Defender</span>
            </Button>
            <Button
              onClick={() => ejecutarAccion("usar_pocion")}
              className="bg-[#27ae60] hover:bg-[#229954] text-white h-16 flex flex-col gap-1"
            >
              <span className="text-xl">🧪</span>
              <span className="text-sm">Poción</span>
            </Button>
            <Button
              onClick={() => ejecutarAccion("habilidad_quirk")}
              disabled={estadoCombate.jugador.energia < 20}
              className="bg-[#9b59b6] hover:bg-[#8e44ad] text-white h-16 flex flex-col gap-1 disabled:opacity-50"
            >
              <span className="text-xl">✨</span>
              <span className="text-sm">Quirk</span>
            </Button>
          </div>
        )}

        {/* Resultado del Combate */}
        {estadoCombate.combateTerminado && (
          <div className="bg-[#2f3136] p-6 rounded-lg text-center">
            {estadoCombate.victoria ? (
              <div>
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/65115-tada.gif"
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold text-green-400 mb-2">¡Victoria!</h3>
                <p className="text-[#b9bbbe] mb-4">Has derrotado al Slime de Entrenamiento. ¡Excelente trabajo!</p>
                <div className="bg-[#27ae60] p-3 rounded-lg mb-4">
                  <p className="text-white font-semibold">Recompensas obtenidas:</p>
                  <p className="text-sm">• 15 Puntos de Experiencia</p>
                  <p className="text-sm">• 1 Poción de Vida</p>
                  <p className="text-sm">• Conocimiento de combate básico</p>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-6xl mb-4 block">💀</span>
                <h3 className="text-2xl font-bold text-red-400 mb-2">Derrota</h3>
                <p className="text-[#b9bbbe] mb-4">
                  El Slime te ha derrotado. ¡No te preocupes, es parte del aprendizaje!
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              {!estadoCombate.victoria && (
                <Button onClick={reiniciarCombate} className="bg-[#f39c12] hover:bg-[#e67e22] text-white">
                  🔄 Intentar de Nuevo
                </Button>
              )}
              <Button onClick={completarCombate} className="bg-[#5865f2] hover:bg-[#4752c4] text-white">
                {estadoCombate.victoria ? "¡Continuar Tutorial!" : "Salir del Combate"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
