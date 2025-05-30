# Battle Panel - PassQuirkRPG Bot

## Purpose
This folder contains the complete Discord embed code for the battle system panel based on the reference images showing combat encounters. The battle panel displays player vs enemy combat with HP/MP stats, battle scene images, and action buttons.

## Structure
- `battle_panel_header.js` - Header with location and encounter description
- `battle_panel_body.js` - Combat stats, HP/MP display, and battle image
- `battle_panel_footer.js` - Action buttons (Shoot, Bane, Heal, Potion, Defend, Escape)
- `battle_panel_manager.js` - Main manager that combines all components

## Features
- Player vs Enemy stat comparison
- HP/MP bars with current/max values
- Battle scene images
- Combat action buttons
- Location-based encounters

## Usage
\`\`\`javascript
const { createBattleEmbed } = require('./battle_panel_manager');
const embed = createBattleEmbed(playerData, enemyData, locationData);
