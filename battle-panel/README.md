# Panel de Batalla - Bot PassQuirkRPG

## Propósito
Esta carpeta contiene el código completo de embed de Discord para el sistema de panel de batalla basado en las imágenes de referencia que muestran encuentros de combate. El panel de batalla muestra el combate jugador contra enemigo con estadísticas de PS/PM, imágenes de escenas de batalla y botones de acción.

## Estructura
- `battle_panel_header.js` - Encabezado con ubicación y descripción del encuentro
- `battle_panel_body.js` - Estadísticas de combate, visualización de PS/PM e imagen de batalla
- `battle_panel_footer.js` - Botones de acción (Disparar, Maldición, Curar, Poción, Defender, Escapar)
- `battle_panel_manager.js` - Gestor principal que combina todos los componentes

## Características
- Comparación de estadísticas de Jugador vs Enemigo
- Barras de PS/PM con valores actuales/máximos
- Imágenes de escenas de batalla
- Botones de acción de combate
- Encuentros basados en ubicación

## Uso
\`\`\`javascript
const { createBattleEmbed } = require('./battle_panel_manager');
const embed = createBattleEmbed(playerData, enemyData, locationData);
