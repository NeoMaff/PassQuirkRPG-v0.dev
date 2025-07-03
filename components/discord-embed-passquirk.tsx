import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmojiAnimado } from "./emoji-animado"
import type { ExploradorPassQuirk } from "../types/passquirk"
import { emoji, obtenerEmojiClaseAnimado } from "../utils/emojis-animados"

interface DiscordEmbedPassQuirkProps {
  explorador: ExploradorPassQuirk
  numeroExploracion: number
  tipo?: "unico" | "multiple" | "sin_resultados"
}

const coloresClase = {
  Guerrero: "#C0392B",
  Mago: "#8E44AD",
  Arquero: "#27AE60",
  Sanador: "#F39C12",
  Asesino: "#2C3E50",
  Tanque: "#34495E",
  Berserker: "#E74C3C",
}

export function DiscordEmbedPassQuirk({ explorador, numeroExploracion, tipo = "unico" }: DiscordEmbedPassQuirkProps) {
  const emojiSparkles = emoji("ESTRELLAS", "SPARKLE_STARS")
  const emojiFuego = emoji("ELEMENTOS", "FUEGO_VERDE")
  const emojiCorona = emoji("CORONAS", "VERDE")
  const emojiTada = emoji("CELEBRACION", "TADA")
  const emojiGG = emoji("CELEBRACION", "GG")
  const emojiClase = obtenerEmojiClaseAnimado(explorador.clase)

  return (
    <div className="bg-[#2f3136] p-4 max-w-2xl mx-auto">
      <Card
        className="bg-[#36393f] border-l-4 border-r-0 border-t-0 border-b-0 rounded-none rounded-r-md p-6 text-white"
        style={{ borderLeftColor: coloresClase[explorador.clase] }}
      >
        {/* Header con título y emojis animados */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-white font-semibold text-xl mb-2 flex items-center gap-2">
              <EmojiAnimado src={emojiSparkles} />
              {explorador.nombre} - Explorador de PassQuirk
              <EmojiAnimado src={emojiSparkles} />
            </h2>
            <div className="text-sm text-[#b9bbbe] space-y-1">
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiFuego} />
                <span>
                  **Clase:** {explorador.clase} | **Nivel:** {explorador.nivel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiSparkles} />
                <span>
                  **Exploración #{numeroExploracion}** | **Quirk:** {explorador.quirk}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiCorona} />
                <span>
                  **Poder Total:** {explorador.poderTotal.toLocaleString()} | **Reino:** {explorador.reino}
                </span>
              </div>
            </div>
          </div>
          <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-700 flex-shrink-0 ml-4">
            <img
              src={explorador.avatar || "/placeholder.svg"}
              alt={`Avatar de ${explorador.nombre}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Estadísticas del Quirk */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <h4 className="text-white font-medium flex items-center gap-2">
              <EmojiAnimado src={emoji("ESTRELLAS", "SPARKLES_VERDE")} />
              Estadísticas del Quirk
            </h4>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "PURPURA")} />
                <span className="text-[#b9bbbe]">Vida:</span>
                <span className="text-white font-medium">
                  {explorador.estadisticas.vida}/{explorador.estadisticas.vidaMaxima}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "AZUL")} />
                <span className="text-[#b9bbbe]">Maná:</span>
                <span className="text-white font-medium">
                  {explorador.estadisticas.mana}/{explorador.estadisticas.manaMaximo}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "AMARILLA")} />
                <span className="text-[#b9bbbe]">Energía Quirk:</span>
                <span className="text-white font-medium">{explorador.estadisticas.energiaQuirk}/100</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-medium flex items-center gap-2">
              <EmojiAnimado src={emojiFuego} />
              Atributos de Combate
            </h4>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "ROJA")} />
                <span className="text-[#b9bbbe]">Fuerza:</span>
                <span className="text-white font-medium">{explorador.estadisticas.fuerza}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "GENERICA")} />
                <span className="text-[#b9bbbe]">Agilidad:</span>
                <span className="text-white font-medium">{explorador.estadisticas.agilidad}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "PURPURA")} />
                <span className="text-[#b9bbbe]">Crítico:</span>
                <span className="text-white font-medium">{explorador.estadisticas.critico}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-medium flex items-center gap-2">
              <EmojiAnimado src={emojiCorona} />
              Poder Dimensional
            </h4>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "AZUL")} />
                <span className="text-[#b9bbbe]">Inteligencia:</span>
                <span className="text-white font-medium">{explorador.estadisticas.inteligencia}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "GENERICA")} />
                <span className="text-[#b9bbbe]">Defensa:</span>
                <span className="text-white font-medium">{explorador.estadisticas.defensa}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "SPARKLES_VERDE")} />
                <span className="text-[#b9bbbe]">Resistencia Quirk:</span>
                <span className="text-white font-medium">{explorador.estadisticas.resistenciaQuirk}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del Quirk */}
        <div className="mb-6 p-4 bg-[#2f3136] rounded-md">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <EmojiAnimado src={emojiTada} />
            Quirk: {explorador.quirkInfo.nombre}
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "SPARKLES_VERDE")} />
                <span className="text-[#b9bbbe]">Tipo:</span>
                <span className="text-white font-medium">{explorador.quirkInfo.tipo}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiFuego} />
                <span className="text-[#b9bbbe]">Poder:</span>
                <span className="text-white font-medium">{explorador.quirkInfo.nivelPoder}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiCorona} />
                <span className="text-[#b9bbbe]">Rareza:</span>
                <Badge variant="outline" className="text-xs">
                  {explorador.quirkInfo.rareza}
                </Badge>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-2">
                <EmojiAnimado src={emojiSparkles} />
                <div>
                  <span className="text-[#b9bbbe]">Descripción:</span>
                  <p className="text-white text-xs mt-1">{explorador.quirkInfo.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-2">
              <EmojiAnimado src={emoji("CELEBRACION", "REGALO_NAVIDAD")} />
              <span className="text-[#b9bbbe] text-sm">Habilidades:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {explorador.quirkInfo.habilidades.map((habilidad, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {habilidad}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Ubicación Dimensional */}
        <div className="mb-6 p-4 bg-[#2f3136] rounded-md">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <EmojiAnimado src={emoji("ELEMENTOS", "TIERRA_MINECRAFT")} />
            Ubicación en el Multiverso PassQuirk
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiCorona} />
                <span className="text-[#b9bbbe]">Reino Actual:</span>
                <span className="text-white font-medium">{explorador.ubicacionDimensional.reino}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiSparkles} />
                <span className="text-[#b9bbbe]">Zona/Región:</span>
                <span className="text-white font-medium">{explorador.ubicacionDimensional.zona}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emojiFuego} />
                <span className="text-[#b9bbbe]">Coordenadas:</span>
                <span className="text-white font-medium text-xs">{explorador.ubicacionDimensional.coordenadas}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "AMARILLA")} />
                <span className="text-[#b9bbbe]">Portal de Acceso:</span>
                <span className="text-white font-medium">{explorador.ubicacionDimensional.portalAcceso}</span>
              </div>
              <div className="flex items-center gap-2">
                <EmojiAnimado src={emoji("ESTRELLAS", "PURPURA")} />
                <span className="text-[#b9bbbe]">Tiempo en Reino:</span>
                <span className="text-white font-medium">{explorador.ubicacionDimensional.tiempoEnReino}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-xs text-[#72767d] pt-4 border-t border-[#4f545c]">
          <EmojiAnimado src={emojiGG} />
          <span>ID: {explorador.id}</span>
          <span>•</span>
          <span>Exploración #{numeroExploracion}</span>
          <span>•</span>
          <span>PassQuirk RPG v3.0</span>
          <span>•</span>
          <span>Última actividad: {explorador.ultimaActividad}</span>
        </div>
      </Card>
    </div>
  )
}
