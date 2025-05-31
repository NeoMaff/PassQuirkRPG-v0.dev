const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filesToRemove = [
    'cleanup_final.js',
    'cleanup_project.js',
    'cleanup.js',
    'start-bot-new.js',
    'pnpm-lock.yaml',
    'bot.log'
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('=== Archivos propuestos para eliminar ===');
filesToRemove.forEach(file => {
    const exists = fs.existsSync(file) ? '✅ Existe' : '❌ No existe';
    console.log(`- ${file} (${exists})`);
});

console.log('\n=== ADVERTENCIA ===');
console.log('Estos archivos serán eliminados permanentemente.');
console.log('Asegúrate de tener una copia de seguridad si son importantes.\n');

rl.question('¿Deseas continuar con la eliminación? (s/n): ', (answer) => {
    if (answer.toLowerCase() === 's') {
        console.log('\nEliminando archivos...');
        filesToRemove.forEach(file => {
            try {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                    console.log(`✅ Eliminado: ${file}`);
                }
            } catch (err) {
                console.error(`❌ Error al eliminar ${file}:`, err.message);
            }
        });
        console.log('\nLimpieza completada.');
    } else {
        console.log('\nOperación cancelada. No se eliminó ningún archivo.');
    }
    rl.close();
});
