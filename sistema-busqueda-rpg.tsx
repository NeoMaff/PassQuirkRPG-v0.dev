"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { FiltrosBusquedaComponent } from "./components/filtros-busqueda"
import { TarjetaPersonaje } from "./components/tarjeta-personaje"
import { TarjetaObjeto } from "./components/tarjeta-objeto"
import { personajesMock } from "./data/personajes-mock"
import type { FiltrosBusqueda, ObjetoInventario } from "./types/rpg"
import { Users, Package, Search } from "lucide-react"

const filtrosIniciales: FiltrosBusqueda = {
  nombre: "",
  clase: "",
  nivelMin: 1,
  nivelMax: 100,
  tipoObjeto: "",
  rarezaObjeto: "",
}

export default function SistemaBusquedaRPG() {
  const [filtros, setFiltros] = useState<FiltrosBusqueda>(filtrosIniciales)

  // Filtrar personajes
  const personajesFiltrados = useMemo(() => {
    return personajesMock.filter((personaje) => {
      const coincideNombre = personaje.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      const coincideClase = !filtros.clase || personaje.clase === filtros.clase
      const coincideNivel = personaje.nivel >= filtros.nivelMin && personaje.nivel <= filtros.nivelMax

      return coincideNombre && coincideClase && coincideNivel
    })
  }, [filtros])

  // Obtener todos los objetos únicos del inventario
  const todosLosObjetos = useMemo(() => {
    const objetosMap = new Map<string, ObjetoInventario>()

    personajesMock.forEach((personaje) => {
      personaje.inventario.forEach((objeto) => {
        objetosMap.set(objeto.id, objeto)
      })
    })

    return Array.from(objetosMap.values())
  }, [])

  // Filtrar objetos
  const objetosFiltrados = useMemo(() => {
    return todosLosObjetos.filter((objeto) => {
      const coincideNombre = objeto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      const coincideTipo = !filtros.tipoObjeto || objeto.tipo === filtros.tipoObjeto
      const coincideRareza = !filtros.rarezaObjeto || objeto.rareza === filtros.rarezaObjeto
      const coincideNivel = objeto.nivel >= filtros.nivelMin && objeto.nivel <= filtros.nivelMax

      return coincideNombre && coincideTipo && coincideRareza && coincideNivel
    })
  }, [filtros, todosLosObjetos])

  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sistema de Búsqueda RPG</h1>
          <p className="text-slate-300">Explora personajes, estadísticas y objetos del inventario</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Panel de filtros */}
          <div className="lg:col-span-1">
            <FiltrosBusquedaComponent
              filtros={filtros}
              onFiltrosChange={setFiltros}
              onLimpiarFiltros={limpiarFiltros}
            />
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personajes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="personajes" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Personajes ({personajesFiltrados.length})
                </TabsTrigger>
                <TabsTrigger value="objetos" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Objetos ({objetosFiltrados.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personajes" className="space-y-4">
                {personajesFiltrados.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Search className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No se encontraron personajes</h3>
                      <p className="text-muted-foreground text-center">
                        Intenta ajustar los filtros de búsqueda para encontrar más resultados.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {personajesFiltrados.map((personaje) => (
                      <TarjetaPersonaje key={personaje.id} personaje={personaje} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="objetos" className="space-y-4">
                {objetosFiltrados.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Search className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No se encontraron objetos</h3>
                      <p className="text-muted-foreground text-center">
                        Intenta ajustar los filtros de búsqueda para encontrar más resultados.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {objetosFiltrados.map((objeto) => (
                      <TarjetaObjeto key={objeto.id} objeto={objeto} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
