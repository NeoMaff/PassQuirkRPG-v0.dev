const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

// Configuración
const BOT_PROCESS_FILE = path.join(__dirname, '.bot.pid');
const BOT_SCRIPT = 'start-bot.js';
const LOG_FILE = path.join('logs', 'bot-control.log');

// Crear carpeta de logs si no existe
if (!fs.existsSync(path.dirname(LOG_FILE))) {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

// Función para mostrar el banner
function showBanner() {
    console.clear();
    console.log(
        chalk.blue(
            figlet.textSync('PassQuirk', { horizontalLayout: 'full' })
        )
    );
    console.log(chalk.yellow('        Panel de Control del Bot\n'));
}

// Función para escribir en el log
function log(message) {
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(chalk.gray(`[${timestamp}]`), message);
    fs.appendFileSync(LOG_FILE, logMessage);
}

// Función para ejecutar comandos
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                log(chalk.red(`Error: ${error.message}`));
                return reject(error);
            }
            if (stderr) {
                log(chalk.yellow(`stderr: ${stderr}`));
            }
            if (stdout.trim()) {
                log(stdout);
            }
            resolve(stdout);
        });
    });
}

// Función para verificar si el bot está en ejecución
function isBotRunning() {
    try {
        if (fs.existsSync(BOT_PROCESS_FILE)) {
            const pid = parseInt(fs.readFileSync(BOT_PROCESS_FILE, 'utf8'));
            try {
                process.kill(pid, 0);
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    } catch (error) {
        return false;
    }
}

// Función para iniciar el bot
async function startBot() {
    if (isBotRunning()) {
        log(chalk.yellow('⚠️  El bot ya está en ejecución.'));
        return true;
    }

    log(chalk.blue('🚀 Iniciando el bot...'));
    try {
        const child = exec(`node ${BOT_SCRIPT}`, (error, stdout, stderr) => {
            if (error) {
                log(chalk.red(`❌ Error al iniciar el bot: ${error.message}`));
                return;
            }
            if (stderr) {
                log(chalk.yellow(`⚠️  ${stderr}`));
            }
            log(chalk.green('✅ Bot detenido correctamente.'));
        });

        // Guardar el PID del proceso
        fs.writeFileSync(BOT_PROCESS_FILE, child.pid.toString());
        
        child.stdout.on('data', (data) => {
            process.stdout.write(chalk.blue(`[BOT] ${data}`));
        });

        child.stderr.on('data', (data) => {
            process.stderr.write(chalk.yellow(`[BOT-ERROR] ${data}`));
        });

        log(chalk.green(`✅ Bot iniciado correctamente con PID: ${child.pid}`));
        return true;
    } catch (error) {
        log(chalk.red(`❌ Error al iniciar el bot: ${error.message}`));
        return false;
    }
}

// Función para detener el bot
async function stopBot() {
    if (!isBotRunning()) {
        log(chalk.yellow('⚠️  El bot no está en ejecución.'));
        return true;
    }

    log(chalk.blue('🛑 Deteniendo el bot...'));
    try {
        const pid = parseInt(fs.readFileSync(BOT_PROCESS_FILE, 'utf8'));
        process.kill(pid, 'SIGTERM');
        
        // Esperar a que el proceso se cierre
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (fs.existsSync(BOT_PROCESS_FILE)) {
            fs.unlinkSync(BOT_PROCESS_FILE);
        }
        
        log(chalk.green('✅ Bot detenido correctamente.'));
        return true;
    } catch (error) {
        log(chalk.red(`❌ Error al detener el bot: ${error.message}`));
        return false;
    }
}

// Función para reiniciar el bot
async function restartBot() {
    log(chalk.blue('🔄 Reiniciando el bot...'));
    await stopBot();
    return await startBot();
}

// Menú principal
async function showMenu() {
    showBanner();
    
    const options = [
        { name: 'Iniciar Bot', value: 'start' },
        { name: 'Detener Bot', value: 'stop' },
        { name: 'Reiniciar Bot', value: 'restart' },
        { name: 'Ver Estado', value: 'status' },
        { name: 'Salir', value: 'exit' }
    ];

    // Si el bot está en ejecución, deshabilitar la opción de inicio
    const botRunning = isBotRunning();
    const choices = options.map(option => ({
        ...option,
        disabled: (option.value === 'start' && botRunning) || 
                 (option.value === 'stop' && !botRunning)
    }));

    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Selecciona una opción:',
        choices
    }]);

    switch (action) {
        case 'start':
            await startBot();
            break;
        case 'stop':
            await stopBot();
            break;
        case 'restart':
            await restartBot();
            break;
        case 'status':
            if (isBotRunning()) {
                const pid = parseInt(fs.readFileSync(BOT_PROCESS_FILE, 'utf8'));
                log(chalk.green(`✅ El bot está en ejecución (PID: ${pid})`));
            } else {
                log(chalk.yellow('ℹ️  El bot no está en ejecución.'));
            }
            break;
        case 'exit':
            log(chalk.blue('👋 ¡Hasta luego!'));
            process.exit(0);
            return;
    }

    // Volver al menú después de 1.5 segundos
    setTimeout(showMenu, 1500);
}

// Manejar la salida del programa
process.on('SIGINT', async () => {
    console.log('\n');
    log(chalk.blue('👋 Saliendo del panel de control...'));
    process.exit(0);
});

// Iniciar la aplicación
showMenu();
