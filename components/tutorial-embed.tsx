import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"
import type { SeccionTutorial } from "../types/tutorial"

interface TutorialEmbedProps {
  seccion: SeccionTutorial
  progreso: number
  numeroSeccion: number
  totalSecciones: number
}

export function TutorialEmbed({ seccion, progreso, numeroSeccion, totalSecciones }: TutorialEmbedProps) {
  return (
    <div className="bg-[#2f3136] p-4 max-w-3xl mx-auto">
      <Card className="bg-[#36393f] border-l-4 border-l-[#9B59B6] border-r-0 border-t-0 border-b-0 rounded-none rounded-r-md p-6 text-white">
        {/* Header con imagen del sabio */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-white">Tutorial PassQuirk RPG</h1>
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" />
              <span className="text-[#b9bbbe]">Guiado por ElSabio</span>
              <Badge variant="outline" className="text-xs">
                Sección {numeroSeccion}/{totalSecciones}
              </Badge>
            </div>
            <Progress value={progreso} className="mb-4" />
          </div>
          <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-700 flex-shrink-0 ml-4">
            <img src="/tutorial-sabio.png" alt="ElSabio - Guía del Tutorial" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Título de la sección actual */}
        <div className="mb-6 p-4 bg-[#2f3136] rounded-md">
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
            <EmojiAnimadoTutorial src={seccion.emoji} className="w-7 h-7" />
            {seccion.titulo}
          </h2>
          <p className="text-[#b9bbbe] text-sm">{seccion.descripcion}</p>
        </div>

        {/* Contenido de la sección */}
        <div className="space-y-4 mb-6">
          {seccion.contenido.map((parrafo, index) => (
            <div key={index} className="flex items-start gap-3">
              <EmojiAnimadoTutorial
                src="https://cdn3.emoji.gg/emojis/5267-green-sparkles.gif"
                className="w-5 h-5 mt-1"
              />
              <p className="text-white text-sm leading-relaxed">{parrafo}</p>
            </div>
          ))}
        </div>

        {/* Información adicional según la sección */}
        {seccion.id === "reinos" && (
          <div className="mb-6 p-4 bg-[#2f3136] rounded-md">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif" />
              Detalles de los Reinos
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">🔴</span>
                  <span className="text-white font-medium">Reino de Akai</span>
                </div>
                <p className="text-[#b9bbbe] text-xs">
                  Territorio montañoso y volcánico. Sociedad basada en la fuerza.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">🟢</span>
                  <span className="text-white font-medium">Reino de Say</span>
                </div>
                <p className="text-[#b9bbbe] text-xs">Bosques encantados. Sistema de castas por conocimiento mágico.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🟡</span>
                  <span className="text-white font-medium">Reino de Masai</span>
                </div>
                <p className="text-[#b9bbbe] text-xs">Regiones desérticas. Economía de gremios y casas nobles.</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-[#72767d] pt-4 border-t border-[#4f545c]">
          <div className="flex items-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" className="w-4 h-4" />
            <span>PassQuirk RPG Tutorial v3.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Progreso: {Math.round(progreso)}%</span>
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </div>
  )
}
