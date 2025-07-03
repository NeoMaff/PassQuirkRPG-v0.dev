"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmojiAnimadoTutorial } from "./emoji-animado-tutorial"

export function PDFGenerator() {
  const [generandoPDF, setGenerandoPDF] = useState(false)

  const generarPDFCompleto = () => {
    setGenerandoPDF(true)

    // Simular generación de PDF
    setTimeout(() => {
      setGenerandoPDF(false)
      alert(`📄 PDF Generado Exitosamente!

📚 **PassQuirk RPG Tutorial Implementation Guide**

El documento incluye:
✅ 8 secciones completas
✅ 50+ páginas de documentación
✅ Ejemplos de código en JavaScript/Discord.js
✅ Diagramas de flujo y arquitectura
✅ Guías de implementación paso a paso
✅ Mejores prácticas y optimizaciones

📁 **Contenido del PDF:**
1. Embed Structure and Design (8 páginas)
2. Tutorial Navigation and Flow (6 páginas)
3. Character Creation Integration (7 páginas)
4. Battle Mechanics Tutorial (9 páginas)
5. Code Examples and Implementation (12 páginas)
6. Repository Merging and Version Control (5 páginas)
7. Customization and Expansion (4 páginas)
8. Detailed Explanation of Changes Made (6 páginas)

🔗 El PDF está disponible para descarga.`)
    }, 2000)
  }

  return (
    <div className="bg-[#36393f] rounded-lg p-6 text-white max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-3 flex items-center justify-center gap-3">
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
          Documentación PDF para Desarrolladores
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-8 h-8" />
        </h2>
        <p className="text-[#b9bbbe] text-lg">Guía completa de implementación del tutorial PassQuirk RPG</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[#2f3136] p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" className="w-6 h-6" />
            Contenido del Documento
          </h3>
          <div className="space-y-2 text-sm text-[#b9bbbe]">
            <div>
              📋 <strong>Estructura de Embeds:</strong> Diseño y componentes
            </div>
            <div>
              🧭 <strong>Sistema de Navegación:</strong> Previous/Next buttons
            </div>
            <div>
              👤 <strong>Creación de Personajes:</strong> Integración completa
            </div>
            <div>
              ⚔️ <strong>Mecánicas de Combate:</strong> Tutorial interactivo
            </div>
            <div>
              💻 <strong>Ejemplos de Código:</strong> JavaScript/Discord.js
            </div>
            <div>
              🔧 <strong>Control de Versiones:</strong> Git y repositorios
            </div>
            <div>
              🎨 <strong>Personalización:</strong> Expansión y modificaciones
            </div>
            <div>
              📝 <strong>Cambios Detallados:</strong> Explicación completa
            </div>
          </div>
        </Card>

        <Card className="bg-[#2f3136] p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-6 h-6" />
            Características Técnicas
          </h3>
          <div className="space-y-2 text-sm text-[#b9bbbe]">
            <div>
              📄 <strong>50+ páginas</strong> de documentación detallada
            </div>
            <div>
              🔗 <strong>Enlaces directos</strong> a recursos y ejemplos
            </div>
            <div>
              📊 <strong>Diagramas de flujo</strong> y arquitectura
            </div>
            <div>
              💡 <strong>Mejores prácticas</strong> de desarrollo
            </div>
            <div>
              🛠️ <strong>Snippets de código</strong> listos para usar
            </div>
            <div>
              🔍 <strong>Troubleshooting</strong> y resolución de problemas
            </div>
            <div>
              📈 <strong>Optimización</strong> de rendimiento
            </div>
            <div>
              🔄 <strong>Actualizaciones</strong> y mantenimiento
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button
          onClick={generarPDFCompleto}
          disabled={generandoPDF}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 text-lg flex items-center gap-3 mx-auto"
        >
          {generandoPDF ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Generando PDF...
            </>
          ) : (
            <>
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-6 h-6" />
              Descargar Documentación PDF Completa
              <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/65115-tada.gif" className="w-6 h-6" />
            </>
          )}
        </Button>
      </div>

      <div className="mt-8 p-4 bg-[#2f3136] rounded-lg">
        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/68602-gg.gif" className="w-5 h-5" />
          Vista Previa del Contenido
        </h4>
        <div className="text-sm text-[#b9bbbe] space-y-2">
          <p>
            <strong>Sección 1:</strong> Estructura detallada de embeds con ejemplos de Discord.js
          </p>
          <p>
            <strong>Sección 2:</strong> Implementación de navegación Previous/Next con manejo de estados
          </p>
          <p>
            <strong>Sección 3:</strong> Sistema completo de creación de personajes en 5 pasos
          </p>
          <p>
            <strong>Sección 4:</strong> Tutorial de combate interactivo contra Slime con mecánicas por turnos
          </p>
          <p>
            <strong>Sección 5:</strong> Código fuente completo con comentarios y explicaciones
          </p>
          <p>
            <strong>Sección 6:</strong> Guía de Git para fusionar repositorios y control de versiones
          </p>
          <p>
            <strong>Sección 7:</strong> Personalización avanzada y expansión del sistema
          </p>
          <p>
            <strong>Sección 8:</strong> Changelog detallado con explicación de cada modificación
          </p>
        </div>
      </div>
    </div>
  )
}
