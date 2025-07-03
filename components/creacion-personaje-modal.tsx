"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"
import { clasesDisponibles, reinosDisponibles } from "../data/tutorial-data"
import type { PersonajeTutorial } from "../types/tutorial"

interface CreacionPersonajeModalProps {
  isOpen: boolean
  onClose: () => void
  onPersonajeCreado: (personaje: PersonajeTutorial) => void
}

export function CreacionPersonajeModal({ isOpen, onClose, onPersonajeCreado }: CreacionPersonajeModalProps) {
  const [paso, setPaso] = useState(1)
  const [personaje, setPersonaje] = useState<Partial<PersonajeTutorial>>({})

  if (!isOpen) return null

  const siguientePaso = () => {
    if (paso < 5) setPaso(paso + 1)
  }

  const pasoAnterior = () => {
    if (paso > 1) setPaso(paso - 1)
  }

  const completarCreacion = () => {
    if (personaje.nombre && personaje.clase && personaje.reino && personaje.genero && personaje.historia) {
      const personajeCompleto: PersonajeTutorial = {
        ...(personaje as PersonajeTutorial),
        quirk: generarQuirkAleatorio(),
      }
      onPersonajeCreado(personajeCompleto)
      onClose()
    }
  }

  const generarQuirkAleatorio = () => {
    const quirks = [
      "Manipulación de Fuego",
      "Control de Sombras",
      "Teletransportación",
      "Fuerza Sobrehumana",
      "Curación Acelerada",
      "Control Mental",
      "Manipulación del Tiempo",
      "Invisibilidad",
      "Control de Elementos",
      "Precognición",
    ]
    return quirks[Math.floor(Math.random() * quirks.length)]
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-[#36393f] text-white p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" />
            Creación de Personaje
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            ✕
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-[#b9bbbe]">Paso {paso} de 5</span>
          </div>
          <div className="w-full bg-[#4f545c] rounded-full h-2">
            <div
              className="bg-[#5865f2] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(paso / 5) * 100}%` }}
            />
          </div>
        </div>

        {paso === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" />
              <h3 className="text-lg font-semibold">¿Cuál es tu nombre, explorador?</h3>
            </div>
            <div>
              <Label htmlFor="nombre">Nombre del Personaje</Label>
              <Input
                id="nombre"
                value={personaje.nombre || ""}
                onChange={(e) => setPersonaje({ ...personaje, nombre: e.target.value })}
                placeholder="Ingresa tu nombre..."
                className="bg-[#2f3136] border-[#4f545c] text-white"
              />
            </div>
          </div>
        )}

        {paso === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/5267-green-sparkles.gif" />
              <h3 className="text-lg font-semibold">¿Cuál es tu género?</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => setPersonaje({ ...personaje, genero: "Masculino" })}
                variant={personaje.genero === "Masculino" ? "default" : "outline"}
                className="h-16"
              >
                👨 Masculino
              </Button>
              <Button
                onClick={() => setPersonaje({ ...personaje, genero: "Femenino" })}
                variant={personaje.genero === "Femenino" ? "default" : "outline"}
                className="h-16"
              >
                👩 Femenino
              </Button>
            </div>
          </div>
        )}

        {paso === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" />
              <h3 className="text-lg font-semibold">Elige tu clase</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {clasesDisponibles.map((clase) => (
                <Button
                  key={clase.id}
                  onClick={() => setPersonaje({ ...personaje, clase: clase.nombre })}
                  variant={personaje.clase === clase.nombre ? "default" : "outline"}
                  className="h-16 justify-start"
                >
                  <span className="text-2xl mr-3">{clase.emoji}</span>
                  <div className="text-left">
                    <div className="font-semibold">{clase.nombre}</div>
                    <div className="text-sm text-[#b9bbbe]">{clase.descripcion}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {paso === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif" />
              <h3 className="text-lg font-semibold">Elige tu reino de origen</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {reinosDisponibles.map((reino) => (
                <Button
                  key={reino.id}
                  onClick={() => setPersonaje({ ...personaje, reino: reino.nombre })}
                  variant={personaje.reino === reino.nombre ? "default" : "outline"}
                  className="h-16 justify-start"
                >
                  <span className="text-2xl mr-3">{reino.emoji}</span>
                  <div className="text-left">
                    <div className="font-semibold">{reino.nombre}</div>
                    <div className="text-sm text-[#b9bbbe]">{reino.descripcion}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {paso === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" />
              <h3 className="text-lg font-semibold">Cuéntanos tu historia</h3>
            </div>
            <div>
              <Label htmlFor="historia">Historia Personal</Label>
              <Textarea
                id="historia"
                value={personaje.historia || ""}
                onChange={(e) => setPersonaje({ ...personaje, historia: e.target.value })}
                placeholder="¿De dónde vienes? ¿Qué te motivó a convertirte en explorador?..."
                className="bg-[#2f3136] border-[#4f545c] text-white min-h-[100px]"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button onClick={pasoAnterior} disabled={paso === 1} variant="secondary">
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
            >
              Siguiente ➡️
            </Button>
          ) : (
            <Button
              onClick={completarCreacion}
              disabled={!personaje.historia}
              className="bg-[#57f287] hover:bg-[#3ba55c] text-black"
            >
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" className="w-4 h-4 mr-2" />
              ¡Crear Personaje!
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
