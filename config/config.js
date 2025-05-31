require('dotenv').config();

module.exports = {
    // Bot Configuration
    bot: {
        token: process.env.DISCORD_TOKEN,
        clientId: process.env.CLIENT_ID,
        guildId: process.env.GUILD_ID,
        ownerId: process.env.OWNER_ID || '',
        prefix: process.env.PREFIX || '!',
        environment: process.env.NODE_ENV || 'development'
    },
    
    // Database Configuration
    database: {
        url: process.env.DATABASE_URL || 'sqlite://./data/database.sqlite',
        options: {
            dialect: process.env.DB_DIALECT || 'sqlite',
            storage: process.env.DB_STORAGE || './data/database.sqlite',
            logging: process.env.NODE_ENV === 'development' ? console.log : false,
            define: {
                timestamps: true,
                underscored: true
            }
        }
    },
    
    // Panel Configuration
    panels: {
        // Panel Paths
        paths: {
            battle: './battle-panel',
            character: './character-creation-panel',
            dungeon: './dungeon-panel',
            inventory: './inventory-panel',
            tournament: './tournament-panel',
            embeds: './discord-embeds'
        },
        // Panel-specific Configuration
        battle: {
            maxEnemies: 5,
            maxRounds: 20,
            cooldown: 30000 // 30 seconds
        },
        inventory: {
            itemsPerPage: 10
        },
        character: {
            startingLevel: 1,
            startingGold: 100,
            startingItems: ['basic_sword', 'basic_armor']
        }
    },
    
    // Logging Configuration
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        file: {
            enabled: process.env.LOG_TO_FILE === 'true',
            path: './logs/bot.log',
            maxSize: '20m',
            maxFiles: '14d'
        },
        console: {
            enabled: process.env.LOG_TO_CONSOLE !== 'false'
        }
    },
    
    // Feature Flags
    features: {
        battle: true,
        inventory: true,
        characterCreation: true,
        dungeon: true,
        tournament: true,
        economy: true,
        leveling: true
    },
    
    // Development Settings
    development: {
        debug: process.env.DEBUG === 'true',
        syncDatabase: process.env.SYNC_DATABASE === 'true',
        resetOnStart: process.env.RESET_ON_START === 'true'
    }
};

// Validate required configuration
if (!module.exports.bot.token) {
    console.error('❌ Error: Bot token not configured (DISCORD_TOKEN)');
    process.exit(1);
}

if (!module.exports.bot.clientId) {
    console.error('❌ Error: Client ID not configured (CLIENT_ID)');
    process.exit(1);
}
