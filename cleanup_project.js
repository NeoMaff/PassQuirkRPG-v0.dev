const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Función para copiar archivos de manera recursiva
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else if (exists) {
        fs.copyFileSync(src, dest);
    }
}

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
const KEEP_FILES = [
    'bot',
    'node_modules',
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
    'PassQuirkRPG_Esquema_Completo.txt'
];

// Carpetas a mantener
const KEEP_DIRS = [
    'battle-panel',
    'character-creation-panel',
    'dungeon-panel',
    'inventory-panel',
    'tournament-panel',
    'discord-embeds',
    'reference'
];

// Archivos a eliminar
const FILES_TO_REMOVE = [
    'bot/config/botManager.js',
    'bot/commands/rpg/inventory.js',
    'bot/commands/rpg/battle.js',
    'bot/commands/rpg/start.js'
];

// Carpetas a limpiar
const DIRS_TO_CLEAN = [
    'design',
    'temp_images',
    'web',
    'web-preview',
    'previews',
    'public',
    'src',
    'styles',
    'components',
    'hooks',
    'lib',
    'patches',
    'app',
    'Doc Antiguo',
    'Doc Oficial',
    'PDF - Documentación - PassQuirk'
];

console.log('Iniciando limpieza del proyecto...');

// 1. Crear carpeta de respaldo temporal
console.log('Creando respaldo de archivos importantes...');
const BACKUP_DIR = path.join(__dirname, 'backup_temp');

// Asegurarse de que el directorio de respaldo existe
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// 2. Respaldar archivos importantes
KEEP_FILES.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(BACKUP_DIR, file);
    
    if (fs.existsSync(src)) {
        console.log(`Respaldo: ${file}`);
        
        // Crear directorios necesarios
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        copyRecursiveSync(src, dest);
    }
});

// 3. Eliminar archivos innecesarios
console.log('\nEliminando archivos innecesarios...');
FILES_TO_REMOVE.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`Eliminando: ${file}`);
        safeRemove(filePath);
    }
});

// 4. Limpiar carpetas innecesarias
console.log('\nLimpiando carpetas innecesarias...');
DIRS_TO_CLEAN.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
        console.log(`Limpiando: ${dir}`);
        safeRemove(dirPath);
    }
});

// 5. Limpiar node_modules y reinstalar dependencias
console.log('\nLimpiando node_modules...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
    safeRemove(nodeModulesPath);
}

console.log('\nReinstalando dependencias...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencias reinstaladas correctamente.');
} catch (error) {
    console.error('Error al reinstalar dependencias:', error);
}

console.log('\n¡Limpieza completada! Los archivos importantes se han respaldado en la carpeta backup_temp.');
console.log('Puedes revisar los cambios y luego eliminar la carpeta backup_temp si todo está correcto.');
