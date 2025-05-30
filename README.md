# PassQuirkRPG Discord Bot Embed System

A comprehensive Discord bot embed system for PassQuirkRPG with web preview capabilities.

## 📁 Project Structure

\`\`\`
passquirk-rpg-embeds/
├── README.md
├── package.json
├── server.js
├── discord-embeds/          # Discord.js embed code
│   ├── inventory-panel/
│   ├── battle-panel/
│   ├── tournament-panel/
│   ├── dungeon-panel/
│   └── character-creation-panel/
├── web-preview/             # Web preview system
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── components/
└── assets/                  # Images and resources
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
\`\`\`bash
# Clone or download the project
cd passquirk-rpg-embeds

# Install dependencies
npm install

# Start the preview server
npm start
\`\`\`

### Web Preview
Open `http://localhost:3000` in your browser to preview all embeds.

### Discord Bot Integration
\`\`\`javascript
const { PassQuirkRPGEmbeds } = require('./discord-embeds');
const embeds = new PassQuirkRPGEmbeds();

// Use in your Discord bot
const inventoryEmbed = embeds.createInventoryEmbed(playerData);
await interaction.reply(inventoryEmbed);
\`\`\`

## 📋 Features

- ✅ Complete Discord.js embed system
- ✅ Web preview with exact Discord styling
- ✅ Responsive design for all devices
- ✅ Interactive components (pagination, buttons)
- ✅ Modular architecture
- ✅ TypeScript support
- ✅ Comprehensive documentation

## 🎨 Available Panels

1. **Inventory Panel** - Item management with pagination
2. **Battle Panel** - Combat encounters with HP/MP tracking
3. **Tournament Panel** - PvP rankings and rewards
4. **Dungeon Panel** - Exploration with navigation
5. **Character Creation Panel** - Character setup confirmation

## 📖 Documentation

Each panel folder contains:
- `README.md` - Panel documentation
- `*_header.js` - Header components
- `*_body.js` - Body content
- `*_footer.js` - Footer and buttons
- `*_manager.js` - Main manager
- `preview.html` - Web preview
