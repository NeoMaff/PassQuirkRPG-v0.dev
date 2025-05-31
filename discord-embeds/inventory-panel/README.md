# Inventory Panel - Discord Embed System

## 📋 Overview
The inventory panel displays player items with descriptions, stats, and values in a paginated format. Based on the reference image "Diseño para la tienda y diálogos con los NPC".

## 🏗️ Structure
- `inventory_header.js` - Title, author, and thumbnail
- `inventory_body.js` - Item listings with descriptions and values
- `inventory_footer.js` - Pagination and action buttons
- `inventory_manager.js` - Main coordinator combining all components

## 🎯 Features
- Paginated item display (1/3, 2/3, 3/3 format)
- Item descriptions with RPG stats
- Gold value display for each item
- Equipment status indicators (🟡 Equipped)
- Navigation buttons (Previous/Next/Close/Use Item)

## 📊 Data Structure
\`\`\`javascript
const playerData = {
  name: "Player Name",
  avatar: "avatar_url",
  characterAvatar: "character_avatar_url"
};
\`\`\`

## 🎨 Visual Elements
- **Color**: Dark Discord theme (#2f3136)
- **Layout**: 3 items per page, inline fields
- **Icons**: Item-specific emojis (🪢🧪🛡️🪓🔮)
- **Status**: Equipment indicators and value display

## 🔧 Usage
\`\`\`javascript
const { InventoryEmbedManager } = require('./inventory_manager');
const manager = new InventoryEmbedManager();
const embed = manager.createInventoryEmbed(playerData, page);
