import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Personaje } from "../types/rpg"
import { Sword, Shield, Heart, Zap, User, Target } from "lucide-react"

interface TarjetaPersonajeProps {
  personaje: Personaje
}

const coloresClase = {
  Guerrero: "bg-red-500",
  Mago: "bg-blue-500",
  Arquero: "bg-green-500",
  Sanador: "bg-yellow-500",
  Asesino: "bg-purple-500",
}

export function TarjetaPersonaje({ personaje }: TarjetaPersonajeProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{personaje.nombre}</CardTitle>
          <Badge className={`${coloresClase[personaje.clase]} text-white`}>{personaje.clase}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Nivel {personaje.nivel}</span>
          <span>•</span>
          <span>{personaje.experiencia.toLocaleString()} XP</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">Vida: {personaje.estadisticas.vida}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Maná: {personaje.estadisticas.mana}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sword className="w-4 h-4 text-orange-500" />
              <span className="text-sm">Fuerza: {personaje.estadisticas.fuerza}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm">Agilidad: {personaje.estadisticas.agilidad}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Inteligencia: {personaje.estadisticas.inteligencia}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Defensa: {personaje.estadisticas.defensa}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Inventario ({personaje.inventario.length} objetos)</h4>
          <div className="flex flex-wrap gap-1">
            {personaje.inventario.slice(0, 3).map((objeto) => (
              <Badge key={objeto.id} variant="outline" className="text-xs">
                {objeto.nombre}
              </Badge>
            ))}
            {personaje.inventario.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{personaje.inventario.length - 3} más
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
