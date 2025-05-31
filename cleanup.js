const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

// Directorios a limpiar
const directoriesToClean = [
    'src',
    'bot',
    'patches',
    'PDF - Documentación - PassQuirk',
    'Doc Antiguo'
];

// Archivos a conservar
const filesToKeep = [
    'bot/index.js',
    'bot/commands/configuracion/configuracion.js',
    'bot/commands/admin/configurar-tiempo.js',
    'bot/commands/admin/cambiar-zona.js',
    'bot/commands/comandos.js',
    'bot/events/interactionCreate.js',
    'bot/events/ready.js',
    'bot/models/User.js',
    'bot/utils/logger.js',
    'bot/utils/timeConfig.js',
    'start-bot.js',
    'package.json',
    '.env.example'
];

// Función para eliminar archivos y directorios recursivamente
async function cleanDirectory(directory) {
    try {
        const files = await readdir(directory);
        
        for (const file of files) {
            const filePath = path.join(directory, file);
            const relativePath = path.relative(process.cwd(), filePath);
            const fileStat = await stat(filePath);
            
            // Verificar si el archivo debe conservarse
            const shouldKeep = filesToKeep.some(keepPath => 
                relativePath.replace(/\\/g, '/').includes(keepPath)
            );
            
            if (shouldKeep) {
                console.log(`✅ Manteniendo: ${relativePath}`);
                continue;
            }
            
            if (fileStat.isDirectory()) {
                // Limpiar el directorio primero
                await cleanDirectory(filePath);
                
                // Verificar si el directorio está vacío
                const remainingFiles = await readdir(filePath);
                if (remainingFiles.length === 0) {
                    console.log(`🗑️  Eliminando directorio vacío: ${relativePath}`);
                    await rmdir(filePath);
                }
            } else {
                console.log(`🗑️  Eliminando archivo: ${relativePath}`);
                await unlink(filePath);
            }
        }
    } catch (error) {
        console.error(`❌ Error al limpiar el directorio ${directory}:`, error.message);
    }
}

// Iniciar la limpieza
async function startCleanup() {
    console.log('🚀 Iniciando limpieza del proyecto...\n');
    
    for (const dir of directoriesToClean) {
        if (fs.existsSync(dir)) {
            console.log(`🧹 Limpiando directorio: ${dir}`);
            await cleanDirectory(dir);
        } else {
            console.log(`ℹ️ El directorio no existe: ${dir}`);
        }
    }
    
    console.log('\n✅ Limpieza completada. Se han conservado los archivos importantes.');
    console.log('📋 Archivos conservados:');
    filesToKeep.forEach(file => console.log(`   - ${file}`));
}

// Ejecutar la limpieza
startCleanup().catch(console.error);
