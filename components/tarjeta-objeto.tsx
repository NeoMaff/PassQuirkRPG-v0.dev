import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ObjetoInventario } from "../types/rpg"
import { Sword, Shield, Heart, Zap, Star } from "lucide-react"

interface TarjetaObjetoProps {
  objeto: ObjetoInventario
}

const coloresRareza = {
  Común: "bg-gray-500",
  "Poco Común": "bg-green-500",
  Raro: "bg-blue-500",
  Épico: "bg-purple-500",
  Legendario: "bg-orange-500",
}

const iconosTipo = {
  Arma: Sword,
  Armadura: Shield,
  Poción: Heart,
  Accesorio: Star,
  Material: Star,
}

export function TarjetaObjeto({ objeto }: TarjetaObjetoProps) {
  const IconoTipo = iconosTipo[objeto.tipo]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <IconoTipo className="w-5 h-5" />
            {objeto.nombre}
          </CardTitle>
          <Badge className={`${coloresRareza[objeto.rareza]} text-white`}>{objeto.rareza}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Nivel {objeto.nivel}</span>
          <span>•</span>
          <span>{objeto.precio} oro</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{objeto.descripcion}</p>

        {objeto.estadisticas && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Estadísticas:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {objeto.estadisticas.ataque && (
                <div className="flex items-center gap-2">
                  <Sword className="w-4 h-4 text-red-500" />
                  <span>Ataque: +{objeto.estadisticas.ataque}</span>
                </div>
              )}
              {objeto.estadisticas.defensa && (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Defensa: +{objeto.estadisticas.defensa}</span>
                </div>
              )}
              {objeto.estadisticas.vida && (
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-500" />
                  <span>Vida: +{objeto.estadisticas.vida}</span>
                </div>
              )}
              {objeto.estadisticas.mana && (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span>Maná: +{objeto.estadisticas.mana}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <Badge variant="outline">{objeto.tipo}</Badge>
      </CardContent>
    </Card>
  )
}
