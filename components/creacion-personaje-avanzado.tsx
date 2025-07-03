"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"
import { clasesAvanzadas, reinosAvanzados, quirksDisponibles } from "../data/tutorial-avanzado-data"
import type { PersonajeCompleto } from "../types/tutorial-avanzado"

interface CreacionPersonajeAvanzadoProps {
  isOpen: boolean
  onClose: () => void
  onPersonajeCreado: (personaje: PersonajeCompleto) => void
}

export function CreacionPersonajeAvanzado({ isOpen, onClose, onPersonajeCreado }: CreacionPersonajeAvanzadoProps) {
  const [paso, setPaso] = useState(1)
  const [personaje, setPersonaje] = useState<Partial<PersonajeCompleto>>({})

  if (!isOpen) return null

  const siguientePaso = () => {
    if (paso < 5) setPaso(paso + 1)
  }

  const pasoAnterior = () => {
    if (paso > 1) setPaso(paso - 1)
  }

  const completarCreacion = () => {
    if (personaje.nombre && personaje.clase && personaje.reino && personaje.genero && personaje.historia) {
      const claseSeleccionada = clasesAvanzadas.find((c) => c.nombre === personaje.clase)
      const reinoSeleccionado = reinosAvanzados.find((r) => r.nombre === personaje.reino)
      const quirkAleatorio = quirksDisponibles[Math.floor(Math.random() * quirksDisponibles.length)]

      const personajeCompleto: PersonajeCompleto = {
        id: `PQ_${Date.now()}`,
        nombre: personaje.nombre!,
        clase: personaje.clase!,
        reino: personaje.reino!,
        genero: personaje.genero!,
        historia: personaje.historia!,
        quirk: quirkAleatorio,
        nivel: 1,
        experiencia: 0,
        estadisticas: {
          vida: claseSeleccionada?.estadisticas.vida || 100,
          vidaMaxima: claseSeleccionada?.estadisticas.vida || 100,
          mana: claseSeleccionada?.estadisticas.mana || 50,
          manaMaximo: claseSeleccionada?.estadisticas.mana || 50,
          fuerza: (claseSeleccionada?.estadisticas.fuerza || 10) + (reinoSeleccionado?.bonificaciones.fuerza || 0),
          agilidad:
            (claseSeleccionada?.estadisticas.agilidad || 10) + (reinoSeleccionado?.bonificaciones.agilidad || 0),
          inteligencia:
            (claseSeleccionada?.estadisticas.inteligencia || 10) +
            (reinoSeleccionado?.bonificaciones.inteligencia || 0),
          defensa: (claseSeleccionada?.estadisticas.defensa || 10) + (reinoSeleccionado?.bonificaciones.defensa || 0),
        },
        inventario: [
          {
            id: "pocion_vida",
            nombre: "Poción de Vida",
            tipo: "Consumible",
            descripcion: "Restaura 50 HP",
            cantidad: 3,
          },
          {
            id: "pocion_mana",
            nombre: "Poción de Maná",
            tipo: "Consumible",
            descripcion: "Restaura 30 MP",
            cantidad: 2,
          },
        ],
      }

      onPersonajeCreado(personajeCompleto)
      onClose()
      setPaso(1)
      setPersonaje({})
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#36393f] text-white p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" className="w-8 h-8" />
            Creación de Personaje PassQuirk
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-[#4f545c]">
            ✕
          </Button>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg text-[#b9bbbe]">Paso {paso} de 5</span>
            <span className="text-sm text-[#b9bbbe]">{Math.round((paso / 5) * 100)}% Completado</span>
          </div>
          <div className="w-full bg-[#4f545c] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#5865f2] to-[#9B59B6] h-3 rounded-full transition-all duration-500"
              style={{ width: `${(paso / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Contenido por Paso */}
        <div className="min-h-[400px]">
          {paso === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">¿Cuál es tu nombre, explorador?</h3>
                <p className="text-[#b9bbbe]">Este será tu nombre en el mundo de PassQuirk. Elige sabiamente.</p>
              </div>
              <div className="max-w-md mx-auto">
                <Label htmlFor="nombre" className="text-lg">
                  Nombre del Personaje
                </Label>
                <Input
                  id="nombre"
                  value={personaje.nombre || ""}
                  onChange={(e) => setPersonaje({ ...personaje, nombre: e.target.value })}
                  placeholder="Ingresa tu nombre de explorador..."
                  className="bg-[#2f3136] border-[#4f545c] text-white text-lg h-12 mt-2"
                />
              </div>
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/5267-green-sparkles.gif"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">¿Cuál es tu género?</h3>
                <p className="text-[#b9bbbe]">Define la apariencia de tu avatar en PassQuirk.</p>
              </div>
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                <Button
                  onClick={() => setPersonaje({ ...personaje, genero: "Masculino" })}
                  variant={personaje.genero === "Masculino" ? "default" : "outline"}
                  className="h-24 text-lg flex flex-col gap-2"
                >
                  <span className="text-4xl">👨</span>
                  Masculino
                </Button>
                <Button
                  onClick={() => setPersonaje({ ...personaje, genero: "Femenino" })}
                  variant={personaje.genero === "Femenino" ? "default" : "outline"}
                  className="h-24 text-lg flex flex-col gap-2"
                >
                  <span className="text-4xl">👩</span>
                  Femenino
                </Button>
              </div>
            </div>
          )}

          {paso === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">Elige tu clase de combate</h3>
                <p className="text-[#b9bbbe]">Cada clase tiene estadísticas y habilidades únicas.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {clasesAvanzadas.map((clase) => (
                  <Button
                    key={clase.id}
                    onClick={() => setPersonaje({ ...personaje, clase: clase.nombre })}
                    variant={personaje.clase === clase.nombre ? "default" : "outline"}
                    className="h-20 justify-start p-4"
                  >
                    <span className="text-3xl mr-4">{clase.emoji}</span>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">{clase.nombre}</div>
                      <div className="text-sm text-[#b9bbbe] mb-1">{clase.descripcion}</div>
                      <div className="text-xs text-[#72767d]">
                        HP: {clase.estadisticas.vida} | MP: {clase.estadisticas.mana} | STR: {clase.estadisticas.fuerza}{" "}
                        | AGI: {clase.estadisticas.agilidad}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {paso === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">Elige tu reino de origen</h3>
                <p className="text-[#b9bbbe]">Tu reino natal otorga bonificaciones especiales.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {reinosAvanzados.map((reino) => (
                  <Button
                    key={reino.id}
                    onClick={() => setPersonaje({ ...personaje, reino: reino.nombre })}
                    variant={personaje.reino === reino.nombre ? "default" : "outline"}
                    className="h-20 justify-start p-4"
                  >
                    <span className="text-3xl mr-4">{reino.emoji}</span>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">{reino.nombre}</div>
                      <div className="text-sm text-[#b9bbbe]">{reino.descripcion}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {paso === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <EmojiAnimadoTutorial
                  src="https://cdn3.emoji.gg/emojis/65115-tada.gif"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">Cuéntanos tu historia</h3>
                <p className="text-[#b9bbbe]">¿Qué te motivó a convertirte en explorador de PassQuirk?</p>
              </div>
              <div className="max-w-2xl mx-auto">
                <Label htmlFor="historia" className="text-lg">
                  Historia Personal
                </Label>
                <Textarea
                  id="historia"
                  value={personaje.historia || ""}
                  onChange={(e) => setPersonaje({ ...personaje, historia: e.target.value })}
                  placeholder="Describe tu pasado, tus motivaciones, y cómo llegaste a PassQuirk..."
                  className="bg-[#2f3136] border-[#4f545c] text-white min-h-[120px] mt-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Botones de Navegación */}
        <div className="flex justify-between mt-8 pt-6 border-t border-[#4f545c]">
          <Button
            onClick={pasoAnterior}
            disabled={paso === 1}
            variant="secondary"
            className="bg-[#4f545c] hover:bg-[#5d6269] text-white"
          >
            ⬅️ Anterior
          </Button>

          {paso < 5 ? (
            <Button
              onClick={siguientePaso}
              disabled={
                (paso === 1 && !personaje.nombre) ||
                (paso === 2 && !personaje.genero) ||
                (paso === 3 && !personaje.clase) ||
                (paso === 4 && !personaje.reino)
              }
              className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
            >
              Siguiente ➡️
            </Button>
          ) : (
            <Button
              onClick={completarCreacion}
              disabled={!personaje.historia}
              className="bg-[#57f287] hover:bg-[#3ba55c] text-black font-bold flex items-center gap-2"
            >
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" className="w-5 h-5" />
              ¡Crear Personaje!
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
