const { spawn } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Configuración
const BOT_SCRIPT = 'index.js';
const LOG_FILE = path.join(__dirname, 'bot.log');
const PID_FILE = path.join(__dirname, '.bot.pid');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let botProcess = null;

// Función para mostrar el menú
function showMenu() {
    console.clear();
    console.log(`${colors.cyan}=== ${colors.bright}CONTROL DEL BOT PASSQUIRK RPG${colors.reset}${colors.cyan} ===${colors.reset}`);
    console.log(`${colors.green}1.${colors.reset} Iniciar bot`);
    console.log(`${colors.red}2.${colors.reset} Detener bot`);
    console.log(`${colors.yellow}3.${colors.reset} Reiniciar bot`);
    console.log(`${colors.blue}4.${colors.reset} Ver logs`);
    console.log(`${colors.magenta}5.${colors.reset} Instalar dependencias`);
    console.log(`${colors.red}6.${colors.reset} Salir`);
    console.log(''.padEnd(40, '='));
    
    rl.question('\nSelecciona una opción (1-6): ', handleMenuInput);
}

// Manejador de entrada del menú
function handleMenuInput(answer) {
    const option = answer.trim();
    
    switch (option) {
        case '1':
            startBot();
            break;
        case '2':
            stopBot();
            break;
        case '3':
            restartBot();
            break;
        case '4':
            showLogs();
            break;
        case '5':
            installDependencies();
            break;
        case '6':
            console.log('\nSaliendo...');
            process.exit(0);
        default:
            console.log('\nOpción no válida. Inténtalo de nuevo.');
            setTimeout(showMenu, 1000);
    }
}

// Funciones de utilidad
function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
    
    // Mostrar en consola
    const color = type === 'error' ? colors.red : 
                 type === 'success' ? colors.green : 
                 type === 'warn' ? colors.yellow : colors.reset;
    console.log(color + logMessage + colors.reset);
    
    // Guardar en archivo
    fs.appendFileSync(LOG_FILE, logMessage, 'utf8');
}

function savePid(pid) {
    fs.writeFileSync(PID_FILE, pid.toString(), 'utf8');
}

function getPid() {
    try {
        if (fs.existsSync(PID_FILE)) {
            return parseInt(fs.readFileSync(PID_FILE, 'utf8'));
        }
    } catch (e) {
        log('Error al leer el archivo PID: ' + e.message, 'error');
    }
    return null;
}

function clearPid() {
    if (fs.existsSync(PID_FILE)) {
        fs.unlinkSync(PID_FILE);
    }
}

// Funciones principales
function startBot() {
    if (botProcess) {
        log('El bot ya está en ejecución.', 'warn');
        return showMenu();
    }
    
    log('Iniciando el bot...', 'info');
    
    botProcess = spawn('node', [BOT_SCRIPT], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
        shell: true,
        windowsHide: true
    });
    
    // Guardar el PID
    savePid(botProcess.pid);
    
    // Manejar salida estándar
    botProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) log(output, 'info');
    });
    
    // Manejar errores
    botProcess.stderr.on('data', (data) => {
        const error = data.toString().trim();
        if (error) log(error, 'error');
    });
    
    // Manejar cierre
    botProcess.on('close', (code) => {
        log(`El bot se ha cerrado con código ${code}`, code === 0 ? 'success' : 'error');
        botProcess = null;
        clearPid();
        if (code !== 0) {
            log('Reiniciando en 5 segundos...', 'warn');
            setTimeout(startBot, 5000);
        } else {
            showMenu();
        }
    });
    
    log(`Bot iniciado con PID: ${botProcess.pid}`, 'success');
    return true;
    }

function stopBot() {
    if (!botProcess) {
        const pid = getPid();
        if (!pid) {
            log('No hay ningún bot en ejecución.', 'warn');
            return showMenu();
        }
        
        try {
            log(`Deteniendo el bot (PID: ${pid})...`, 'info');
            process.kill(pid);
            clearPid();
            log('Bot detenido correctamente.', 'success');
        } catch (e) {
            log(`Error al detener el bot: ${e.message}`, 'error');
            clearPid();
        }
    } else {
        log('Deteniendo el bot...', 'info');
        botProcess.kill();
    }
    
    setTimeout(showMenu, 1000);
}

function restartBot() {
    log('Reiniciando el bot...', 'info');
    
    const stopAndStart = () => {
        if (botProcess) {
            botProcess.removeAllListeners('exit');
            botProcess.on('exit', () => {
                botProcess = null;
                clearPid();
                startBot();
            });
            botProcess.kill();
        } else {
            startBot();
        }
    };
    
    stopAndStart();
}

function showLogs() {
    console.clear();
    console.log(`${colors.cyan}=== ${colors.bright}ÚLTIMOS LOGS${colors.reset}${colors.cyan} ===${colors.reset}\n`);
    
    try {
        if (fs.existsSync(LOG_FILE)) {
            const logs = fs.readFileSync(LOG_FILE, 'utf8');
            const logLines = logs.split('\n').filter(line => line.trim() !== '');
            const lastLogs = logLines.slice(-20); // Mostrar los últimos 20 logs
            
            lastLogs.forEach(log => {
                // Aplicar colores según el nivel de log
                let coloredLog = log;
                if (log.includes('[ERROR]')) {
                    coloredLog = colors.red + log + colors.reset;
                } else if (log.includes('[WARN]')) {
                    coloredLog = colors.yellow + log + colors.reset;
                } else if (log.includes('[SUCCESS]')) {
                    coloredLog = colors.green + log + colors.reset;
                }
                console.log(coloredLog);
            });
        } else {
            console.log('No hay registros disponibles.');
        }
    } catch (e) {
        console.error('Error al leer los logs:', e.message);
    }
    
    console.log('\n' + '='.repeat(40));
    console.log('\nPresiona Enter para volver al menú...');
    
    rl.question('', () => {
        showMenu();
    });
}

function installDependencies() {
    log('Instalando dependencias...', 'info');
    
    const installProcess = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true
    });
    
    installProcess.on('close', (code) => {
        if (code === 0) {
            log('Dependencias instaladas correctamente.', 'success');
        } else {
            log('Error al instalar las dependencias.', 'error');
        }
        showMenu();
    });
}

// Manejo de cierre limpio
process.on('SIGINT', () => {
    log('\nDeteniendo el bot antes de salir...', 'info');
    if (botProcess) {
        botProcess.kill();
    }
    clearPid();
    process.exit(0);
});

// Iniciar la aplicación
console.clear();
log('=== SISTEMA DE CONTROL PASSQUIRK RPG ===', 'info');
log(`Versión: ${require('./package.json').version}`, 'info');
log('Cargando...\n', 'info');

// Verificar si hay un proceso en ejecución
const currentPid = getPid();
if (currentPid) {
    try {
        process.kill(currentPid, 0);
        log(`Se detectó un bot en ejecución (PID: ${currentPid})`, 'warn');
    } catch (e) {
        log('Se encontró un PID obsoleto, limpiando...', 'warn');
        clearPid();
    }
}

// Iniciar el menú principal
setTimeout(showMenu, 1000);
