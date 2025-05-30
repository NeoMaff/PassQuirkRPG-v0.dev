# Inventory Panel - PassQuirkRPG Bot

## Purpose
This folder contains the complete Discord embed code for the inventory system panel based on the reference image "Diseño para la tienda y diálogos con los NPC". The inventory panel displays player items with descriptions, stats, and values in a paginated format.

## Structure
- `inventory_panel_header.js` - Header section with title and player info
- `inventory_panel_body.js` - Main content with items, descriptions, and stats
- `inventory_panel_footer.js` - Footer with pagination and action buttons
- `inventory_panel_manager.js` - Main manager that combines all components

## Features
- Paginated item display (page 1 of 3 format)
- Item descriptions with RPG stats
- Gold value display for each item
- Navigation buttons (Previous/Next/Close)
- Equipment status indicators

## Usage
\`\`\`javascript
const { createInventoryEmbed } = require('./inventory_panel_manager');
const embed = createInventoryEmbed(playerData, page);
