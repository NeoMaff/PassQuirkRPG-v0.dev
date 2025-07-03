"use client"

import { PDFGenerator } from "./components/pdf-generator"
import { EmojiAnimadoTutorial } from "./components/emoji-animado-tutorial"

export default function DocumentacionPDFCompleta() {
  const contenidoPDF = {
    seccion1: {
      titulo: "1. Embed Structure and Design",
      contenido: [
        "Estructura fundamental de embeds Discord.js",
        "Implementación de emojis animados",
        "Integración de videos y multimedia",
        "Formateo de texto y elementos interactivos",
        "Mejores prácticas de diseño visual",
      ],
    },
    seccion2: {
      titulo: "2. Tutorial Navigation and Flow",
      contenido: [
        "Sistema de botones Previous/Next",
        "Manejo de estados de navegación",
        "Flujo de tutorial estructurado",
        "Gestión de interacciones de usuario",
        "Validación de progreso",
      ],
    },
    seccion3: {
      titulo: "3. Character Creation Integration",
      contenido: [
        "Modal de creación en 5 pasos",
        "Sistema de clases y estadísticas",
        "Bonificaciones por reino",
        "Generación de Quirks aleatorios",
        "Persistencia de datos de personaje",
      ],
    },
    seccion4: {
      titulo: "4. Battle Mechanics Tutorial",
      contenido: [
        "Combate por turnos contra Slime",
        "Sistema de HP y energía",
        "Acciones de combate (Atacar, Defender, Poción, Quirk)",
        "Mecánicas de daño y curación",
        "Estados de victoria/derrota",
      ],
    },
    seccion5: {
      titulo: "5. Code Examples and Implementation",
      contenido: [
        "Snippets completos de Discord.js",
        "Manejo de interacciones y botones",
        "Gestión de sesiones de usuario",
        "Integración con Discord API",
        "Optimización de rendimiento",
      ],
    },
    seccion6: {
      titulo: "6. Repository Merging and Version Control",
      contenido: [
        "Comandos Git para fusión de repositorios",
        "Resolución de conflictos",
        "Estrategias de branching",
        "Mejores prácticas de commits",
        "Workflow de desarrollo colaborativo",
      ],
    },
    seccion7: {
      titulo: "7. Customization and Expansion",
      contenido: [
        "Añadir nuevas secciones al tutorial",
        "Personalización de emojis y colores",
        "Expansión del sistema de combate",
        "Integración de nuevas características",
        "Mantenimiento y actualizaciones",
      ],
    },
    seccion8: {
      titulo: "8. Detailed Explanation of Changes Made",
      contenido: [
        "Changelog completo del repositorio",
        "Explicación de cada archivo modificado",
        "Nuevas funcionalidades implementadas",
        "Refactoring y optimizaciones",
        "Guía de migración",
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-12 h-12" />
            PassQuirk RPG Tutorial Implementation Guide
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/58229-sparklestars.gif" className="w-12 h-12" />
          </h1>
          <p className="text-slate-300 text-xl flex items-center justify-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" />
            Documentación Completa para Desarrolladores de Discord Bots
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/47232-crown-green.gif" />
          </p>
        </div>

        {/* Generador de PDF */}
        <PDFGenerator />

        {/* Índice de Contenidos */}
        <div className="bg-[#36393f] rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif" className="w-8 h-8" />
            Índice de Contenidos del PDF
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(contenidoPDF).map(([key, seccion]) => (
              <div key={key} className="bg-[#2f3136] p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">{seccion.titulo}</h3>
                <ul className="space-y-2 text-sm text-[#b9bbbe]">
                  {seccion.contenido.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <EmojiAnimadoTutorial
                        src="https://cdn3.emoji.gg/emojis/5267-green-sparkles.gif"
                        className="w-4 h-4 mt-1 flex-shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Características Destacadas */}
        <div className="bg-[#36393f] rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/7384-greenfire.gif" className="w-8 h-8" />
            Características Destacadas del Documento
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#2f3136] p-6 rounded-lg text-center">
              <EmojiAnimadoTutorial
                src="https://cdn3.emoji.gg/emojis/65115-tada.gif"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-3 text-green-400">Código Completo</h3>
              <p className="text-[#b9bbbe] text-sm">
                Más de 100 snippets de código JavaScript/Discord.js listos para implementar
              </p>
            </div>

            <div className="bg-[#2f3136] p-6 rounded-lg text-center">
              <EmojiAnimadoTutorial
                src="https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-3 text-blue-400">Diagramas Visuales</h3>
              <p className="text-[#b9bbbe] text-sm">
                Diagramas de flujo, arquitectura y esquemas de base de datos incluidos
              </p>
            </div>

            <div className="bg-[#2f3136] p-6 rounded-lg text-center">
              <EmojiAnimadoTutorial
                src="https://cdn3.emoji.gg/emojis/68602-gg.gif"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-3 text-purple-400">Mejores Prácticas</h3>
              <p className="text-[#b9bbbe] text-sm">Guías de optimización, seguridad y mantenimiento de código</p>
            </div>
          </div>
        </div>

        {/* Ejemplo de Contenido */}
        <div className="bg-[#36393f] rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/5417_star_purple.gif" className="w-8 h-8" />
            Vista Previa del Contenido
          </h2>

          <div className="bg-[#2f3136] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Ejemplo: Estructura de Embed Principal</h3>
            <pre className="bg-black p-4 rounded text-green-400 text-sm overflow-x-auto">
              {`// Ejemplo de código incluido en el PDF
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

function crearEmbedTutorialPassQuirk(seccion, progreso) {
  const embed = new EmbedBuilder()
    .setTitle('🌟 Tutorial PassQuirk RPG 🌟')
    .setDescription(\`👑 **Guiado por El Sabio**
🔥 **Sección \${seccion.numero}/\${seccion.total}**
✨ **Progreso:** \${Math.round(progreso)}%\`)
    .setColor(0x9B59B6)
    .addFields({
      name: \`\${seccion.emoji} \${seccion.titulo}\`,
      value: seccion.descripcion,
      inline: false
    })
    .setFooter({
      text: 'PassQuirk RPG Tutorial System v3.0',
      iconURL: 'URL_LOGO_BOT'
    })
    .setTimestamp();
  
  return embed;
}`}
            </pre>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="bg-[#36393f] rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <EmojiAnimadoTutorial src="https://cdn3.emoji.gg/emojis/42684-star-r.gif" className="w-8 h-8" />
            Información Adicional
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-[#b9bbbe]">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">📋 Requisitos del Sistema</h3>
              <ul className="space-y-1 text-sm">
                <li>• Node.js 16.9.0 o superior</li>
                <li>• Discord.js v14.x</li>
                <li>• Git para control de versiones</li>
                <li>• Editor de código (VS Code recomendado)</li>
                <li>• Bot de Discord configurado</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">🎯 Audiencia Objetivo</h3>
              <ul className="space-y-1 text-sm">
                <li>• Desarrolladores de bots de Discord</li>
                <li>• Programadores JavaScript/Node.js</li>
                <li>• Administradores de servidores</li>
                <li>• Estudiantes de desarrollo de bots</li>
                <li>• Equipos de desarrollo de juegos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
