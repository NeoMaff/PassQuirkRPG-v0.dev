const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Obtener todos los archivos de comandos
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[ADVERTENCIA] El comando en ${filePath} no tiene las propiedades "data" o "execute" requeridas.`);
        }
    }
}

// Crear una instancia de REST
const rest = new REST({ version: '10' }).setToken(token);

// Desplegar comandos globalmente
(async () => {
    try {
        console.log(`Comenzando el despliegue de ${commands.length} comandos de aplicación (/) globalmente.`);

        // El método put se usa para actualizar todos los comandos globales
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`✅ Se han desplegado correctamente ${data.length} comandos de aplicación (/) globalmente.`);
    } catch (error) {
        console.error('Error al desplegar comandos:', error);
    }
})();
