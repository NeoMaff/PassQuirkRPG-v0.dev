"use client"

import { Button } from "@/components/ui/button"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"

interface BotonesTutorialAvanzadoProps {
  seccionActual: number
  totalSecciones: number
  tipoSeccionActual: string
  onAnterior: () => void
  onSiguiente: () => void
  onCrearPersonaje: () => void
  onIniciarCombate: () => void
  onCompletarTutorial: () => void
  personajeCreado: boolean
  combateCompletado: boolean
  mostrarCompletarTutorial: boolean
}

export function BotonesTutorialAvanzado({
  seccionActual,
  totalSecciones,
  tipoSeccionActual,
  onAnterior,
  onSiguiente,
  onCrearPersonaje,
  onIniciarCombate,
  onCompletarTutorial,
  personajeCreado,
  combateCompletado,
  mostrarCompletarTutorial,
}: BotonesTutorialAvanzadoProps) {
  return (
    <div className="bg-[#2f3136] p-4 max-w-4xl mx-auto">
      {/* Botones Principales de Navegación */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <Button
          onClick={onAnterior}
          disabled={seccionActual === 0}
          variant="secondary"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white disabled:opacity-50 flex items-center gap-2"
        >
          ⬅️ Previous
        </Button>

        <Button
          onClick={onSiguiente}
          disabled={seccionActual >= totalSecciones - 1}
          className="bg-[#5865f2] hover:bg-[#4752c4] text-white flex items-center gap-2"
        >
          Next ➡️
        </Button>

        {mostrarCompletarTutorial && (
          <Button
            onClick={onCompletarTutorial}
            className="bg-[#fcd34d] hover:bg-[#f59e0b] text-black font-bold flex items-center gap-2"
          >
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-5 h-5" />
            ¡Complete Tutorial!
          </Button>
        )}
      </div>

      {/* Botones Específicos por Sección */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tipoSeccionActual === "creacion_personaje" && (
          <Button
            onClick={onCrearPersonaje}
            className={`${
              personajeCreado
                ? "bg-[#57f287] hover:bg-[#3ba55c] text-black"
                : "bg-[#e67e22] hover:bg-[#d35400] text-white"
            } font-semibold flex items-center gap-2`}
          >
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" className="w-5 h-5" />
            {personajeCreado ? "✅ Character Created" : "Create Character"}
          </Button>
        )}

        {tipoSeccionActual === "combate" && (
          <Button
            onClick={onIniciarCombate}
            disabled={!personajeCreado}
            className={`${
              combateCompletado
                ? "bg-[#57f287] hover:bg-[#3ba55c] text-black"
                : "bg-[#e74c3c] hover:bg-[#c0392b] text-white"
            } font-semibold flex items-center gap-2`}
          >
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-5 h-5" />
            {combateCompletado ? "✅ Battle Won" : "Start Battle"}
          </Button>
        )}

        {/* Botones de Ayuda y Utilidades */}
        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-4 h-4" />
          Help
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif" className="w-4 h-4" />
          World Info
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" className="w-4 h-4" />
          Progress
        </Button>
      </div>

      {/* Indicadores de Estado */}
      <div className="flex flex-wrap gap-2 justify-center mt-3 text-sm">
        <div className={`px-3 py-1 rounded-full ${personajeCreado ? "bg-green-600" : "bg-gray-600"} text-white`}>
          {personajeCreado ? "✅" : "⏳"} Character: {personajeCreado ? "Created" : "Pending"}
        </div>
        <div className={`px-3 py-1 rounded-full ${combateCompletado ? "bg-green-600" : "bg-gray-600"} text-white`}>
          {combateCompletado ? "⚔️" : "⏳"} Combat: {combateCompletado ? "Completed" : "Pending"}
        </div>
      </div>
    </div>
  )
}
