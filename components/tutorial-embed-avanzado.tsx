import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"
import type { SeccionTutorialAvanzada } from "../types/tutorial-avanzado"

interface TutorialEmbedAvanzadoProps {
  seccion: SeccionTutorialAvanzada
  progreso: number
  numeroSeccion: number
  totalSecciones: number
}

const coloresPorTipo = {
  introduccion: "#9B59B6",
  creacion_personaje: "#E67E22",
  combate: "#E74C3C",
  exploracion: "#27AE60",
  final: "#F1C40F",
}

export function TutorialEmbedAvanzado({
  seccion,
  progreso,
  numeroSeccion,
  totalSecciones,
}: TutorialEmbedAvanzadoProps) {
  const colorSeccion = coloresPorTipo[seccion.tipo]

  return (
    <div className="bg-[#2f3136] p-4 max-w-4xl mx-auto">
      <Card
        className="bg-[#36393f] border-l-4 border-r-0 border-t-0 border-b-0 rounded-none rounded-r-md p-6 text-white"
        style={{ borderLeftColor: colorSeccion }}
      >
        {/* Header Principal */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
              <h1 className="text-3xl font-bold text-white">Tutorial PassQuirk RPG</h1>
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" />
              <span className="text-[#b9bbbe] text-lg">Guiado por El Sabio</span>
              <Badge variant="outline" className="text-sm" style={{ borderColor: colorSeccion, color: colorSeccion }}>
                Sección {numeroSeccion}/{totalSecciones}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#b9bbbe]">Progreso del Tutorial</span>
                <span className="text-sm text-white font-medium">{Math.round(progreso)}%</span>
              </div>
              <Progress value={progreso} className="h-3" />
            </div>
          </div>

          {/* Video o Imagen */}
          <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-700 flex-shrink-0 ml-6">
            {seccion.video ? (
              <video src={seccion.video} autoPlay loop muted className="w-full h-full object-cover" />
            ) : seccion.imagen ? (
              <img
                src={seccion.imagen || "/placeholder.svg"}
                alt={`Imagen de ${seccion.titulo}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <EmojiAnimadoTutorial src={seccion.emoji} className="w-16 h-16" />
              </div>
            )}
          </div>
        </div>

        {/* Título de la Sección */}
        <div className="mb-6 p-5 bg-[#2f3136] rounded-lg border-l-4" style={{ borderLeftColor: colorSeccion }}>
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
            <EmojiAnimadoTutorial src={seccion.emoji} className="w-8 h-8" />
            {seccion.titulo}
          </h2>
          <p className="text-[#b9bbbe] text-lg leading-relaxed">{seccion.descripcion}</p>
        </div>

        {/* Contenido Principal */}
        <div className="space-y-4 mb-6">
          {seccion.contenido.map((parrafo, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-[#2f3136] rounded-md">
              <EmojiAnimadoTutorial
                src="https://cdn3.emoji.gg/emojis/5267-green-sparkles.gif"
                className="w-5 h-5 mt-1 flex-shrink-0"
              />
              <p className="text-white text-base leading-relaxed">{parrafo}</p>
            </div>
          ))}
        </div>

        {/* Información Especial por Tipo */}
        {seccion.tipo === "combate" && seccion.id === "combate_tutorial" && (
          <div className="mb-6 p-5 bg-[#2f3136] rounded-lg">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/42684-star-r.gif" />
              Estadísticas del Slime Tutorial
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">🟢</span>
                  <span className="text-[#b9bbbe]">Nombre:</span>
                  <span className="text-white font-medium">Slime de Entrenamiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❤️</span>
                  <span className="text-[#b9bbbe]">HP:</span>
                  <span className="text-white font-medium">30/30</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-[#b9bbbe]">Nivel:</span>
                  <span className="text-white font-medium">1</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">⚡</span>
                  <span className="text-[#b9bbbe]">Habilidad:</span>
                  <span className="text-white font-medium">Salto Pegajoso</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">🎯</span>
                  <span className="text-[#b9bbbe]">Debilidad:</span>
                  <span className="text-white font-medium">Ataques Físicos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">💎</span>
                  <span className="text-[#b9bbbe]">Recompensa:</span>
                  <span className="text-white font-medium">15 XP + Poción</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-[#72767d] pt-4 border-t border-[#4f545c]">
          <div className="flex items-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" className="w-4 h-4" />
            <span>PassQuirk RPG Tutorial System v3.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Tipo: {seccion.tipo.replace("_", " ").toUpperCase()}</span>
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </div>
  )
}
