# Discord Yellow Theme Bot

Bot de Discord con embeds personalizados usando un esquema de colores amarillo, líneas animadas decorativas y emojis dinámicos.

## 🎨 Características Visuales

### Esquema de Colores Amarillo
- **Oro (#FFD700)**: Color principal que evoca prestigio y valor
- **Amarillo Brillante (#FFFF00)**: Para destacar información crítica
- **Naranja Dorado (#FFA500)**: Acentos y elementos secundarios
- **Amarillo Cálido (#FFEB3B)**: Sensación acogedora y amigable

### Elementos Decorativos
- **Líneas Animadas**: Integración de GIFs animados como separadores visuales
- **Emojis Animados**: Elementos dinámicos de emoji.gg para mayor atractivo
- **Texto Coloreado**: Sistema ANSI para resaltar diferentes tipos de información
- **Bordes ASCII**: Marcos decorativos para estructurar el contenido

## 🚀 Comandos Disponibles

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `!bienvenida` | Mensaje de bienvenida con tema amarillo | `!bienvenida` |
| `!stats` | Estadísticas del servidor con gráficos | `!stats` |
| `!notificacion` | Crear notificación personalizada | `!notificacion info "Título" "Mensaje"` |
| `!test` | Demostrar todas las características visuales | `!test` |
| `!help` | Lista completa de comandos | `!help` |

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio**
   \`\`\`bash
   git clone [tu-repositorio]
   cd discord-yellow-theme-bot
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurar el bot**
   - Crear aplicación en Discord Developer Portal
   - Obtener token del bot
   - Reemplazar `TU_TOKEN_DE_BOT_AQUI` en `bot.js`

4. **Configurar emojis animados**
   - Visitar https://emoji.gg
   - Descargar emojis deseados
   - Subirlos a tu servidor Discord
   - Actualizar IDs en la sección `ANIMATED_EMOJIS`

5. **Ejecutar el bot**
   \`\`\`bash
   npm start
   \`\`\`

## 🎯 Diseño Responsivo

El bot está diseñado para verse bien en:
- **Desktop**: Embeds completos con todos los elementos visuales
- **Mobile**: Adaptación automática del contenido
- **Diferentes temas**: Compatible con modo claro y oscuro de Discord

## 🔧 Personalización

### Cambiar Colores
Modifica la constante `COLOR_SCHEME` para usar diferentes tonalidades:

\`\`\`javascript
const COLOR_SCHEME = {
  PRIMARY: '#TU_COLOR_AQUI',
  SECONDARY: '#TU_COLOR_SECUNDARIO',
  // ... más colores
};
\`\`\`

### Añadir Nuevos Comandos
Extiende el switch en el evento `messageCreate`:

\`\`\`javascript
case 'tu_comando':
  // Tu lógica aquí
  break;
\`\`\`

### Personalizar Embeds
Usa la clase `YellowThemeEmbedBuilder` para crear embeds consistentes:

\`\`\`javascript
const miEmbed = new YellowThemeEmbedBuilder()
  .setTheme('info')
  .setAnimatedTitle('Mi Título')
  .setColoredDescription('Mi descripción')
  .build();
\`\`\`

## 📱 Elementos Interactivos

- **Botones Temáticos**: Botones con colores que complementan el tema amarillo
- **Respuestas Contextuales**: Feedback inmediato para todas las interacciones
- **Navegación Intuitiva**: Sistema de botones para diferentes funciones

## 🎨 Rationale del Diseño

### ¿Por qué Amarillo?
- **Energía y Positividad**: El amarillo transmite optimismo y energía
- **Atención Visual**: Destaca naturalmente sobre fondos oscuros de Discord
- **Versatilidad**: Se combina bien con otros colores para crear jerarquía visual
- **Accesibilidad**: Buen contraste cuando se usa correctamente

### Elementos Decorativos
- **Líneas Animadas**: Crean separación visual y añaden dinamismo
- **Emojis Animados**: Mejoran la experiencia del usuario y añaden personalidad
- **Texto Coloreado**: Facilita la lectura rápida y organización de información

## 🔍 Troubleshooting

### Problemas Comunes
1. **Emojis no aparecen**: Verificar IDs de emojis personalizados
2. **Colores no se muestran**: Asegurar formato correcto de códigos ANSI
3. **Líneas animadas no cargan**: Verificar URL de la imagen animada

### Logs y Debugging
El bot incluye logging detallado para facilitar el debugging:
- Conexión exitosa
- Errores de comandos
- Interacciones de botones
- Errores no manejados

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.
