"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { FiltrosBusqueda } from "../types/rpg"
import { Search, RotateCcw } from "lucide-react"

interface FiltrosBusquedaProps {
  filtros: FiltrosBusqueda
  onFiltrosChange: (filtros: FiltrosBusqueda) => void
  onLimpiarFiltros: () => void
}

export function FiltrosBusquedaComponent({ filtros, onFiltrosChange, onLimpiarFiltros }: FiltrosBusquedaProps) {
  const actualizarFiltro = (campo: keyof FiltrosBusqueda, valor: string | number) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Filtros de Búsqueda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Buscar por nombre</Label>
          <Input
            id="nombre"
            placeholder="Nombre del personaje u objeto..."
            value={filtros.nombre}
            onChange={(e) => actualizarFiltro("nombre", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Clase de Personaje</Label>
          <Select value={filtros.clase} onValueChange={(valor) => actualizarFiltro("clase", valor)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las clases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las clases</SelectItem>
              <SelectItem value="Guerrero">Guerrero</SelectItem>
              <SelectItem value="Mago">Mago</SelectItem>
              <SelectItem value="Arquero">Arquero</SelectItem>
              <SelectItem value="Sanador">Sanador</SelectItem>
              <SelectItem value="Asesino">Asesino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nivelMin">Nivel mínimo</Label>
            <Input
              id="nivelMin"
              type="number"
              min="1"
              max="100"
              value={filtros.nivelMin}
              onChange={(e) => actualizarFiltro("nivelMin", Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nivelMax">Nivel máximo</Label>
            <Input
              id="nivelMax"
              type="number"
              min="1"
              max="100"
              value={filtros.nivelMax}
              onChange={(e) => actualizarFiltro("nivelMax", Number.parseInt(e.target.value) || 100)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tipo de Objeto</Label>
          <Select value={filtros.tipoObjeto} onValueChange={(valor) => actualizarFiltro("tipoObjeto", valor)}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="Arma">Arma</SelectItem>
              <SelectItem value="Armadura">Armadura</SelectItem>
              <SelectItem value="Poción">Poción</SelectItem>
              <SelectItem value="Accesorio">Accesorio</SelectItem>
              <SelectItem value="Material">Material</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Rareza de Objeto</Label>
          <Select value={filtros.rarezaObjeto} onValueChange={(valor) => actualizarFiltro("rarezaObjeto", valor)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las rarezas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las rarezas</SelectItem>
              <SelectItem value="Común">Común</SelectItem>
              <SelectItem value="Poco Común">Poco Común</SelectItem>
              <SelectItem value="Raro">Raro</SelectItem>
              <SelectItem value="Épico">Épico</SelectItem>
              <SelectItem value="Legendario">Legendario</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onLimpiarFiltros} variant="outline" className="w-full bg-transparent">
          <RotateCcw className="w-4 h-4 mr-2" />
          Limpiar Filtros
        </Button>
      </CardContent>
    </Card>
  )
}
