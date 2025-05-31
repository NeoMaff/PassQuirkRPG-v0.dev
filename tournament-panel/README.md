# Panel de Torneo - Bot PassQuirkRPG

## Propósito
Esta carpeta contiene el código completo de embed de Discord para el sistema de clasificación de torneos basado en la imagen de referencia que muestra las clasificaciones del torneo PvP. El panel muestra las clasificaciones del torneo semanal, recompensas y clasificaciones de jugadores.

## Estructura
- `tournament_panel_header.js` - Encabezado con título del torneo y recompensas
- `tournament_panel_body.js` - Listas de clasificación y posiciones de jugadores
- `tournament_panel_footer.js` - Botones de acción del torneo e información del jugador
- `tournament_panel_manager.js` - Gestor principal que combina todos los componentes

## Características
- Clasificaciones del torneo PvP semanal
- Visualización de niveles de recompensa (Medallas de Oro, Plata, Bronce)
- Clasificación de los 10 mejores jugadores en columnas
- Recuento de medallas del jugador e información de clasificación
- Botones de participación en el torneo

## Uso
\`\`\`javascript
const { createTournamentEmbed } = require('./tournament_panel_manager');
const embed = createTournamentEmbed(tournamentData);
