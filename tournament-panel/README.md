# Tournament Panel - PassQuirkRPG Bot

## Purpose
This folder contains the complete Discord embed code for the tournament ranking system based on the reference image showing PvP tournament rankings. The panel displays weekly tournament standings, rewards, and player rankings.

## Structure
- `tournament_panel_header.js` - Header with tournament title and rewards
- `tournament_panel_body.js` - Ranking lists and player standings
- `tournament_panel_footer.js` - Tournament action buttons and player info
- `tournament_panel_manager.js` - Main manager that combines all components

## Features
- Weekly PvP tournament rankings
- Reward tier display (Gold, Silver, Bronze medals)
- Top 10 player rankings in columns
- Player medal count and ranking info
- Tournament participation buttons

## Usage
\`\`\`javascript
const { createTournamentEmbed } = require('./tournament_panel_manager');
const embed = createTournamentEmbed(tournamentData);
