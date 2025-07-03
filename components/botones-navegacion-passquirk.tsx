"use client"

import { Button } from "@/components/ui/button"
import { EmojiAnimado } from "./emoji-animado"
import { emoji } from "../utils/emojis-animados"
import type { EstadoNavegacion } from "../types/passquirk"

interface BotonesNavegacionPassQuirkProps {
  estadoNavegacion: EstadoNavegacion
  onExplorar: () => void
  onAtras: () => void
  onSiguiente: () => void
  onEstadisticas: () => void
}

export function BotonesNavegacionPassQuirk({
  estadoNavegacion,
  onExplorar,
  onAtras,
  onSiguiente,
  onEstadisticas,
}: BotonesNavegacionPassQuirkProps) {
  const { puedeIrAtras, puedeIrSiguiente, numeroExploracion, totalExploraciones } = estadoNavegacion

  return (
    <div className="bg-[#2f3136] p-4 max-w-2xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center">
        {/* Botón Explorar */}
        <Button onClick={onExplorar} className="bg-[#5865f2] hover:bg-[#4752c4] text-white flex items-center gap-2">
          🔎 Explorar Dimensión
        </Button>

        {/* Botón Atrás */}
        <Button
          onClick={onAtras}
          disabled={!puedeIrAtras}
          variant="secondary"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white disabled:opacity-50 flex items-center gap-2"
        >
          ⬅️ Portal Anterior
        </Button>

        {/* Botón Siguiente */}
        <Button
          onClick={onSiguiente}
          disabled={!puedeIrSiguiente}
          variant="secondary"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white disabled:opacity-50 flex items-center gap-2"
        >
          ➡️ Portal Siguiente
        </Button>

        {/* Botón Contador */}
        <Button onClick={onEstadisticas} className="bg-[#57f287] hover:bg-[#3ba55c] text-black flex items-center gap-2">
          <EmojiAnimado src={emoji("ESTRELLAS", "SPARKLE_STARS")} />
          Exploraciones: {numeroExploracion}
        </Button>
      </div>

      {/* Botones secundarios */}
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimado src={emoji("CELEBRACION", "TADA")} className="w-4 h-4" />
          Analizar Quirk
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          ⚖️ Comparar
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          <EmojiAnimado src={emoji("CORONAS", "VERDE")} className="w-4 h-4" />
          Agregar a Equipo
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-[#4f545c] hover:bg-[#5d6269] text-white border-[#72767d] flex items-center gap-1"
        >
          📤 Compartir
        </Button>
      </div>
    </div>
  )
}
