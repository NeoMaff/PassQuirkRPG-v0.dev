"use client"

import { DiscordEmbedReplica } from "./components/discord-embed-replica"
import { perfilMock } from "./data/perfil-mock"

export default function DiscordEmbedShowcase() {
  return (
    <div className="min-h-screen bg-[#36393f] flex items-center justify-center p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Discord Embed RPG</h1>
          <p className="text-gray-400">Réplica exacta del diseño de perfil de jugador</p>
        </div>

        <DiscordEmbedReplica perfil={perfilMock} />

        <div className="text-center text-sm text-gray-500 max-w-md">
          <p>
            Esta es una réplica exacta del embed de Discord mostrado en la imagen de referencia, incluyendo colores,
            iconos, estructura y contenido.
          </p>
        </div>
      </div>
    </div>
  )
}
