# Panel de Inventario - Bot PassQuirkRPG

## Propósito
Esta carpeta contiene el código completo de embed de Discord para el sistema de panel de inventario basado en la imagen de referencia "Diseño para la tienda y diálogos con los NPC". El panel de inventario muestra los objetos del jugador con descripciones, estadísticas y valores en un formato paginado.

## Estructura
- `inventory_panel_header.js` - Sección de encabezado con título e información del jugador
- `inventory_panel_body.js` - Contenido principal con objetos, descripciones y estadísticas
- `inventory_panel_footer.js` - Pie de página con paginación y botones de acción
- `inventory_panel_manager.js` - Gestor principal que combina todos los componentes

## Características
- Visualización paginada de objetos (formato página 1 de 3)
- Descripciones de objetos con estadísticas RPG
- Visualización del valor en oro de cada objeto
- Botones de navegación (Anterior/Siguiente/Cerrar)
- Indicadores de estado del equipo

## Uso
\`\`\`javascript
const { createInventoryEmbed } = require('./inventory_panel_manager');
const embed = createInventoryEmbed(playerData, page);
