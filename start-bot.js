const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Configurar rutas importantes
const LOGS_DIR = path.join(__dirname, 'logs');
const BOT_LOG_FILE = path.join(LOGS_DIR, 'bot.log');

// Crear directorio de logs si no existe
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Función para escribir en el log
function logToFile(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(BOT_LOG_FILE, logMessage);
}

// Configurar manejo de errores no capturados
process.on('uncaughtException', (error) => {
    const errorMessage = `⚠️ Error no capturado: ${error.stack || error}`;
    console.error(chalk.red(errorMessage));
    logToFile(`ERROR: ${errorMessage}`);
    // Forzar salida después de un breve retraso para permitir que los logs se escriban
    setTimeout(() => process.exit(1), 1000);
});

process.on('unhandledRejection', (reason, promise) => {
    const errorMessage = `⚠️ Promesa rechazada no manejada en: ${promise}\nRazón: ${reason}`;
    console.error(chalk.yellow(errorMessage));
    logToFile(`UNHANDLED_REJECTION: ${errorMessage}`);
});

async function startBot() {
    console.log(chalk.blue('🔧 Iniciando verificación de dependencias...'));
    logToFile('Iniciando verificación de dependencias...');

    try {
        // Aplicar parche de quickdb si es necesario
        console.log(chalk.blue('🔄 Aplicando parche para quickdb...'));
        logToFile('Aplicando parche para quickdb...');
        
        try {
            require('./patches/quickdb-patch');
            console.log(chalk.green('✅ Parche de quickdb aplicado correctamente'));
            logToFile('Parche de quickdb aplicado correctamente');
        } catch (error) {
            const errorMsg = `⚠️ No se pudo aplicar el parche de quickdb: ${error.message}`;
            console.error(chalk.yellow(errorMsg));
            logToFile(`WARNING: ${errorMsg}`);
            // No detenemos la ejecución si el parche falla
        }
        
        // Verificar que uuid funciona correctamente
        console.log(chalk.blue('🔍 Verificando UUID...'));
        logToFile('Verificando UUID...');
        
        try {
            const { v4: uuidv4 } = require('uuid');
            const testId = uuidv4();
            
            if (typeof testId !== 'string' || testId.length === 0) {
                throw new Error('UUID generado no válido');
            }
            
            console.log(chalk.green('✅ UUID verificado correctamente'));
            logToFile('UUID verificado correctamente');
            
        } catch (error) {
            const errorMsg = `❌ Error al verificar UUID: ${error.message}`;
            console.error(chalk.red(errorMsg));
            logToFile(`ERROR: ${errorMsg}`);
            throw error; // Detener la ejecución si hay un error con uuid
        }
        
        // Cargar variables de entorno
        require('dotenv').config();
        
        // Verificar que las variables de entorno requeridas estén configuradas
        const requiredEnvVars = ['DISCORD_TOKEN', 'CLIENT_ID'];
        const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
        
        if (missingEnvVars.length > 0) {
            const errorMsg = `❌ Faltan variables de entorno requeridas: ${missingEnvVars.join(', ')}`;
            console.error(chalk.red(errorMsg));
            logToFile(`ERROR: ${errorMsg}`);
            process.exit(1);
        }
        
        // Iniciar el bot
        console.log(chalk.blue('🚀 Iniciando el bot...'));
        logToFile('Iniciando el bot...');
        
        // Registrar información del sistema
        console.log(chalk.blue(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`));
        console.log(chalk.blue(`📂 Directorio de trabajo: ${process.cwd()}`));
        
        // Registrar uso de memoria
        const used = process.memoryUsage();
        for (const [key, value] of Object.entries(used)) {
            console.log(chalk.blue(`💾 ${key}: ${Math.round(value / 1024 / 1024 * 100) / 100} MB`));
        }
        
        // Iniciar la aplicación principal
        require('./index.js');
        
        console.log(chalk.green('✅ Bot iniciado correctamente'));
        logToFile('Bot iniciado correctamente');
        
    } catch (error) {
        const errorMsg = `❌ Error al iniciar el bot: ${error.message}`;
        console.error(chalk.red(errorMsg));
        logToFile(`ERROR: ${errorMsg}`);
        if (error.stack) {
            logToFile(`STACK: ${error.stack}`);
        }
        process.exit(1);
    }
}

// Iniciar la aplicación
startBot().catch(error => {
    console.error('❌ Error fatal al iniciar la aplicación:', error);
    process.exit(1);
});
