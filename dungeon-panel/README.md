# Dungeon Panel - PassQuirkRPG Bot

## Purpose
This folder contains the complete Discord embed code for the dungeon navigation system based on the reference images showing dungeon exploration. The panel displays room descriptions, player stats, navigation options, and dungeon imagery.

## Structure
- `dungeon_panel_header.js` - Header with dungeon name and exploration text
- `dungeon_panel_body.js` - Player stats, room image, and navigation description
- `dungeon_panel_footer.js` - Direction buttons and action options
- `dungeon_panel_manager.js` - Main manager that combines all components

## Features
- Dungeon room navigation (Left, Straight, Right)
- Player stat display (HP, MP, Gold, Medals)
- Room atmosphere descriptions
- Dungeon imagery display
- Action buttons (Potion, Abandon)

## Usage
\`\`\`javascript
const { createDungeonEmbed } = require('./dungeon_panel_manager');
const embed = createDungeonEmbed(playerData, dungeonData);
