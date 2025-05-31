const fs = require('fs');
const path = require('path');

// Ruta al directorio de uuid
const uuidDir = path.join(__dirname, 'node_modules', 'uuid');
const v4Dir = path.join(uuidDir, 'v4');

// Crear directorio v4 si no existe
if (!fs.existsSync(v4Dir)) {
    fs.mkdirSync(v4Dir);
}

// Contenido del archivo de parche
const patchContent = `// Archivo de compatibilidad para uuid/v4
const { v4 } = require('..');
module.exports = v4;
module.exports.v4 = v4;`;

// Escribir el archivo de parche
fs.writeFileSync(path.join(v4Dir, 'index.js'), patchContent);

console.log('✅ Parche de compatibilidad para uuid/v4 aplicado correctamente');
