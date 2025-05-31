const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Función para eliminar archivos/carpetas de manera segura
function safeRemove(target) {
    if (!fs.existsSync(target)) return;
    
    const stats = fs.statSync(target);
    
    if (stats.isDirectory()) {
        // Eliminar el contenido primero
        fs.readdirSync(target).forEach(file => {
            const curPath = path.join(target, file);
            safeRemove(curPath);
        });
        // Eliminar la carpeta vacía
        fs.rmdirSync(target);
    } else {
        // Eliminar archivo
        fs.unlinkSync(target);
    }
}

// Archivos y carpetas a mantener
const KEEP_ITEMS = [
    // Archivos raíz
    '.env',
    '.gitignore',
    'package.json',
    'package-lock.json',
    'start.js',
    'start-bot.js',
    'start-bot-new.js',
    'bot-control.js',
    'bot-control.bat',
    'main-bot-manager.js',
    'bot-panel-manager.js',
    'apply-uuid-patch.js',
    'cleanup.js',
    'deploy-commands.js',
    'server.js',
    'LICENSE',
    'README.md',
    'PassQuirkRPG_Esquema_Completo.txt',
    
    // Carpetas principales
    'bot',
    'battle-panel',
    'character-creation-panel',
    'dungeon-panel',
    'inventory-panel',
    'tournament-panel',
    'discord-embeds',
    'reference',
    'node_modules'
];

// Obtener todos los archivos y carpetas en el directorio raíz
const rootItems = fs.readdirSync(__dirname);

console.log('Iniciando limpieza final del proyecto...');

// Eliminar todo excepto los elementos en KEEP_ITEMS
rootItems.forEach(item => {
    // Ignorar archivos y carpetas que comienzan con punto
    if (item.startsWith('.')) return;
    
    // Ignorar los archivos de limpieza
    if (item === 'cleanup_project.js' || item === 'cleanup_final.js') return;
    
    // Verificar si el elemento debe mantenerse
    if (!KEEP_ITEMS.includes(item)) {
        const fullPath = path.join(__dirname, item);
        console.log(`Eliminando: ${item}`);
        safeRemove(fullPath);
    }
});

console.log('\nLimpieza completada. Reinstalando dependencias...');

// Reinstalar dependencias
try {
    // Eliminar node_modules si existe
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
        console.log('Eliminando node_modules...');
        safeRemove(nodeModulesPath);
    }
    
    // Reinstalar dependencias
    console.log('Instalando dependencias...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('\n¡Proyecto limpiado y organizado exitosamente!');
    console.log('Se han conservado solo los archivos y carpetas esenciales.');
    
} catch (error) {
    console.error('Error durante la limpieza:', error);
}
