"use client"

import { useState } from "react"
import { DiscordEmbedPassQuirk } from "./components/discord-embed-passquirk"
import { BotonesNavegacionPassQuirk } from "./components/botones-navegacion-passquirk"
import { exploradoresMock } from "./data/exploradores-mock"
import type { SesionExploracion, EstadoNavegacion } from "./types/passquirk"
import { EmojiAnimado } from "./components/emoji-animado"
import { emoji } from "./utils/emojis-animados"

export default function SistemaBusquedaPassQuirkPreview() {
  const [sesion, setSesion] = useState<SesionExploracion>({
    historial: [exploradoresMock[0]], // Comenzar con el primer explorador
    indiceActual: 0,
    contadorExploraciones: 1,
  })

  const exploradorActual = sesion.historial[sesion.indiceActual]

  const estadoNavegacion: EstadoNavegacion = {
    puedeIrAtras: sesion.indiceActual > 0,
    puedeIrSiguiente: sesion.indiceActual < sesion.historial.length - 1,
    numeroExploracion: sesion.contadorExploraciones,
    totalExploraciones: sesion.historial.length,
  }

  const explorarNuevo = () => {
    // Seleccionar un explorador aleatorio
    const exploradorAleatorio = exploradoresMock[Math.floor(Math.random() * exploradoresMock.length)]

    setSesion((prev) => {
      const nuevoHistorial = [...prev.historial.slice(0, prev.indiceActual + 1), exploradorAleatorio]
      return {
        historial: nuevoHistorial,
        indiceActual: nuevoHistorial.length - 1,
        contadorExploraciones: prev.contadorExploraciones + 1,
      }
    })
  }

  const navegarAtras = () => {
    if (sesion.indiceActual > 0) {
      setSesion((prev) => ({
        ...prev,
        indiceActual: prev.indiceActual - 1,
      }))
    }
  }

  const navegarSiguiente = () => {
    if (sesion.indiceActual < sesion.historial.length - 1) {
      setSesion((prev) => ({
        ...prev,
        indiceActual: prev.indiceActual + 1,
      }))
    }
  }

  const mostrarEstadisticas = () => {
    alert(`Estadísticas de Exploración:
    
🔍 Total de exploraciones: ${sesion.contadorExploraciones}
📊 Exploradores únicos encontrados: ${new Set(sesion.historial.map((e) => e.id)).size}
🎯 Exploración actual: #${sesion.contadorExploraciones}
📜 Posición en historial: ${sesion.indiceActual + 1}/${sesion.historial.length}
    
¡La exploración puede continuar indefinidamente!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <EmojiAnimado src={emoji("ESTRELLAS", "SPARKLE_STARS")} className="w-8 h-8" />
            Sistema de Búsqueda PassQuirk RPG
            <EmojiAnimado src={emoji("ESTRELLAS", "SPARKLE_STARS")} className="w-8 h-8" />
          </h1>
          <p className="text-slate-300 flex items-center justify-center gap-2">
            <EmojiAnimado src={emoji("ELEMENTOS", "FUEGO_VERDE")} />
            Explora dimensiones y descubre exploradores únicos con sus Quirks
            <EmojiAnimado src={emoji("ELEMENTOS", "FUEGO_VERDE")} />
          </p>
        </div>

        {/* Embed Principal */}
        <DiscordEmbedPassQuirk explorador={exploradorActual} numeroExploracion={sesion.contadorExploraciones} />

        {/* Botones de Navegación */}
        <BotonesNavegacionPassQuirk
          estadoNavegacion={estadoNavegacion}
          onExplorar={explorarNuevo}
          onAtras={navegarAtras}
          onSiguiente={navegarSiguiente}
          onEstadisticas={mostrarEstadisticas}
        />

        {/* Información del Sistema */}
        <div className="bg-[#36393f] rounded-lg p-6 text-white max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <EmojiAnimado src={emoji("CELEBRACION", "GG")} />
            Características del Sistema de Exploración Infinita
          </h3>
          <div className="space-y-3 text-sm text-[#b9bbbe]">
            <div className="flex items-start gap-2">
              <EmojiAnimado src={emoji("ESTRELLAS", "SPARKLE_STARS")} />
              <span>
                <strong>Exploración Infinita:</strong> El botón "Explorar Dimensión" puede ser presionado
                indefinidamente
              </span>
            </div>
            <div className="flex items-start gap-2">
              <EmojiAnimado src={emoji("CORONAS", "VERDE")} />
              <span>
                <strong>Historial Persistente:</strong> Cada exploración se guarda en el historial de navegación
              </span>
            </div>
            <div className="flex items-start gap-2">
              <EmojiAnimado src={emoji("ELEMENTOS", "FUEGO_VERDE")} />
              <span>
                <strong>Navegación Bidireccional:</strong> Usa "Portal Anterior" y "Portal Siguiente" para navegar
              </span>
            </div>
            <div className="flex items-start gap-2">
              <EmojiAnimado src={emoji("CELEBRACION", "TADA")} />
              <span>
                <strong>Contador Incremental:</strong> Cada exploración incrementa un contador único
              </span>
            </div>
            <div className="flex items-start gap-2">
              <EmojiAnimado src={emoji("ESTRELLAS", "AMARILLA")} />
              <span>
                <strong>Emojis Animados:</strong> Todos los emojis son animados de PassQuirkRPG
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
