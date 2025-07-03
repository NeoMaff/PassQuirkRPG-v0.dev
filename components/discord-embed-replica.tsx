import { Card } from "@/components/ui/card"
import type { PerfilJugador } from "../types/discord-embed"

interface DiscordEmbedReplicaProps {
  perfil: PerfilJugador
}

export function DiscordEmbedReplica({ perfil }: DiscordEmbedReplicaProps) {
  return (
    <div className="bg-[#2f3136] p-4 max-w-md">
      <Card className="bg-[#36393f] border-l-4 border-l-[#5865f2] border-r-0 border-t-0 border-b-0 rounded-none rounded-r-md p-4 text-white">
        {/* Header con título e imagen */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#5865f2] text-lg">🏝️</span>
            <h2 className="text-white font-semibold text-lg">{perfil.nombre}</h2>
          </div>
          <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-700 flex-shrink-0">
            <img src="/island-thumbnail.png" alt="Island thumbnail" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Información principal en dos columnas */}
        <div className="grid grid-cols-2 gap-x-6 mb-4 text-sm">
          {/* Columna izquierda */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white font-medium">Stats:</span>
              <span className="text-yellow-400">⭐</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">🪙</span>
              <span className="text-[#b9bbbe]">Coins:</span>
              <span className="text-white font-medium">{perfil.monedas}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">💎</span>
              <span className="text-[#b9bbbe]">Emeralds:</span>
              <span className="text-white font-medium">{perfil.esmeraldas}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">🛡️</span>
              <span className="text-[#b9bbbe]">Class:</span>
              <span className="text-white font-medium">
                {perfil.clase} [{perfil.tier}]
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brown-400">🏹</span>
              <span className="text-[#b9bbbe]">Bow:</span>
              <span className="text-white font-medium">{perfil.arco}</span>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-red-400">⏰</span>
              <span className="text-[#b9bbbe]">Created At:</span>
              <span className="text-white font-medium">{perfil.fechaCreacion}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">🏆</span>
              <span className="text-[#b9bbbe]">Guild:</span>
              <span className="text-white font-medium">{perfil.gremio}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">⚔️</span>
              <span className="text-[#b9bbbe]">Armor:</span>
              <span className="text-white font-medium">{perfil.armadura}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400">🗡️</span>
              <span className="text-[#b9bbbe]">Sword:</span>
              <span className="text-white font-medium">{perfil.espada}</span>
            </div>
          </div>
        </div>

        {/* Sección de Minions */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-400">⚒️</span>
            <span className="text-white font-medium underline">Minions: (4/6)</span>
          </div>
          <div className="space-y-1 text-sm">
            {perfil.minions.map((minion, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-gray-400">{minion.icono}</span>
                <span className="text-[#b9bbbe]">{minion.nombre}</span>
                <span className="text-yellow-400">🪙</span>
                <span className="text-white font-medium">{minion.gananciasPorSegundo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-xs text-[#72767d] pt-2 border-t border-[#4f545c]">
          <span className="text-[#5865f2]">🏝️</span>
          <span>Odino#{perfil.usuarioId}</span>
          <span>•</span>
          <span>{perfil.servidor}</span>
          <span>•</span>
          <span>{perfil.timestamp}</span>
        </div>
      </Card>
    </div>
  )
}
