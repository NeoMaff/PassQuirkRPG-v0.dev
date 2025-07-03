"use client"

import { Button } from "@/components/ui/button"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"

interface BotonesTutorialProps {
  seccionActual: number
  totalSecciones: number
  onAnterior: () => void
  onSiguiente: () => void
  onIniciarAventura: () => void
  onCrearPersonaje: () => void
  onCombatePractica: () => void
  mostrarIniciarAventura: boolean
}

export function BotonesTutorial({
  seccionActual,
  totalSecciones,
  onAnterior,
  onSiguiente,
  onIniciarAventura,
  onCrearPersonaje,
  onCombatePractica,
  mostrarIniciarAventura,
}: BotonesTutorialProps) {
  return (
    <div className="bg-[#2f3136] p-4 max-w-3xl mx-auto">
      {/* Botones principales de navegación */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <Button
          onClick={onAnterior}
          disabled={seccionActual === 0}
          variant="secondary"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white disabled:opacity-50"
        >
          ⬅️ Anterior
        </Button>

        <Button
          onClick={onSiguiente}
          disabled={seccionActual >= totalSecciones - 1}
          className="bg-[#5865f2] hover:bg-[#4752c4] text-white"
        >
          Siguiente ➡️
        </Button>

        {mostrarIniciarAventura && (
          <Button
            onClick={onIniciarAventura}
            className="bg-[#fcd34d] hover:bg-[#f59e0b] text-black font-semibold flex items-center gap-2"
          >
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-5 h-5" />
            ¡Iniciar Aventura!
          </Button>
        )}
      </div>

      {/* Botones de acciones específicas */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={onCrearPersonaje}
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" className="w-4 h-4" />
          Crear Personaje
        </Button>

        <Button
          onClick={onCombatePractica}
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-4 h-4" />
          Combate de Práctica
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-4 h-4" />
          Ayuda
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif" className="w-4 h-4" />
          Explorar Reinos
        </Button>
      </div>
    </div>
  )
}
