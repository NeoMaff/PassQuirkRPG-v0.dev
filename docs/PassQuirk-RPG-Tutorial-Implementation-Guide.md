# PassQuirk RPG Tutorial Implementation Guide
## Documentación Completa para Desarrolladores de Discord Bots

---

## 📋 TABLA DE CONTENIDOS

1. [Embed Structure and Design](#1-embed-structure-and-design)
2. [Tutorial Navigation and Flow](#2-tutorial-navigation-and-flow)
3. [Character Creation Integration](#3-character-creation-integration)
4. [Battle Mechanics Tutorial](#4-battle-mechanics-tutorial)
5. [Code Examples and Implementation](#5-code-examples-and-implementation)
6. [Repository Merging and Version Control](#6-repository-merging-and-version-control)
7. [Customization and Expansion](#7-customization-and-expansion)
8. [Detailed Explanation of Changes Made](#8-detailed-explanation-of-changes-made)

---

## 1. EMBED STRUCTURE AND DESIGN

### 1.1 Fundamentos de Discord.js Embeds

El sistema de tutorial PassQuirk RPG utiliza embeds de Discord para crear una experiencia visual rica e interactiva. La estructura básica incluye:

\`\`\`javascript
const { EmbedBuilder } = require('discord.js');

function crearEmbedTutorialPrincipal(seccion, progreso) {
    const embed = new EmbedBuilder()
        .setTitle('🌟 Tutorial PassQuirk RPG 🌟')
        .setDescription(`👑 **Guiado por El Sabio**
🔥 **Sección ${seccion.numero}/${seccion.total}**
✨ **Progreso:** ${Math.round(progreso)}%`)
        .setColor(0x9B59B6)
        .addFields({
            name: `${seccion.emoji} ${seccion.titulo}`,
            value: seccion.descripcion,
            inline: false
        })
        .setFooter({
            text: 'PassQuirk RPG Tutorial System v3.0',
            iconURL: 'https://cdn.discordapp.com/attachments/...'
        })
        .setTimestamp();
    
    return embed;
}
\`\`\`

### 1.2 Implementación de Emojis Animados

Los emojis animados son fundamentales para la experiencia visual:

\`\`\`javascript
const EMOJIS_PASSQUIRK = {
    SPARKLES: "https://cdn3.emoji.gg/emojis/58229-sparklestars.gif",
    CORONA_VERDE: "https://cdn3.emoji.gg/emojis/47232-crown-green.gif",
    FUEGO_VERDE: "https://cdn3.emoji.gg/emojis/7384-greenfire.gif",
    TIERRA_MINECRAFT: "https://cdn3.emoji.gg/emojis/35311-earth-minecraft.gif",
    STAR_PURPLE: "https://cdn3.emoji.gg/emojis/5417_star_purple.gif",
    TADA: "https://cdn3.emoji.gg/emojis/65115-tada.gif",
    CHRISTMAS_GIFT: "https://cdn3.emoji.gg/emojis/69253-christmas-gift.gif",
    GG: "https://cdn3.emoji.gg/emojis/68602-gg.gif"
};

function obtenerEmojiClase(clase) {
    const emojisClase = {
        'Guerrero': EMOJIS_PASSQUIRK.STAR_RED,
        'Mago': EMOJIS_PASSQUIRK.STAR_PURPLE,
        'Arquero': EMOJIS_PASSQUIRK.SPARKLES_VERDE,
        'Sanador': EMOJIS_PASSQUIRK.STAR_YELLOW,
        'Asesino': EMOJIS_PASSQUIRK.SPARKLES,
        'Tanque': EMOJIS_PASSQUIRK.STAR_BLUE
    };
    return emojisClase[clase] || EMOJIS_PASSQUIRK.SPARKLES;
}
\`\`\`

### 1.3 Integración Multimedia

El tutorial incluye videos e imágenes específicas:

\`\`\`javascript
const MULTIMEDIA_PASSQUIRK = {
    VIDEO_ELSABIO: "https://cdn.discordapp.com/attachments/1377005318684410007/1390467403632345218/ElSabio_-_Video_de_cuando_habla.mp4?ex=68685d2e&is=68670bae&hm=45e74a6561a8914e63292da8f05e48bc7a2a7616747b2d13aa42b27ab0f8f7c9&",
    VIDEO_PASSQUIRKS: "https://cdn.discordapp.com/attachments/1377005318684410007/1390467403258794075/El_video_de_presentacion_de_las_passquirk.mp4?ex=68685d2e&is=68670bae&hm=e2ff26631a136ef596fae2b0243bb27ee9b13b41fd26fbae4d4546b21deb92ce&",
    IMAGEN_SLIME: "/slime-tutorial.png",
    IMAGEN_ISLAND: "/island-thumbnail.png"
};

function crearEmbedConVideo(seccion) {
    const embed = new EmbedBuilder()
        .setTitle(seccion.titulo)
        .setDescription(seccion.descripcion)
        .setImage(seccion.imagen || null)
        .setThumbnail(seccion.thumbnail || null);
    
    // Los videos se manejan como attachments separados
    return { embed, video: seccion.video };
}
\`\`\`

### 1.4 Paleta de Colores Oficial

\`\`\`javascript
const COLORES_PASSQUIRK = {
    PRINCIPAL: 0x9B59B6,      // Púrpura principal
    TUTORIAL: 0x3498DB,       // Azul para tutorial
    COMBATE: 0xE74C3C,        // Rojo para combate
    EXITO: 0x2ECC71,          // Verde para éxito
    ADVERTENCIA: 0xF39C12,    // Naranja para advertencias
    ERROR: 0xE67E22           // Rojo oscuro para errores
};
\`\`\`

---

## 2. TUTORIAL NAVIGATION AND FLOW

### 2.1 Sistema de Botones Previous/Next

\`\`\`javascript
const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

function crearBotonesNavegacion(seccionActual, totalSecciones, estadoUsuario) {
    const botones = new ActionRowBuilder();
    
    // Botón Previous
    const botonAnterior = new ButtonBuilder()
        .setCustomId('tutorial_anterior')
        .setLabel('⬅️ Previous')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(seccionActual === 0);
    
    // Botón Next
    const botonSiguiente = new ButtonBuilder()
        .setCustomId('tutorial_siguiente')
        .setLabel('Next ➡️')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(seccionActual >= totalSecciones - 1);
    
    // Botón de acción específica según la sección
    let botonAccion = null;
    if (seccionActual === 2) { // Sección de creación de personaje
        botonAccion = new ButtonBuilder()
            .setCustomId('crear_personaje')
            .setLabel(estadoUsuario.personajeCreado ? '✅ Character Created' : '👤 Create Character')
            .setStyle(estadoUsuario.personajeCreado ? ButtonStyle.Success : ButtonStyle.Danger);
    } else if (seccionActual === 4) { // Sección de combate
        botonAccion = new ButtonBuilder()
            .setCustomId('iniciar_combate')
            .setLabel(estadoUsuario.combateCompletado ? '✅ Battle Won' : '⚔️ Start Battle')
            .setStyle(estadoUsuario.combateCompletado ? ButtonStyle.Success : ButtonStyle.Danger)
            .setDisabled(!estadoUsuario.personajeCreado);
    }
    
    botones.addComponents(botonAnterior, botonSiguiente);
    if (botonAccion) botones.addComponents(botonAccion);
    
    return botones;
}
\`\`\`

### 2.2 Gestión de Estados de Usuario

\`\`\`javascript
class GestorSesionTutorial {
    constructor() {
        this.sesionesActivas = new Map();
        this.tiempoExpiracion = 30 * 60 * 1000; // 30 minutos
    }
    
    obtenerSesionUsuario(userId) {
        if (!this.sesionesActivas.has(userId)) {
            this.sesionesActivas.set(userId, {
                seccionActual: 0,
                personajeCreado: false,
                combateCompletado: false,
                personaje: null,
                fechaInicio: Date.now(),
                ultimaActividad: Date.now()
            });
        }
        
        const sesion = this.sesionesActivas.get(userId);
        sesion.ultimaActividad = Date.now();
        return sesion;
    }
    
    actualizarSesion(userId, datos) {
        const sesion = this.obtenerSesionUsuario(userId);
        Object.assign(sesion, datos);
        this.sesionesActivas.set(userId, sesion);
    }
    
    limpiarSesionesExpiradas() {
        const ahora = Date.now();
        for (const [userId, sesion] of this.sesionesActivas) {
            if (ahora - sesion.ultimaActividad > this.tiempoExpiracion) {
                this.sesionesActivas.delete(userId);
            }
        }
    }
}

const gestorSesiones = new GestorSesionTutorial();

// Limpiar sesiones cada 5 minutos
setInterval(() => {
    gestorSesiones.limpiarSesionesExpiradas();
}, 5 * 60 * 1000);
\`\`\`

### 2.3 Flujo de Tutorial Estructurado

\`\`\`javascript
const SECCIONES_TUTORIAL = [
    {
        id: 'bienvenida_elsabio',
        titulo: 'Bienvenida de El Sabio',
        descripcion: 'El Sabio te da la bienvenida al mundo de PassQuirk RPG',
        emoji: EMOJIS_PASSQUIRK.SPARKLES,
        tipo: 'introduccion',
        video: MULTIMEDIA_PASSQUIRK.VIDEO_ELSABIO,
        contenido: [
            '¡Saludos, valiente explorador! Soy El Sabio, guardián del conocimiento ancestral de PassQuirk.',
            'Has cruzado el portal dimensional que conecta tu mundo con este universo mágico.',
            'En PassQuirk, cada ser desarrolla un poder único llamado **Quirk** al exponerse a la energía dimensional.',
            'Tu aventura está a punto de comenzar, pero primero debes conocer los fundamentos de este mundo.',
            '¿Estás preparado para descubrir tu verdadero potencial y enfrentar los desafíos que te esperan?'
        ],
        prerrequisitos: [],
        completada: false
    },
    {
        id: 'mundo_passquirk',
        titulo: 'El Mundo de PassQuirk',
        descripcion: 'Descubre los reinos, las PassQuirk legendarias y la historia del mundo',
        emoji: EMOJIS_PASSQUIRK.TIERRA_MINECRAFT,
        tipo: 'introduccion',
        video: MULTIMEDIA_PASSQUIRK.VIDEO_PASSQUIRKS,
        contenido: [
            'PassQuirk es un mundo interdimensional compuesto por múltiples reinos conectados por portales.',
            '🔴 **Reino de Akai**: Tierra de guerreros, volcanes y fortalezas de acero.',
            '🟢 **Reino de Say**: Bosques encantados donde la magia y la sabiduría reinan supremas.',
            '🟡 **Reino de Masai**: Desiertos dorados, centro del comercio y la diplomacia.',
            '🟣 **Las 10 PassQuirk**: Esferas legendarias que potencian cualquier Quirk a niveles inhumanos.',
            'Solo combinando las 10 PassQuirk se puede enfrentar al temido Rey Demonio.'
        ],
        prerrequisitos: ['bienvenida_elsabio'],
        completada: false
    }
    // ... más secciones
];

function validarPrerrequisitos(seccionId, estadoUsuario) {
    const seccion = SECCIONES_TUTORIAL.find(s => s.id === seccionId);
    if (!seccion) return false;
    
    return seccion.prerrequisitos.every(prereq => 
        estadoUsuario.seccionesCompletadas.includes(prereq)
    );
}
\`\`\`

---

## 3. CHARACTER CREATION INTEGRATION

### 3.1 Modal de Creación en 5 Pasos

\`\`\`javascript
const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

class CreadorPersonajes {
    constructor() {
        this.sesionesCreacion = new Map();
    }
    
    async iniciarCreacion(interaction) {
        const userId = interaction.user.id;
        this.sesionesCreacion.set(userId, {
            paso: 1,
            datos: {},
            fechaInicio: Date.now()
        });
        
        await this.mostrarPaso1(interaction);
    }
    
    async mostrarPaso1(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('creacion_paso1')
            .setTitle('🌟 Creación de Personaje - Paso 1/5');
        
        const inputNombre = new TextInputBuilder()
            .setCustomId('nombre_personaje')
            .setLabel('¿Cuál es tu nombre, explorador?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Ingresa tu nombre de explorador...')
            .setRequired(true)
            .setMaxLength(50);
        
        const rowNombre = new ActionRowBuilder().addComponents(inputNombre);
        modal.addComponents(rowNombre);
        
        await interaction.showModal(modal);
    }
    
    async procesarPaso1(interaction) {
        const nombre = interaction.fields.getTextInputValue('nombre_personaje');
        const userId = interaction.user.id;
        
        const sesion = this.sesionesCreacion.get(userId);
        sesion.datos.nombre = nombre;
        sesion.paso = 2;
        
        await this.mostrarSeleccionGenero(interaction);
    }
    
    async mostrarSeleccionGenero(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('👤 Selección de Género - Paso 2/5')
            .setDescription('Define la apariencia de tu avatar en PassQuirk')
            .setColor(COLORES_PASSQUIRK.TUTORIAL);
        
        const botones = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('genero_masculino')
                    .setLabel('👨 Masculino')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('genero_femenino')
                    .setLabel('👩 Femenino')
                    .setStyle(ButtonStyle.Primary)
            );
        
        await interaction.reply({
            embeds: [embed],
            components: [botones],
            ephemeral: true
        });
    }
}
\`\`\`

### 3.2 Sistema de Clases y Estadísticas

\`\`\`javascript
const CLASES_DISPONIBLES = {
    GUERRERO: {
        id: 'guerrero',
        nombre: 'Guerrero',
        emoji: '🛡️',
        descripcion: 'Tanque resistente especializado en combate cuerpo a cuerpo',
        estadisticas: {
            vida: 120,
            mana: 40,
            fuerza: 18,
            agilidad: 12,
            inteligencia: 10,
            defensa: 20
        },
        habilidades: ['Golpe Poderoso', 'Defensa Férrea', 'Grito de Guerra']
    },
    MAGO: {
        id: 'mago',
        nombre: 'Mago',
        emoji: '🧙‍♂️',
        descripcion: 'Maestro de las artes arcanas con poderosos hechizos',
        estadisticas: {
            vida: 80,
            mana: 120,
            fuerza: 8,
            agilidad: 14,
            inteligencia: 22,
            defensa: 10
        },
        habilidades: ['Bola de Fuego', 'Escudo Mágico', 'Curación Menor']
    },
    ARQUERO: {
        id: 'arquero',
        nombre: 'Arquero',
        emoji: '🎯',
        descripcion: 'Experto en combate a distancia con precisión letal',
        estadisticas: {
            vida: 100,
            mana: 60,
            fuerza: 16,
            agilidad: 20,
            inteligencia: 14,
            defensa: 12
        },
        habilidades: ['Disparo Certero', 'Lluvia de Flechas', 'Paso Sombra']
    },
    NINJA: {
        id: 'ninja',
        nombre: 'Ninja',
        emoji: '🥷',
        descripcion: 'Asesino sigiloso que ataca desde las sombras',
        estadisticas: {
            vida: 90,
            mana: 70,
            fuerza: 14,
            agilidad: 22,
            inteligencia: 16,
            defensa: 8
        },
        habilidades: ['Ataque Furtivo', 'Invisibilidad', 'Veneno']
    },
    ESPADACHIN: {
        id: 'espadachin',
        nombre: 'Espadachín',
        emoji: '🗡️',
        descripcion: 'Maestro de la espada con técnicas de combate refinadas',
        estadisticas: {
            vida: 110,
            mana: 50,
            fuerza: 20,
            agilidad: 18,
            inteligencia: 12,
            defensa: 14
        },
        habilidades: ['Corte Dimensional', 'Danza de Espadas', 'Contraataque']
    }
};

function crearEmbedSeleccionClase() {
    const embed = new EmbedBuilder()
        .setTitle('⚔️ Selección de Clase - Paso 3/5')
        .setDescription('Elige tu especialización de combate. Cada clase tiene estadísticas y habilidades únicas.')
        .setColor(COLORES_PASSQUIRK.TUTORIAL);
    
    Object.values(CLASES_DISPONIBLES).forEach(clase => {
        embed.addFields({
            name: `${clase.emoji} ${clase.nombre}`,
            value: `${clase.descripcion}\n**HP:** ${clase.estadisticas.vida} | **MP:** ${clase.estadisticas.mana} | **STR:** ${clase.estadisticas.fuerza}`,
            inline: true
        });
    });
    
    return embed;
}
\`\`\`

### 3.3 Bonificaciones por Reino

\`\`\`javascript
const REINOS_DISPONIBLES = {
    AKAI: {
        id: 'akai',
        nombre: 'Reino Rojo: Akai',
        emoji: '🌋',
        descripcion: 'Tierra de guerreros y volcanes. Especializado en combate físico.',
        bonificaciones: {
            fuerza: 5,
            defensa: 3,
            oro: 100
        },
        cultura: 'Sociedad basada en la fuerza y el honor. Los guerreros son venerados.',
        gobierno: 'Monarquía militar dirigida por el Rey Guerrero.'
    },
    SAY: {
        id: 'say',
        nombre: 'Reino Verde: Say',
        emoji: '🌲',
        descripcion: 'Bosques mágicos de sabiduría. Dominio de las artes arcanas.',
        bonificaciones: {
            inteligencia: 5,
            mana: 30,
            oro: 50
        },
        cultura: 'Sistema de castas basado en el conocimiento mágico.',
        gobierno: 'Consejo de Archimagos que gobierna por consenso.'
    },
    MASAI: {
        id: 'masai',
        nombre: 'Reino Amarillo: Masai',
        emoji: '🏜️',
        descripcion: 'Desiertos comerciales. Centro del comercio y la diplomacia.',
        bonificaciones: {
            agilidad: 5,
            oro: 200,
            objetos_raros: 1
        },
        cultura: 'Economía de gremios y casas nobles comerciantes.',
        gobierno: 'República mercantil dirigida por el Consejo de Gremios.'
    },
    BOSQUE_MISTERIOSO: {
        id: 'bosque_misterioso',
        nombre: 'Bosque Misterioso',
        emoji: '🌑',
        descripcion: 'Lugar de secretos antiguos. Bonificación equilibrada.',
        bonificaciones: {
            fuerza: 3,
            agilidad: 3,
            inteligencia: 3,
            defensa: 3
        },
        cultura: 'Habitantes misteriosos que guardan secretos ancestrales.',
        gobierno: 'Estructura desconocida, posiblemente anárquica.'
    },
    CUEVA_OSCURA: {
        id: 'cueva_oscura',
        nombre: 'Cueva Oscura',
        emoji: '🕳️',
        descripcion: 'Peligrosa pero rica en tesoros. Objeto raro garantizado.',
        bonificaciones: {
            objetos_raros: 2,
            oro: 150,
            resistencia_oscuridad: 10
        },
        cultura: 'Supervivientes endurecidos por la adversidad.',
        gobierno: 'Ley del más fuerte, liderazgo por combate.'
    }
};

function aplicarBonificacionesReino(estadisticasBase, reinoId) {
    const reino = REINOS_DISPONIBLES[reinoId];
    if (!reino) return estadisticasBase;
    
    const estadisticasFinales = { ...estadisticasBase };
    
    Object.entries(reino.bonificaciones).forEach(([stat, bonus]) => {
        if (estadisticasFinales[stat] !== undefined) {
            estadisticasFinales[stat] += bonus;
        }
    });
    
    return estadisticasFinales;
}
\`\`\`

---

## 4. BATTLE MECHANICS TUTORIAL

### 4.1 Sistema de Combate por Turnos

\`\`\`javascript
class CombateTutorial {
    constructor(jugador, enemigo) {
        this.estado = {
            jugador: {
                nombre: jugador.nombre,
                hp: jugador.estadisticas.vida,
                hpMax: jugador.estadisticas.vidaMaxima,
                energia: 100,
                energiaMax: 100,
                estadisticas: jugador.estadisticas,
                quirk: jugador.quirk,
                defendiendo: false
            },
            enemigo: {
                nombre: enemigo.nombre,
                hp: enemigo.hp,
                hpMax: enemigo.hpMax,
                nivel: enemigo.nivel,
                ataques: enemigo.ataques,
                imagen: enemigo.imagen
            },
            turno: 'jugador',
            ronda: 1,
            combateTerminado: false,
            victoria: false,
            historialAcciones: []
        };
    }
    
    ejecutarAccion(accion, parametros = {}) {
        if (this.estado.combateTerminado) {
            return { exito: false, mensaje: 'El combate ya ha terminado.' };
        }
        
        let resultado = {};
        
        switch (accion) {
            case 'atacar':
                resultado = this.ejecutarAtaque();
                break;
            case 'defender':
                resultado = this.ejecutarDefensa();
                break;
            case 'usar_pocion':
                resultado = this.usarPocion(parametros.tipoPocion);
                break;
            case 'habilidad_quirk':
                resultado = this.usarHabilidadQuirk();
                break;
            default:
                return { exito: false, mensaje: 'Acción no válida.' };
        }
        
        // Registrar acción en historial
        this.estado.historialAcciones.push({
            ronda: this.estado.ronda,
            turno: this.estado.turno,
            accion: accion,
            resultado: resultado
        });
        
        // Verificar fin de combate
        this.verificarFinCombate();
        
        // Si el combate continúa y fue turno del jugador, ejecutar turno enemigo
        if (!this.estado.combateTerminado && this.estado.turno === 'jugador') {
            this.estado.turno = 'enemigo';
            setTimeout(() => this.turnoEnemigo(), 1500);
        }
        
        return resultado;
    }
    
    ejecutarAtaque() {
        const danoBase = Math.floor(Math.random() * 10) + 10; // 10-19 daño base
        const modificadorFuerza = Math.floor(this.estado.jugador.estadisticas.fuerza / 5);
        const danoTotal = danoBase + modificadorFuerza;
        
        this.estado.enemigo.hp = Math.max(0, this.estado.enemigo.hp - danoTotal);
        
        return {
            exito: true,
            mensaje: `¡Atacaste al ${this.estado.enemigo.nombre} por ${danoTotal} puntos de daño!`,
            dano: danoTotal,
            hpEnemigo: this.estado.enemigo.hp
        };
    }
    
    ejecutarDefensa() {
        this.estado.jugador.defendiendo = true;
        
        return {
            exito: true,
            mensaje: 'Te preparas para defenderte. El próximo ataque hará 50% menos daño.',
            efecto: 'defensa_activa'
        };
    }
    
    usarPocion(tipo = 'vida') {
        if (tipo === 'vida') {
            const curacion = 25;
            const hpAnterior = this.estado.jugador.hp;
            this.estado.jugador.hp = Math.min(
                this.estado.jugador.hpMax, 
                this.estado.jugador.hp + curacion
            );
            const curacionReal = this.estado.jugador.hp - hpAnterior;
            
            return {
                exito: true,
                mensaje: `Usaste una Poción de Vida y recuperaste ${curacionReal} HP.`,
                curacion: curacionReal,
                hpJugador: this.estado.jugador.hp
            };
        } else if (tipo === 'mana') {
            const restauracion = 20;
            const energiaAnterior = this.estado.jugador.energia;
            this.estado.jugador.energia = Math.min(
                this.estado.jugador.energiaMax,
                this.estado.jugador.energia + restauracion
            );
            const restauracionReal = this.estado.jugador.energia - energiaAnterior;
            
            return {
                exito: true,
                mensaje: `Usaste una Poción de Maná y recuperaste ${restauracionReal} puntos de energía.`,
                restauracion: restauracionReal,
                energiaJugador: this.estado.jugador.energia
            };
        }
    }
    
    usarHabilidadQuirk() {
        const costoEnergia = 20;
        
        if (this.estado.jugador.energia < costoEnergia) {
            return {
                exito: false,
                mensaje: 'No tienes suficiente energía para usar tu Quirk.',
                energiaRequerida: costoEnergia,
                energiaActual: this.estado.jugador.energia
            };
        }
        
        const danoBase = Math.floor(Math.random() * 15) + 15; // 15-29 daño
        const modificadorInteligencia = Math.floor(this.estado.jugador.estadisticas.inteligencia / 3);
        const danoTotal = danoBase + modificadorInteligencia;
        
        this.estado.jugador.energia -= costoEnergia;
        this.estado.enemigo.hp = Math.max(0, this.estado.enemigo.hp - danoTotal);
        
        return {
            exito: true,
            mensaje: `¡Usaste tu Quirk "${this.estado.jugador.quirk}" por ${danoTotal} puntos de daño!`,
            dano: danoTotal,
            energiaGastada: costoEnergia,
            hpEnemigo: this.estado.enemigo.hp,
            energiaJugador: this.estado.jugador.energia
        };
    }
    
    turnoEnemigo() {
        if (this.estado.combateTerminado) return;
        
        // Seleccionar ataque aleatorio del enemigo
        const ataqueEnemigo = this.estado.enemigo.ataques[
            Math.floor(Math.random() * this.estado.enemigo.ataques.length)
        ];
        
        let danoEnemigo = Math.floor(Math.random() * 8) + 5; // 5-12 daño base
        
        // Aplicar reducción por defensa si el jugador se defendió
        if (this.estado.jugador.defendiendo) {
            danoEnemigo = Math.floor(danoEnemigo / 2);
            this.estado.jugador.defendiendo = false;
        }
        
        this.estado.jugador.hp = Math.max(0, this.estado.jugador.hp - danoEnemigo);
        
        const resultado = {
            exito: true,
            mensaje: `El ${this.estado.enemigo.nombre} usó ${ataqueEnemigo} y te hizo ${danoEnemigo} puntos de daño.`,
            ataque: ataqueEnemigo,
            dano: danoEnemigo,
            hpJugador: this.estado.jugador.hp
        };
        
        // Registrar acción enemiga
        this.estado.historialAcciones.push({
            ronda: this.estado.ronda,
            turno: 'enemigo',
            accion: ataqueEnemigo,
            resultado: resultado
        });
        
        // Verificar fin de combate
        this.verificarFinCombate();
        
        // Cambiar turno al jugador
        if (!this.estado.combateTerminado) {
            this.estado.turno = 'jugador';
            this.estado.ronda++;
        }
        
        return resultado;
    }
    
    verificarFinCombate() {
        if (this.estado.enemigo.hp <= 0) {
            this.estado.combateTerminado = true;
            this.estado.victoria = true;
        } else if (this.estado.jugador.hp <= 0) {
            this.estado.combateTerminado = true;
            this.estado.victoria = false;
        }
    }
    
    obtenerEstadoCombate() {
        return {
            ...this.estado,
            porcentajeHpJugador: (this.estado.jugador.hp / this.estado.jugador.hpMax) * 100,
            porcentajeEnergiaJugador: (this.estado.jugador.energia / this.estado.jugador.energiaMax) * 100,
            porcentajeHpEnemigo: (this.estado.enemigo.hp / this.estado.enemigo.hpMax) * 100
        };
    }
}
\`\`\`

### 4.2 Visualización de Estado de Combate

\`\`\`javascript
function crearEmbedCombate(estadoCombate) {
    const embed = new EmbedBuilder()
        .setTitle('⚔️ Combate Tutorial - PassQuirk RPG')
        .setColor(COLORES_PASSQUIRK.COMBATE)
        .setTimestamp();
    
    // Campo del jugador
    const barraHpJugador = crearBarraProgreso(
        estadoCombate.jugador.hp, 
        estadoCombate.jugador.hpMax, 
        '❤️'
    );
    const barraEnergiaJugador = crearBarraProgreso(
        estadoCombate.jugador.energia, 
        estadoCombate.jugador.energiaMax, 
        '⚡'
    );
    
    embed.addFields({
        name: `👤 ${estadoCombate.jugador.nombre}`,
        value: `${barraHpJugador}\n${barraEnergiaJugador}`,
        inline: true
    });
    
    // Campo del enemigo
    const barraHpEnemigo = crearBarraProgreso(
        estadoCombate.enemigo.hp, 
        estadoCombate.enemigo.hpMax, 
        '💀'
    );
    
    embed.addFields({
        name: `🟢 ${estadoCombate.enemigo.nombre} (Nivel ${estadoCombate.enemigo.nivel})`,
        value: barraHpEnemigo,
        inline: true
    });
    
    // Campo de estado actual
    let estadoActual = '';
    if (estadoCombate.combateTerminado) {
        if (estadoCombate.victoria) {
            estadoActual = '🎉 ¡Victoria! Has derrotado al enemigo.';
        } else {
            estadoActual = '💀 Derrota. El enemigo te ha vencido.';
        }
    } else {
        if (estadoCombate.turno === 'jugador') {
            estadoActual = '🎯 Es tu turno. Elige una acción.';
        } else {
            estadoActual = '⏳ Turno del enemigo...';
        }
    }
    
    embed.addFields({
        name: '📊 Estado del Combate',
        value: estadoActual,
        inline: false
    });
    
    // Mostrar última acción si existe
    if (estadoCombate.historialAcciones.length > 0) {
        const ultimaAccion = estadoCombate.historialAcciones[estadoCombate.historialAcciones.length - 1];
        embed.addFields({
            name: '📝 Última Acción',
            value: ultimaAccion.resultado.mensaje,
            inline: false
        });
    }
    
    return embed;
}

function crearBarraProgreso(actual, maximo, emoji) {
    const porcentaje = (actual / maximo) * 100;
    const bloques = Math.floor(porcentaje / 10);
    const barraLlena = '█'.repeat(bloques);
    const barraVacia = '░'.repeat(10 - bloques);
    
    return `${emoji} **${actual}/${maximo}** [${barraLlena}${barraVacia}] ${Math.round(porcentaje)}%`;
}

function crearBotonesCombate(estadoCombate) {
    if (estadoCombate.combateTerminado || estadoCombate.turno !== 'jugador') {
        return null;
    }
    
    const fila1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('combate_atacar')
                .setLabel('⚔️ Atacar')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('combate_defender')
                .setLabel('🛡️ Defender')
                .setStyle(ButtonStyle.Primary)
        );
    
    const fila2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('combate_pocion_vida')
                .setLabel('🧪 Poción Vida')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('combate_quirk')
                .setLabel('✨ Usar Quirk')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(estadoCombate.jugador.energia < 20)
        );
    
    return [fila1, fila2];
}
\`\`\`

### 4.3 Enemigos del Tutorial

\`\`\`javascript
const ENEMIGOS_TUTORIAL = {
    SLIME_ENTRENAMIENTO: {
        id: 'slime_tutorial',
        nombre: 'Slime de Entrenamiento',
        hp: 30,
        hpMax: 30,
        nivel: 1,
        imagen: '/slime-tutorial.png',
        ataques: ['Salto Pegajoso', 'Burbuja Ácida'],
        descripcion: 'Un slime básico perfecto para practicar combate.',
        recompensas: {
            experiencia: 15,
            oro: 10,
            objetos: ['Poción de Vida']
        },
        debilidades: ['Ataques Físicos'],
        resistencias: ['Ataques Mágicos']
    },
    GOBLIN_NOVATO: {
        id: 'goblin_novato',
        nombre: 'Goblin Novato',
        hp: 50,
        hpMax: 50,
        nivel: 2,
        imagen: '/goblin-tutorial.png',
        ataques: ['Golpe de Maza', 'Grito de Guerra', 'Lanzar Piedra'],
        descripcion: 'Un goblin joven que busca pelea.',
        recompensas: {
            experiencia: 25,
            oro: 20,
            objetos: ['Poción de Vida', 'Maza Rústica']
        },
        debilidades: ['Ataques Mágicos'],
        resistencias: ['Ataques Físicos']
    }
};

function crearEnemigoPorId(enemigoId) {
    const plantilla = ENEMIGOS_TUTORIAL[enemigoId];
    if (!plantilla) {
        throw new Error(`Enemigo ${enemigoId} no encontrado`);
    }
    
    return {
        ...plantilla,
        hp: plantilla.hpMax, // Restaurar HP completo
        estado: {
            efectos: [],
            modificadores: {}
        }
    };
}
\`\`\`

---

## 5. CODE EXAMPLES AND IMPLEMENTATION

### 5.1 Estructura Principal del Bot

\`\`\`javascript
// index.js - Archivo principal del bot
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Crear cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

// Colecciones para comandos y gestores
client.commands = new Collection();
client.tutorialSessions = new Map();
client.combateSessions = new Map();

// Cargar comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`✅ Comando cargado: ${command.data.name}`);
    } else {
        console.log(`⚠️ Comando en ${filePath} no tiene las propiedades requeridas.`);
    }
}

// Cargar gestores de eventos
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`✅ Evento cargado: ${event.name}`);
}

// Manejo de errores
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Iniciar bot
client.login(process.env.DISCORD_TOKEN);
\`\`\`

### 5.2 Comando Slash Principal

\`\`\`javascript
// commands/passquirkrpg.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const TutorialManager = require('../utils/tutorial-manager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('passquirkrpg')
        .setDescription('🌟 Inicia tu aventura en PassQuirk RPG')
        .addSubcommand(subcommand =>
            subcommand
                .setName('tutorial')
                .setDescription('Comienza el tutorial interactivo')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('perfil')
                .setDescription('Ve tu perfil de explorador')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('reset')
                .setDescription('Reinicia tu progreso del tutorial')
        ),
    
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        
        try {
            switch (subcommand) {
                case 'tutorial':
                    await this.iniciarTutorial(interaction);
                    break;
                case 'perfil':
                    await this.mostrarPerfil(interaction);
                    break;
                case 'reset':
                    await this.resetearProgreso(interaction);
                    break;
                default:
                    await interaction.reply({
                        content: '❌ Subcomando no reconocido.',
                        ephemeral: true
                    });
            }
        } catch (error) {
            console.error('Error en comando passquirkrpg:', error);
            
            const errorEmbed = new EmbedBuilder()
                .setTitle('❌ Error del Sistema')
                .setDescription('Ha ocurrido un error inesperado. Por favor, intenta de nuevo.')
                .setColor(0xE74C3C)
                .setTimestamp();
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
    
    async iniciarTutorial(interaction) {
        const userId = interaction.user.id;
        const tutorialManager = new TutorialManager();
        
        // Verificar si ya tiene una sesión activa
        const sesionExistente = tutorialManager.obtenerSesion(userId);
        
        if (sesionExistente && sesionExistente.seccionActual > 0) {
            const embed = new EmbedBuilder()
                .setTitle('🔄 Tutorial en Progreso')
                .setDescription(`Ya tienes un tutorial en progreso en la sección ${sesionExistente.seccionActual + 1}.`)
                .setColor(0xF39C12);
            
            const botones = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('tutorial_continuar')
                        .setLabel('📖 Continuar Tutorial')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('tutorial_reiniciar')
                        .setLabel('🔄 Reiniciar')
                        .setStyle(ButtonStyle.Secondary)
                );
            
            await interaction.reply({
                embeds: [embed],
                components: [botones],
                ephemeral: true
            });
            return;
        }
        
        // Crear nueva sesión de tutorial
        await tutorialManager.iniciarTutorial(interaction);
    },
    
    async mostrarPerfil(interaction) {
        const userId = interaction.user.id;
        const tutorialManager = new TutorialManager();
        const sesion = tutorialManager.obtenerSesion(userId);
        
        if (!sesion) {
            const embed = new EmbedBuilder()
                .setTitle('👤 Perfil de Explorador')
                .setDescription('No has comenzado tu aventura en PassQuirk RPG aún.\nUsa `/passquirkrpg tutorial` para empezar.')
                .setColor(0x95A5A6);
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }
        
        const embed = new EmbedBuilder()
            .setTitle('👤 Perfil de Explorador PassQuirk')
            .setColor(0x9B59B6)
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                {
                    name: '📊 Progreso del Tutorial',
                    value: `Sección ${sesion.seccionActual + 1}/6 (${Math.round(((sesion.seccionActual + 1) / 6) * 100)}%)`,
                    inline: true
                },
                {
                    name: '👤 Personaje',
                    value: sesion.personajeCreado ? '✅ Creado' : '❌ No creado',
                    inline: true
                },
                {
                    name: '⚔️ Combate Tutorial',
                    value: sesion.combateCompletado ? '✅ Completado' : '❌ Pendiente',
                    inline: true
                }
            )
            .setFooter({
                text: `Explorador desde ${new Date(sesion.fechaInicio).toLocaleDateString()}`
            })
            .setTimestamp();
        
        if (sesion.personaje) {
            embed.addFields({
                name: '🌟 Información del Personaje',
                value: `**Nombre:** ${sesion.personaje.nombre}\n**Clase:** ${sesion.personaje.clase}\n**Reino:** ${sesion.personaje.reino}\n**Quirk:** ${sesion.personaje.quirk}`,
                inline: false
            });
        }
        
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
    
    async resetearProgreso(interaction) {
        const userId = interaction.user.id;
        const tutorialManager = new TutorialManager();
        
        const embed = new EmbedBuilder()
            .setTitle('⚠️ Confirmar Reinicio')
            .setDescription('¿Estás seguro de que quieres reiniciar todo tu progreso en PassQuirk RPG?\n\n**Esto eliminará:**\n• Progreso del tutorial\n• Personaje creado\n• Historial de combate\n\n**Esta acción no se puede deshacer.**')
            .setColor(0xE74C3C);
        
        const botones = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirmar_reset')
                    .setLabel('✅ Sí, reiniciar')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('cancelar_reset')
                    .setLabel('❌ Cancelar')
                    .setStyle(ButtonStyle.Secondary)
            );
        
        await interaction.reply({
            embeds: [embed],
            components: [botones],
            ephemeral: true
        });
    }
};
\`\`\`

### 5.3 Manejo de Interacciones

\`\`\`javascript
// events/interactionCreate.js
const TutorialManager = require('../utils/tutorial-manager');
const CombateManager = require('../utils/combate-manager');
const CreadorPersonajes = require('../utils/creador-personajes');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        try {
            if (interaction.isChatInputCommand()) {
                await manejarComandoSlash(interaction);
            } else if (interaction.isButton()) {
                await manejarInteraccionBoton(interaction);
            } else if (interaction.isModalSubmit()) {
                await manejarModalSubmit(interaction);
            } else if (interaction.isStringSelectMenu()) {
                await manejarSelectMenu(interaction);
            }
        } catch (error) {
            console.error('Error en interactionCreate:', error);
            
            const errorMessage = {
                content: '❌ Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
                ephemeral: true
            };
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }
};

async function manejarComandoSlash(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);
    
    if (!command) {
        console.error(`No se encontró el comando ${interaction.commandName}.`);
        return;
    }
    
    await command.execute(interaction);
}

async function manejarInteraccionBoton(interaction) {
    const customId = interaction.customId;
    const userId = interaction.user.id;
    
    // Botones del tutorial
    if (customId.startsWith('tutorial_')) {
        const tutorialManager = new TutorialManager();
        await tutorialManager.manejarInteraccion(interaction);
        return;
    }
    
    // Botones de combate
    if (customId.startsWith('combate_')) {
        const combateManager = new CombateManager();
        await combateManager.manejarInteraccion(interaction);
        return;
    }
    
    // Botones de creación de personaje
    if (customId.startsWith('creacion_') || customId.startsWith('genero_') || customId.startsWith('clase_') || customId.startsWith('reino_')) {
        const creadorPersonajes = new CreadorPersonajes();
        await creadorPersonajes.manejarInteraccion(interaction);
        return;
    }
    
    // Botones específicos
    switch (customId) {
        case 'confirmar_reset':
            await confirmarReset(interaction);
            break;
        case 'cancelar_reset':
            await cancelarReset(interaction);
            break;
        default:
            await interaction.reply({
                content: '❌ Interacción no reconocida.',
                ephemeral: true
            });
    }
}

async function manejarModalSubmit(interaction) {
    const customId = interaction.customId;
    
    if (customId.startsWith('creacion_paso')) {
        const creadorPersonajes = new CreadorPersonajes();
        await creadorPersonajes.procesarModal(interaction);
        return;
    }
    
    await interaction.reply({
        content: '❌ Modal no reconocido.',
        ephemeral: true
    });
}

async function manejarSelectMenu(interaction) {
    const customId = interaction.customId;
    
    if (customId.startsWith('seleccionar_')) {
        const creadorPersonajes = new CreadorPersonajes();
        await creadorPersonajes.manejarSeleccion(interaction);
        return;
    }
    
    await interaction.reply({
        content: '❌ Menú de selección no reconocido.',
        ephemeral: true
    });
}

async function confirmarReset(interaction) {
    const userId = interaction.user.id;
    const tutorialManager = new TutorialManager();
    
    // Eliminar sesión del usuario
    tutorialManager.eliminarSesion(userId);
    
    const embed = new EmbedBuilder()
        .setTitle('✅ Progreso Reiniciado')
        .setDescription('Tu progreso en PassQuirk RPG ha sido reiniciado completamente.\nPuedes comenzar de nuevo usando `/passquirkrpg tutorial`.')
        .setColor(0x2ECC71);
    
    await interaction.update({
        embeds: [embed],
        components: []
    });
}

async function cancelarReset(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('❌ Reinicio Cancelado')
        .setDescription('Tu progreso se mantiene intacto.')
        .setColor(0x95A5A6);
    
    await interaction.update({
        embeds: [embed],
        components: []
    });
}
\`\`\`

### 5.4 Gestor de Tutorial

\`\`\`javascript
// utils/tutorial-manager.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

class TutorialManager {
    constructor() {
        this.sesiones = new Map();
        this.secciones = this.cargarSecciones();
        this.tiempoExpiracion = 30 * 60 * 1000; // 30 minutos
        
        // Limpiar sesiones expiradas cada 5 minutos
        setInterval(() => this.limpiarSesionesExpiradas(), 5 * 60 * 1000);
    }
    
    cargarSecciones() {
        try {
            const rutaArchivo = path.join(__dirname, '../data/tutorial-sections.json');
            const datos = fs.readFileSync(rutaArchivo, 'utf8');
            return JSON.parse(datos);
        } catch (error) {
            console.error('Error cargando secciones del tutorial:', error);
            return [];
        }
    }
    
    obtenerSesion(userId) {
        return this.sesiones.get(userId) || null;
    }
    
    crearSesion(userId) {
        const sesion = {
            userId: userId,
            seccionActual: 0,
            personajeCreado: false,
            combateCompletado: false,
            personaje: null,
            fechaInicio: Date.now(),
            ultimaActividad: Date.now(),
            seccionesCompletadas: []
        };
        
        this.sesiones.set(userId, sesion);
        return sesion;
    }
    
    actualizarSesion(userId, datos) {
        const sesion = this.obtenerSesion(userId) || this.crearSesion(userId);
        Object.assign(sesion, datos, { ultimaActividad: Date.now() });
        this.sesiones.set(userId, sesion);
        return sesion;
    }
    
    eliminarSesion(userId) {
        return this.sesiones.delete(userId);
    }
    
    async iniciarTutorial(interaction) {
        const userId = interaction.user.id;
        const sesion = this.crearSesion(userId);
        
        await this.mostrarSeccionActual(interaction, sesion);
    }
    
    async mostrarSeccionActual(interaction, sesion) {
        const seccion = this.secciones[sesion.seccionActual];
        if (!seccion) {
            await this.completarTutorial(interaction, sesion);
            return;
        }
        
        const embed = this.crearEmbedSeccion(seccion, sesion);
        const botones = this.crearBotonesNavegacion(sesion);
        
        const opciones = {
            embeds: [embed],
            components: botones ? [botones] : []
        };
        
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply(opciones);
        } else {
            await interaction.reply(opciones);
        }
    }
    
    crearEmbedSeccion(seccion, sesion) {
        const progreso = ((sesion.seccionActual + 1) / this.secciones.length) * 100;
        
        const embed = new EmbedBuilder()
            .setTitle('🌟 Tutorial PassQuirk RPG 🌟')
            .setDescription(`👑 **Guiado por El Sabio**
🔥 **Sección ${sesion.seccionActual + 1}/${this.secciones.length}**
✨ **Progreso:** ${Math.round(progreso)}%`)
            .setColor(this.obtenerColorSeccion(seccion.tipo))
            .addFields({
                name: `${seccion.emoji} ${seccion.titulo}`,
                value: seccion.descripcion,
                inline: false
            })
            .setFooter({
                text: 'PassQuirk RPG Tutorial System v3.0'
            })
            .setTimestamp();
        
        // Añadir contenido de la sección
        if (seccion.contenido && seccion.contenido.length > 0) {
            const contenidoTexto = seccion.contenido.join('\n\n');
            embed.addFields({
                name: '📖 Contenido',
                value: contenidoTexto.length > 1024 ? contenidoTexto.substring(0, 1021) + '...' : contenidoTexto,
                inline: false
            });
        }
        
        // Añadir imagen si existe
        if (seccion.imagen) {
            embed.setImage(seccion.imagen);
        }
        
        // Añadir thumbnail si existe
        if (seccion.thumbnail) {
            embed.setThumbnail(seccion.thumbnail);
        }
        
        return embed;
    }
    
    obtenerColorSeccion(tipo) {
        const colores = {
            'introduccion': 0x9B59B6,
            'creacion_personaje': 0xE67E22,
            'combate': 0xE74C3C,
            'exploracion': 0x27AE60,
            'final': 0xF1C40F
        };
        return colores[tipo] || 0x9B59B6;
    }
    
    crearBotonesNavegacion(sesion) {
        const botones = new ActionRowBuilder();
        
        // Botón Previous
        const botonAnterior = new ButtonBuilder()
            .setCustomId('tutorial_anterior')
            .setLabel('⬅️ Previous')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(sesion.seccionActual === 0);
        
        // Botón Next
        const botonSiguiente = new ButtonBuilder()
            .setCustomId('tutorial_siguiente')
            .setLabel('Next ➡️')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(sesion.seccionActual >= this.secciones.length - 1);
        
        botones.addComponents(botonAnterior, botonSiguiente);
        
        // Botones específicos según la sección
        const seccion = this.secciones[sesion.seccionActual];
        if (seccion) {
            if (seccion.tipo === 'creacion_personaje') {
                const botonCrear = new ButtonBuilder()
                    .setCustomId('crear_personaje')
                    .setLabel(sesion.personajeCreado ? '✅ Character Created' : '👤 Create Character')
                    .setStyle(sesion.personajeCreado ? ButtonStyle.Success : ButtonStyle.Danger);
                botones.addComponents(botonCrear);
            } else if (seccion.tipo === 'combate') {
                const botonCombate = new ButtonBuilder()
                    .setCustomId('iniciar_combate')
                    .setLabel(sesion.combateCompletado ? '✅ Battle Won' : '⚔️ Start Battle')
                    .setStyle(sesion.combateCompletado ? ButtonStyle.Success : ButtonStyle.Danger)
                    .setDisabled(!sesion.personajeCreado);
                botones.addComponents(botonCombate);
            }
        }
        
        return botones;
    }
    
    async manejarInteraccion(interaction) {
        const userId = interaction.user.id;
        const sesion = this.obtenerSesion(userId);
        
        if (!sesion) {
            await interaction.reply({
                content: '❌ No tienes una sesión de tutorial activa. Usa `/passquirkrpg tutorial` para comenzar.',
                ephemeral: true
            });
            return;
        }
        
        const customId = interaction.customId;
        
        switch (customId) {
            case 'tutorial_anterior':
                await this.navegarAnterior(interaction, sesion);
                break;
            case 'tutorial_siguiente':
                await this.navegarSiguiente(interaction, sesion);
                break;
            case 'tutorial_continuar':
                await this.mostrarSeccionActual(interaction, sesion);
                break;
            case 'tutorial_reiniciar':
                this.eliminarSesion(userId);
                await this.iniciarTutorial(interaction);
                break;
            case 'crear_personaje':
                await this.iniciarCreacionPersonaje(interaction, sesion);
                break;
            case 'iniciar_combate':
                await this.iniciarCombateTutorial(interaction, sesion);
                break;
            default:
                await interaction.reply({
                    content: '❌ Interacción de tutorial no reconocida.',
                    ephemeral: true
                });
        }
    }
    
    async navegarAnterior(interaction, sesion) {
        if (sesion.seccionActual > 0) {
            sesion.seccionActual--;
            this.actualizarSesion(sesion.userId, sesion);
        }
        await this.mostrarSeccionActual(interaction, sesion);
    }
    
    async navegarSiguiente(interaction, sesion) {
        if (sesion.seccionActual < this.secciones.length - 1) {
            // Marcar sección actual como completada
            const seccionId = this.secciones[sesion.seccionActual].id;
            if (!sesion.seccionesCompletadas.includes(seccionId)) {
                sesion.seccionesCompletadas.push(seccionId);
            }
            
            sesion.seccionActual++;
            this.actualizarSesion(sesion.userId, sesion);
        }
        await this.mostrarSeccionActual(interaction, sesion);
    }
    
    async iniciarCreacionPersonaje(interaction, sesion) {
        const CreadorPersonajes = require('./creador-personajes');
        const creador = new CreadorPersonajes();
        await creador.iniciarCreacion(interaction, sesion);
    }
    
    async iniciarCombateTutorial(interaction, sesion) {
        if (!sesion.personajeCreado || !sesion.personaje) {
            await interaction.reply({
                content: '❌ Debes crear tu personaje antes de entrar en combate.',
                ephemeral: true
            });
            return;
        }
        
        const CombateManager = require('./combate-manager');
        const combateManager = new CombateManager();
        await combateManager.iniciarCombateTutorial(interaction, sesion);
    }
    
    async completarTutorial(interaction, sesion) {
        const embed = new EmbedBuilder()
            .setTitle('🎉 ¡Tutorial Completado!')
            .setDescription(`¡Felicitaciones, ${sesion.personaje?.nombre || 'Explorador'}!

Has completado exitosamente el tutorial de PassQuirk RPG.
Ahora tienes acceso a **Space Central**, la ciudad base del mundo PassQuirk.

🏰 **Lugares disponibles:**
• 🏪 Tiendas - Compra equipamiento y pociones
• 📋 Tablón de Misiones - Acepta aventuras
• 🏛️ Gremios - Únete a otros exploradores
• 🌀 Portales - Viaja a diferentes reinos
• 👥 Plaza Central - Interactúa con NPCs

¡Tu verdadera aventura comienza ahora!`)
            .setColor(0xF1C40F)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp();
        
        if (sesion.personaje) {
            embed.addFields({
                name: '🌟 Tu Personaje',
                value: `**Nombre:** ${sesion.personaje.nombre}
**Clase:** ${sesion.personaje.clase}
**Reino:** ${sesion.personaje.reino}
**Quirk:** ${sesion.personaje.quirk}`,
                inline: false
            });
        }
        
        const botonSpaceCentral = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('acceder_space_central')
                    .setLabel('🏰 Entrar a Space Central')
                    .setStyle(ButtonStyle.Success)
            );
        
        await interaction.editReply({
            embeds: [embed],
            components: [botonSpaceCentral]
        });
        
        // Marcar tutorial como completado
        sesion.tutorialCompletado = true;
        this.actualizarSesion(sesion.userId, sesion);
    }
    
    limpiarSesionesExpiradas() {
        const ahora = Date.now();
        let sesionesEliminadas = 0;
        
        for (const [userId, sesion] of this.sesiones) {
            if (ahora - sesion.ultimaActividad > this.tiempoExpiracion) {
                this.sesiones.delete(userId);
                sesionesEliminadas++;
            }
        }
        
        if (sesionesEliminadas > 0) {
            console.log(`🧹 Limpiadas ${sesionesEliminadas} sesiones de tutorial expiradas.`);
        }
    }
}

module.exports = TutorialManager;
\`\`\`

### 5.5 Gestor de Combate

\`\`\`javascript
// utils/combate-manager.js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const CombateTutorial = require('./combate-tutorial');

class CombateManager {
    constructor() {
        this.combatesActivos = new Map();
    }
    
    async iniciarCombateTutorial(interaction, sesionTutorial) {
        const userId = interaction.user.id;
        
        // Verificar si ya tiene un combate activo
        if (this.combatesActivos.has(userId)) {
            await interaction.reply({
                content: '⚔️ Ya tienes un combate en progreso.',
                ephemeral: true
            });
            return;
        }
        
        // Crear enemigo tutorial (Slime)
        const enemigo = {
            nombre: 'Slime de Entrenamiento',
            hp: 30,
            hpMax: 30,
            nivel: 1,
            ataques: ['Salto Pegajoso', 'Burbuja Ácida'],
            imagen: '/slime-tutorial.png'
        };
        
        // Crear instancia de combate
        const combate = new CombateTutorial(sesionTutorial.personaje, enemigo);
        this.combatesActivos.set(userId, combate);
        
        // Mostrar estado inicial del combate
        await this.mostrarEstadoCombate(interaction, combate);
    }
    
    async mostrarEstadoCombate(interaction, combate) {
        const estadoCombate = combate.obtenerEstadoCombate();
        const embed = this.crearEmbedCombate(estadoCombate);
        const botones = this.crearBotonesCombate(estadoCombate);
        
        const opciones = {
            embeds: [embed],
            components: botones || []
        };
        
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply(opciones);
        } else {
            await interaction.reply(opciones);
        }
    }
    
    crearEmbedCombate(estadoCombate) {
        const embed = new EmbedBuilder()
            .setTitle('⚔️ Combate Tutorial - PassQuirk RPG')
            .setColor(0xE74C3C)
            .setTimestamp();
        
        // Información del jugador
        const barraHpJugador = this.crearBarraProgreso(
            estadoCombate.jugador.hp,
            estadoCombate.jugador.hpMax,
            '❤️'
        );
        const barraEnergiaJugador = this.crearBarraProgreso(
            estadoCombate.jugador.energia,
            estadoCombate.jugador.energiaMax,
            '⚡'
        );
        
        embed.addFields({
            name: `👤 ${estadoCombate.jugador.nombre}`,
            value: `${barraHpJugador}\n${barraEnergiaJugador}`,
            inline: true
        });
        
        // Información del enemigo
        const barraHpEnemigo = this.crearBarraProgreso(
            estadoCombate.enemigo.hp,
            estadoCombate.enemigo.hpMax,
            '💀'
        );
        
        embed.addFields({
            name: `🟢 ${estadoCombate.enemigo.nombre} (Nivel ${estadoCombate.enemigo.nivel})`,
            value: barraHpEnemigo,
            inline: true
        });
        
        // Estado actual del combate
        let estadoActual = '';
        if (estadoCombate.combateTerminado) {
            if (estadoCombate.victoria) {
                estadoActual = '🎉 ¡Victoria! Has derrotado al enemigo.';
            } else {
                estadoActual = '💀 Derrota. El enemigo te ha vencido.';
            }
        } else {
            if (estadoCombate.turno === 'jugador') {
                estadoActual = '🎯 Es tu turno. Elige una acción.';
            } else {
                estadoActual = '⏳ Turno del enemigo...';
            }
        }
        
        embed.addFields({
            name: '📊 Estado del Combate',
            value: estadoActual,
            inline: false
        });
        
        // Mostrar última acción
        if (estadoCombate.historialAcciones.length > 0) {
            const ultimaAccion = estadoCombate.historialAcciones[estadoCombate.historialAcciones.length - 1];
            embed.addFields({
                name: '📝 Última Acción',
                value: ultimaAccion.resultado.mensaje,
                inline: false
            });
        }
        
        return embed;
    }
    
    crearBarraProgreso(actual, maximo, emoji) {
        const porcentaje = (actual / maximo) * 100;
        const bloques = Math.floor(porcentaje / 10);
        const barraLlena = '█'.repeat(bloques);
        const barraVacia = '░'.repeat(10 - bloques);
        
        return `${emoji} **${actual}/${maximo}** [${barraLlena}${barraVacia}] ${Math.round(porcentaje)}%`;
    }
    
    crearBotonesCombate(estadoCombate) {
        if (estadoCombate.combateTerminado) {
            const botones = new ActionRowBuilder();
            
            if (estadoCombate.victoria) {
                botones.addComponents(
                    new ButtonBuilder()
                        .setCustomId('combate_continuar_tutorial')
                        .setLabel('📖 Continuar Tutorial')
                        .setStyle(ButtonStyle.Success)
                );
            } else {
                botones.addComponents(
                    new ButtonBuilder()
                        .setCustomId('combate_reintentar')
                        .setLabel('🔄 Intentar de Nuevo')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('combate_salir')
                        .setLabel('🚪 Salir del Combate')
                        .setStyle(ButtonStyle.Secondary)
                );
            }
            
            return [botones];
        }
        
        if (estadoCombate.turno !== 'jugador') {
            return null;
        }
        
        const fila1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('combate_atacar')
                    .setLabel('⚔️ Atacar')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('combate_defender')
                    .setLabel('🛡️ Defender')
                    .setStyle(ButtonStyle.Primary)
            );
        
        const fila2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('combate_pocion_vida')
                    .setLabel('🧪 Poción Vida')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('combate_quirk')
                    .setLabel('✨ Usar Quirk')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(estadoCombate.jugador.energia < 20)
            );
        
        return [fila1, fila2];
    }
    
    async manejarInteraccion(interaction) {
        const userId = interaction.user.id;
        const combate = this.combatesActivos.get(userId);
        
        if (!combate) {
            await interaction.reply({
                content: '❌ No tienes un combate activo.',
                ephemeral: true
            });
            return;
        }
        
        const customId = interaction.customId;
        
        switch (customId) {
            case 'combate_atacar':
                await this.ejecutarAccionCombate(interaction, combate, 'atacar');
                break;
            case 'combate_defender':
                await this.ejecutarAccionCombate(interaction, combate, 'defender');
                break;
            case 'combate_pocion_vida':
                await this.ejecutarAccionCombate(interaction, combate, 'usar_pocion', { tipoPocion: 'vida' });
                break;
            case 'combate_quirk':
                await this.ejecutarAccionCombate(interaction, combate, 'habilidad_quirk');
                break;
            case 'combate_reintentar':
                await this.reintentarCombate(interaction, userId);
                break;
            case 'combate_continuar_tutorial':
                await this.completarCombateTutorial(interaction, userId);
                break;
            case 'combate_salir':
                await this.salirCombate(interaction, userId);
                break;
            default:
                await interaction.reply({
                    content: '❌ Acción de combate no reconocida.',
                    ephemeral: true
                });
        }
    }
    
    async ejecutarAccionCombate(interaction, combate, accion, parametros = {}) {
        await interaction.deferUpdate();
        
        const resultado = combate.ejecutarAccion(accion, parametros);
        
        if (!resultado.exito) {
            await interaction.followUp({
                content: `❌ ${resultado.mensaje}`,
                ephemeral: true
            });
            return;
        }
        
        // Actualizar display del combate
        await this.mostrarEstadoCombate(interaction, combate);
        
        // Si el combate terminó, manejar el resultado
        const estadoCombate = combate.obtenerEstadoCombate();
        if (estadoCombate.combateTerminado) {
            await this.procesarFinCombate(interaction, combate, estadoCombate);
        }
    }
    
    async procesarFinCombate(interaction, combate, estadoCombate) {
        const userId = interaction.user.id;
        
        if (estadoCombate.victoria) {
            // Otorgar recompensas
            const recompensas = {
                experiencia: 15,
                oro: 10,
                objetos: ['Poción de Vida']
            };
            
            const embedRecompensas = new EmbedBuilder()
                .setTitle('🎉 ¡Victoria!')
                .setDescription(`Has derrotado al ${estadoCombate.enemigo.nombre}!`)
                .setColor(0x2ECC71)
                .addFields({
                    name: '🎁 Recompensas Obtenidas',
                    value: `• **${recompensas.experiencia} XP**
• **${recompensas.oro} Oro**
• **${recompensas.objetos.join(', ')}**`,
                    inline: false
                });
            
            await interaction.followUp({
                embeds: [embedRecompensas],
                ephemeral: true
            });
        }
    }
    
    async reintentarCombate(interaction, userId) {
        // Eliminar combate actual
        this.combatesActivos.delete(userId);
        
        // Obtener sesión de tutorial
        const TutorialManager = require('./tutorial-manager');
        const tutorialManager = new TutorialManager();
        const sesion = tutorialManager.obtenerSesion(userId);
        
        if (!sesion) {
            await interaction.reply({
                content: '❌ No se encontró tu sesión de tutorial.',
                ephemeral: true
            });
            return;
        }
        
        // Reiniciar combate
        await this.iniciarCombateTutorial(interaction, sesion);
    }
    
    async completarCombateTutorial(interaction, userId) {
        // Marcar combate como completado en la sesión de tutorial
        const TutorialManager = require('./tutorial-manager');
        const tutorialManager = new TutorialManager();
        const sesion = tutorialManager.obtenerSesion(userId);
        
        if (sesion) {
            sesion.combateCompletado = true;
            tutorialManager.actualizarSesion(userId, sesion);
        }
        
        // Eliminar combate activo
        this.combatesActivos.delete(userId);
        
        await interaction.update({
            content: '✅ Combate tutorial completado. Puedes continuar con el tutorial.',
            embeds: [],
            components: []
        });
    }
    
    async salirCombate(interaction, userId) {
        this.combatesActivos.delete(userId);
        
        await interaction.update({
            content: '🚪 Has salido del combate.',
            embeds: [],
            components: []
        });
    }
}

module.exports = CombateManager;
\`\`\`

---

## 6. REPOSITORY MERGING AND VERSION CONTROL

### 6.1 Comandos Git Esenciales

Para integrar el sistema de tutorial PassQuirk RPG en un bot existente, sigue estos pasos:

\`\`\`bash
# 1. Clonar tu repositorio existente
git clone https://github.com/tu-usuario/tu-bot-discord.git
cd tu-bot-discord

# 2. Crear una nueva rama para la integración
git checkout -b feature/passquirk-tutorial

# 3. Añadir el repositorio del tutorial como remote
git remote add passquirk-tutorial https://github.com/passquirk/tutorial-implementation.git

# 4. Obtener los cambios del repositorio del tutorial
git fetch passquirk-tutorial

# 5. Ver las ramas disponibles
git branch -r

# 6. Fusionar los cambios (permitir historiales no relacionados)
git merge passquirk-tutorial/main --allow-unrelated-histories

# 7. Si hay conflictos, resolverlos manualmente
git status  # Ver archivos en conflicto
# Editar archivos conflictivos
git add archivo-resuelto.js
git commit -m "Resolve merge conflicts for PassQuirk tutorial integration"

# 8. Hacer push de la nueva rama
git push origin feature/passquirk-tutorial

# 9. Crear Pull Request para revisión
# (Usar la interfaz web de GitHub/GitLab)

# 10. Una vez aprobado, fusionar a main
git checkout main
git merge feature/passquirk-tutorial
git push origin main
\`\`\`

### 6.2 Resolución de Conflictos Comunes

#### Conflicto en package.json
\`\`\`json
{
  "name": "tu-bot-discord",
  "version": "1.0.0",
  "dependencies": {
<<<<<<< HEAD
    "discord.js": "^14.13.0",
    "dotenv": "^16.0.0"
=======
    "discord.js": "^14.14.1",
    "dotenv": "^16.0.0",
    "node-cron": "^3.0.2"
>>>>>>> passquirk-tutorial/main
  }
}
\`\`\`

**Resolución:**
\`\`\`json
{
  "name": "tu-bot-discord",
  "version": "1.0.0",
  "dependencies": {
    "discord.js": "^14.14.1",
    "dotenv": "^16.0.0",
    "node-cron": "^3.0.2"
  }
}
\`\`\`

#### Conflicto en index.js
\`\`\`javascript
<<<<<<< HEAD
// Tu código existente
client.on('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});
=======
// Código del tutorial PassQuirk
client.on('ready', () => {
    console.log(`✅ ${client.user.tag} está online!`);
    console.log(`📚 Tutorial PassQuirk RPG cargado`);
});
>>>>>>> passquirk-tutorial/main
\`\`\`

**Resolución:**
\`\`\`javascript
client.on('ready', () => {
    console.log(`✅ ${client.user.tag} está online!`);
    console.log(`📚 Tutorial PassQuirk RPG cargado`);
    // Tu código adicional aquí
});
\`\`\`

### 6.3 Estructura de Directorios Recomendada

Después de la fusión, tu proyecto debería tener esta estructura:

\`\`\`
tu-bot-discord/
├── commands/
│   ├── passquirkrpg.js          # ✅ Nuevo
│   └── tus-comandos-existentes.js
├── events/
│   ├── interactionCreate.js     # ✅ Nuevo/Modificado
│   ├── ready.js                 # ✅ Modificado
│   └── tus-eventos-existentes.js
├── utils/
│   ├── tutorial-manager.js      # ✅ Nuevo
│   ├── combate-manager.js       # ✅ Nuevo
│   ├── creador-personajes.js    # ✅ Nuevo
│   └── tus-utilidades-existentes.js
├── data/
│   ├── tutorial-sections.json   # ✅ Nuevo
│   ├── character-classes.json   # ✅ Nuevo
│   ├── kingdoms.json           # ✅ Nuevo
│   └── tus-datos-existentes.json
├── assets/
│   ├── images/
│   │   ├── slime-tutorial.png   # ✅ Nuevo
│   │   └── tutorial-sabio.png   # ✅ Nuevo
│   └── videos/
│       ├── elsabio-video.mp4    # ✅ Nuevo
│       └── passquirks-video.mp4 # ✅ Nuevo
├── package.json                 # ✅ Modificado
├── index.js                     # ✅ Modificado
├── .env.example                 # ✅ Nuevo
└── README.md                    # ✅ Modificado
\`\`\`

### 6.4 Script de Instalación Automática

Crea un script para automatizar la instalación:

\`\`\`bash
#!/bin/bash
# install-passquirk.sh

echo "🌟 Instalando PassQuirk RPG Tutorial..."

# Verificar que estamos en un repositorio Git
if [ ! -d ".git" ]; then
    echo "❌ Error: No estás en un repositorio Git"
    exit 1
fi

# Crear backup de archivos importantes
echo "📦 Creando backup..."
cp package.json package.json.backup
cp index.js index.js.backup

# Añadir remote del tutorial
echo "🔗 Añadiendo repositorio remoto..."
git remote add passquirk-tutorial https://github.com/passquirk/tutorial-implementation.git 2>/dev/null || echo "Remote ya existe"

# Obtener cambios
echo "📥 Obteniendo cambios..."
git fetch passquirk-tutorial

# Crear rama para la integración
echo "🌿 Creando rama de integración..."
git checkout -b feature/passquirk-tutorial-$(date +%Y%m%d)

# Fusionar cambios
echo "🔀 Fusionando cambios..."
git merge passquirk-tutorial/main --allow-unrelated-histories --no-edit

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar instalación
echo "✅ Verificando instalación..."
if [ -f "commands/passquirkrpg.js" ]; then
    echo "✅ Comando PassQuirk instalado correctamente"
else
    echo "❌ Error: Comando PassQuirk no encontrado"
    exit 1
fi

echo "🎉 ¡Instalación completada!"
echo "📝 Próximos pasos:"
echo "   1. Revisar y resolver cualquier conflicto"
echo "   2. Configurar variables de entorno"
echo "   3. Probar el comando /passquirkrpg"
echo "   4. Hacer commit y push de los cambios"
\`\`\`

### 6.5 Configuración de Variables de Entorno

Crea un archivo `.env.example`:

\`\`\`env
# Discord Bot Configuration
DISCORD_TOKEN=tu_token_de_discord_aqui
CLIENT_ID=tu_client_id_aqui
GUILD_ID=tu_guild_id_para_testing

# PassQuirk RPG Configuration
PASSQUIRK_DEBUG=false
PASSQUIRK_SESSION_TIMEOUT=1800000
PASSQUIRK_MAX_SESSIONS=1000

# Database Configuration (opcional)
DATABASE_URL=postgresql://usuario:password@localhost:5432/passquirk_db

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=logs/passquirk.log
\`\`\`

### 6.6 Mejores Prácticas de Git

#### Commits Descriptivos
\`\`\`bash
# ✅ Buenos commits
git commit -m "feat: add PassQuirk RPG tutorial system"
git commit -m "fix: resolve character creation modal validation"
git commit -m "docs: update README with PassQuirk installation guide"

# ❌ Malos commits
git commit -m "changes"
git commit -m "fix stuff"
git commit -m "update"
\`\`\`

#### Branching Strategy
\`\`\`bash
# Rama principal de desarrollo
main/master

# Ramas de características
feature/passquirk-tutorial
feature/combat-system
feature/character-creation

# Ramas de corrección
hotfix/tutorial-navigation-bug
hotfix/combat-damage-calculation

# Ramas de release
release/v1.0.0
release/v1.1.0
\`\`\`

#### Pre-commit Hooks
\`\`\`javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Ejecutar linting
npm run lint

# Ejecutar tests
npm run test

# Verificar que no hay console.log en producción
if grep -r "console.log" commands/ utils/ --exclude-dir=node_modules; then
    echo "❌ Error: console.log encontrado en código de producción"
    exit 1
fi

echo "✅ Pre-commit checks passed"
\`\`\`

---

## 7. CUSTOMIZATION AND EXPANSION

### 7.1 Añadir Nuevas Secciones al Tutorial

Para expandir el tutorial con nuevas secciones:

\`\`\`javascript
// data/tutorial-sections.json
{
  "secciones": [
    // ... secciones existentes
    {
      "id": "gremios_sistema",
      "titulo": "Sistema de Gremios",
      "descripcion": "Aprende sobre los gremios y cómo unirte a uno",
      "emoji": "🏛️",
      "tipo": "exploracion",
      "contenido": [
        "Los gremios son organizaciones de exploradores que se unen para aventuras grupales.",
        "Cada gremio tiene su especialización: combate, exploración, comercio o investigación.",
        "Unirte a un gremio te otorga beneficios especiales y acceso a misiones exclusivas.",
        "Puedes crear tu propio gremio una vez que alcances el nivel 10."
      ],
      "prerrequisitos": ["space_central_final"],
      "recompensas": {
        "experiencia": 50,
        "oro": 100,
        "objeto": "Insignia de Gremio"
      }
    },
    {
      "id": "passquirk_busqueda",
      "titulo": "Búsqueda de las PassQuirk",
      "descripcion": "Comienza tu búsqueda de las 10 esferas legendarias",
      "emoji": "🔮",
      "tipo": "exploracion",
      "contenido": [
        "Las 10 PassQuirk están esparcidas por todo el multiverso.",
        "Cada PassQuirk está protegida por un guardián poderoso.",
        "Solo los exploradores más valientes pueden enfrentar estos desafíos.",
        "Reunir las 10 PassQuirk es el objetivo final de todo explorador."
      ],
      "prerrequisitos": ["gremios_sistema"],
      "boss_guardian": {
        "nombre": "Guardián de la Primera PassQuirk",
        "nivel": 25,
        "hp": 500,
        "habilidades": ["Rayo Dimensional", "Escudo Cuántico", "Teletransportación"]
      }
    }
  ]
}
\`\`\`

### 7.2 Personalización de Emojis y Colores

\`\`\`javascript
// config/customization.js
const PERSONALIZACION = {
    // Emojis personalizados del servidor
    EMOJIS_SERVIDOR: {
        SPARKLES: '<a:sparkles_custom:123456789>',
        CORONA: '<a:corona_oro:987654321>',
        FUEGO: '<a:fuego_azul:456789123>',
        // Fallbacks a emojis externos si no están disponibles
        FALLBACK: {
            SPARKLES: 'https://cdn3.emoji.gg/emojis/58229-sparklestars.gif',
            CORONA: 'https://cdn3.emoji.gg/emojis/47232-crown-green.gif',
            FUEGO: 'https://cdn3.emoji.gg/emojis/7384-greenfire.gif'
        }
    },
    
    // Colores personalizados
    COLORES_PERSONALIZADOS: {
        PRINCIPAL: 0x7B68EE,      // Slate Blue
        TUTORIAL: 0x20B2AA,       // Light Sea Green
        COMBATE: 0xDC143C,        // Crimson
        EXITO: 0x32CD32,          // Lime Green
        ADVERTENCIA: 0xFF8C00,    // Dark Orange
        ERROR: 0xB22222           // Fire Brick
    },
    
    // Textos personalizables
    TEXTOS: {
        BOT_NAME: 'PassQuirk RPG',
        TUTORIAL_GUIDE: 'El Sabio',
        WELCOME_MESSAGE: '¡Bienvenido a la aventura más épica!',
        FOOTER_TEXT: 'PassQuirk RPG System v3.0'
    }
};

// Función para obtener emoji con fallback
function obtenerEmoji(nombre, guildId = null) {
    if (guildId && PERSONALIZACION.EMOJIS_SERVIDOR[nombre]) {
        // Intentar usar emoji del servidor
        const emojiServidor = PERSONALIZACION.EMOJIS_SERVIDOR[nombre];
        if (emojiServidor.startsWith('<')) {
            return emojiServidor;
        }
    }
    
    // Usar fallback externo
    return PERSONALIZACION.EMOJIS_SERVIDOR.FALLBACK[nombre] || '✨';
}

module.exports = { PERSONALIZACION, obtenerEmoji };
\`\`\`

### 7.3 Expansión del Sistema de Combate

\`\`\`javascript
// utils/combate-avanzado.js
class CombateAvanzado extends CombateTutorial {
    constructor(jugador, enemigo, configuracion = {}) {
        super(jugador, enemigo);
        
        this.configuracion = {
            permitirHuida: true,
            sistemaClimatico: false,
            efectosEstado: true,
            combateGrupal: false,
            ...configuracion
        };
        
        this.efectosActivos = new Map();
        this.clima = null;
    }
    
    // Nuevas acciones de combate
    ejecutarAccionAvanzada(accion, parametros = {}) {
        switch (accion) {
            case 'huir':
                return this.intentarHuida();
            case 'habilidad_especial':
                return this.usarHabilidadEspecial(parametros.habilidadId);
            case 'cambiar_equipo':
                return this.cambiarEquipamiento(parametros.equipoId);
            case 'usar_objeto':
                return this.usarObjetoInventario(parametros.objetoId);
            default:
                return super.ejecutarAccion(accion, parametros);
        }
    }
    
    intentarHuida() {
        if (!this.configuracion.permitirHuida) {
            return {
                exito: false,
                mensaje: 'No puedes huir de este combate.'
            };
        }
        
        const probabilidadHuida = 0.7; // 70% de probabilidad
        const exitoso = Math.random() < probabilidadHuida;
        
        if (exitoso) {
            this.estado.combateTerminado = true;
            this.estado.huida = true;
            return {
                exito: true,
                mensaje: '¡Has logrado huir del combate!'
            };
        } else {
            return {
                exito: false,
                mensaje: 'No pudiste escapar. El enemigo te bloquea el paso.'
            };
        }
    }
    
    usarHabilidadEspecial(habilidadId) {
        const habilidad = this.estado.jugador.habilidadesEspeciales?.find(h => h.id === habilidadId);
        
        if (!habilidad) {
            return {
                exito: false,
                mensaje: 'Habilidad no encontrada.'
            };
        }
        
        if (this.estado.jugador.energia < habilidad.costoEnergia) {
            return {
                exito: false,
                mensaje: `No tienes suficiente energía. Necesitas ${habilidad.costoEnergia} puntos.`
            };
        }
        
        // Ejecutar efecto de la habilidad
        const resultado = this.ejecutarEfectoHabilidad(habilidad);
        
        // Consumir energía
        this.estado.jugador.energia -= habilidad.costoEnergia;
        
        return resultado;
    }
    
    ejecutarEfectoHabilidad(habilidad) {
        switch (habilidad.tipo) {
            case 'dano_multiple':
                const dano = this.calcularDanoHabilidad(habilidad);
                this.estado.enemigo.hp = Math.max(0, this.estado.enemigo.hp - dano);
                return {
                    exito: true,
                    mensaje: `¡${habilidad.nombre} causó ${dano} puntos de daño!`,
                    dano: dano
                };
                
            case 'curacion':
                const curacion = habilidad.potencia;
                const hpAnterior = this.estado.jugador.hp;
                this.estado.jugador.hp = Math.min(
                    this.estado.jugador.hpMax,
                    this.estado.jugador.hp + curacion
                );
                const curacionReal = this.estado.jugador.hp - hpAnterior;
                return {
                    exito: true,
                    mensaje: `${habilidad.nombre} te curó ${curacionReal} puntos de vida.`,
                    curacion: curacionReal
                };
                
            case 'efecto_estado':
                this.aplicarEfectoEstado(habilidad.efecto, habilidad.duracion);
                return {
                    exito: true,
                    mensaje: `${habilidad.nombre} aplicó el efecto ${habilidad.efecto.nombre}.`
                };
                
            default:
                return {
                    exito: false,
                    mensaje: 'Tipo de habilidad no reconocido.'
                };
        }
    }
    
    aplicarEfectoEstado(efecto, duracion) {
        this.efectosActivos.set(efecto.id, {
            ...efecto,
            turnosRestantes: duracion,
            aplicadoEn: this.estado.ronda
        });
    }
    
    procesarEfectosEstado() {
        for (const [efectoId, efecto] of this.efectosActivos) {
            // Aplicar efecto
            this.aplicarEfectoPorTurno(efecto);
            
            // Reducir duración
            efecto.turnosRestantes--;
            
            // Eliminar si expiró
            if (efecto.turnosRestantes <= 0) {
                this.efectosActivos.delete(efectoId);
            }
        }
    }
    
    aplicarEfectoPorTurno(efecto) {
        switch (efecto.tipo) {
            case 'veneno':
                const danoVeneno = Math.floor(this.estado.jugador.hpMax * 0.05); // 5% HP máximo
                this.estado.jugador.hp = Math.max(0, this.estado.jugador.hp - danoVeneno);
                break;
                
            case 'regeneracion':
                const curacionRegen = Math.floor(this.estado.jugador.hpMax * 0.03); // 3% HP máximo
                this.estado.jugador.hp = Math.min(
                    this.estado.jugador.hpMax,
                    this.estado.jugador.hp + curacionRegen
                );
                break;
                
            case 'fuerza_aumentada':
                // El efecto se aplica en el cálculo de daño
                break;
        }
    }
}

// Definición de habilidades especiales
const HABILIDADES_ESPECIALES = {
    GUERRERO: [
        {
            id: 'golpe_devastador',
            nombre: 'Golpe Devastador',
            descripcion: 'Un ataque poderoso que causa daño doble',
            tipo: 'dano_multiple',
            costoEnergia: 30,
            potencia: 2.0,
            cooldown: 3
        },
        {
            id: 'grito_guerra',
            nombre: 'Grito de Guerra',
            descripcion: 'Aumenta tu fuerza por 3 turnos',
            tipo: 'efecto_estado',
            costoEnergia: 25,
            efecto: {
                id: 'fuerza_aumentada',
                nombre: 'Fuerza Aumentada',
                tipo: 'fuerza_aumentada',
                modificador: 1.5
            },
            duracion: 3
        }
    ],
    MAGO: [
        {
            id: 'meteoro',
            nombre: 'Meteoro',
            descripcion: 'Invoca un meteoro que causa gran daño',
            tipo: 'dano_multiple',
            costoEnergia: 40,
            potencia: 2.5,
            cooldown: 4
        },
        {
            id: 'escudo_magico',
            nombre: 'Escudo Mágico',
            descripcion: 'Reduce el daño recibido por 5 turnos',
            tipo: 'efecto_estado',
            costoEnergia: 30,
            efecto: {
                id: 'escudo_magico',
                nombre: 'Escudo Mágico',
                tipo: 'reduccion_dano',
                modificador: 0.5
            },
            duracion: 5
        }
    ]
};

module.exports = { CombateAvanzado, HABILIDADES_ESPECIALES };
\`\`\`

### 7.4 Sistema de Logros y Progreso

\`\`\`javascript
// utils/sistema-logros.js
class SistemaLogros {
    constructor() {
        this.logros = this.cargarLogros();
        this.progresosUsuarios = new Map();
    }
    
    cargarLogros() {
        return {
            TUTORIAL_COMPLETADO: {
                id: 'tutorial_completado',
                nombre: 'Primer Paso',
                descripcion: 'Completa el tutorial de PassQuirk RPG',
                icono: '🎓',
                recompensas: {
                    experiencia: 100,
                    oro: 500,
                    titulo: 'Graduado'
                }
            },
            PRIMER_COMBATE: {
                id: 'primer_combate',
                nombre: 'Bautismo de Fuego',
                descripcion: 'Gana tu primer combate',
                icono: '⚔️',
                recompensas: {
                    experiencia: 50,
                    oro: 200
                }
            },
            CREADOR_PERSONAJE: {
                id: 'creador_personaje',
                nombre: 'Identidad Forjada',
                descripcion: 'Crea tu primer personaje',
                icono: '👤',
                recompensas: {
                    experiencia: 25,
                    oro: 100
                }
            },
            EXPLORADOR_REINOS: {
                id: 'explorador_reinos',
                nombre: 'Viajero Dimensional',
                descripcion: 'Visita los 3 reinos principales',
                icono: '🌍',
                recompensas: {
                    experiencia: 200,
                    oro: 1000,
                    objeto: 'Brújula Dimensional'
                }
            },
            COLECCIONISTA_PASSQUIRK: {
                id: 'coleccionista_passquirk',
                nombre: 'Buscador de Leyendas',
                descripcion: 'Encuentra tu primera PassQuirk',
                icono: '🔮',
                recompensas: {
                    experiencia: 500,
                    oro: 2000,
                    titulo: 'Portador de PassQuirk'
                }
            }
        };
    }
    
    verificarLogro(userId, logroId, progreso = {}) {
        const logro = this.logros[logroId];
        if (!logro) return false;
        
        const progresoUsuario = this.obtenerProgreso(userId);
        
        // Verificar si ya tiene el logro
        if (progresoUsuario.logrosObtenidos.includes(logroId)) {
            return false;
        }
        
        // Verificar condiciones específicas del logro
        const cumpleCondiciones = this.verificarCondicionesLogro(logroId, progreso, progresoUsuario);
        
        if (cumpleCondiciones) {
            this.otorgarLogro(userId, logroId);
            return true;
        }
        
        return false;
    }
    
    verificarCondicionesLogro(logroId, progreso, progresoUsuario) {
        switch (logroId) {
            case 'TUTORIAL_COMPLETADO':
                return progreso.tutorialCompletado === true;
                
            case 'PRIMER_COMBATE':
                return progreso.combateGanado === true;
                
            case 'CREADOR_PERSONAJE':
                return progreso.personajeCreado === true;
                
            case 'EXPLORADOR_REINOS':
                return progresoUsuario.reinosVisitados >= 3;
                
            case 'COLECCIONISTA_PASSQUIRK':
                return progresoUsuario.passquirksEncontradas >= 1;
                
            default:
                return false;
        }
    }
    
    otorgarLogro(userId, logroId) {
        const logro = this.logros[logroId];
        const progresoUsuario = this.obtenerProgreso(userId);
        
        // Añadir logro a la lista
        progresoUsuario.logrosObtenidos.push(logroId);
        progresoUsuario.fechaUltimoLogro = Date.now();
        
        // Aplicar recompensas
        if (logro.recompensas) {
            this.aplicarRecompensas(userId, logro.recompensas);
        }
        
        this.progresosUsuarios.set(userId, progresoUsuario);
        
        return logro;
    }
    
    aplicarRecompensas(userId, recompensas) {
        const progresoUsuario = this.obtenerProgreso(userId);
        
        if (recompensas.experiencia) {
            progresoUsuario.experienciaTotal += recompensas.experiencia;
        }
        
        if (recompensas.oro) {
            progresoUsuario.oro += recompensas.oro;
        }
        
        if (recompensas.titulo) {
            progresoUsuario.titulos.push(recompensas.titulo);
        }
        
        if (recompensas.objeto) {
            progresoUsuario.inventario.push({
                nombre: recompensas.objeto,
                tipo: 'Recompensa de Logro',
                fechaObtenido: Date.now()
            });
        }
    }
    
    obtenerProgreso(userId) {
        if (!this.progresosUsuarios.has(userId)) {
            this.progresosUsuarios.set(userId, {
                userId: userId,
                logrosObtenidos: [],
                experienciaTotal: 0,
                oro: 0,
                titulos: [],
                inventario: [],
                reinosVisitados: 0,
                passquirksEncontradas: 0,
                combatesGanados: 0,
                fechaCreacion: Date.now(),
                fechaUltimoLogro: null
            });
        }
        
        return this.progresosUsuarios.get(userId);
    }
    
    crearEmbedLogro(logro) {
        return new EmbedBuilder()
            .setTitle('🏆 ¡Logro Desbloqueado!')
            .setDescription(`**${logro.icono} ${logro.nombre}**\n${logro.descripcion}`)
            .setColor(0xFFD700)
            .addFields({
                name: '🎁 Recompensas',
                value: this.formatearRecompensas(logro.recompensas),
                inline: false
            })
            .setTimestamp();
    }
    
    formatearRecompensas(recompensas) {
        const lineas = [];
        
        if (recompensas.experiencia) {
            lineas.push(`• **${recompensas.experiencia} XP**`);
        }
        
        if (recompensas.oro) {
            lineas.push(`• **${recompensas.oro} Oro**`);
        }
        
        if (recompensas.titulo) {
            lineas.push(`• **Título:** ${recompensas.titulo}`);
        }
        
        if (recompensas.objeto) {
            lineas.push(`• **Objeto:** ${recompensas.objeto}`);
        }
        
        return lineas.join('\n') || 'Sin recompensas adicionales';
    }
}

module.exports = SistemaLogros;
\`\`\`

---

## 8. DETAILED EXPLANATION OF CHANGES MADE

### 8.1 Archivos Nuevos Añadidos

#### Comandos
- **`commands/passquirkrpg.js`** - Comando principal del sistema
  - Implementa slash command con subcomandos (tutorial, perfil, reset)
  - Maneja la inicialización del tutorial
  - Gestiona el estado de sesiones de usuario
  - Incluye validación de errores y manejo de excepciones

#### Gestores de Sistema
- **`utils/tutorial-manager.js`** - Gestor principal del tutorial
  - Clase TutorialManager para manejar sesiones de usuario
  - Sistema de navegación Previous/Next
  - Gestión de progreso y validación de prerrequisitos
  - Limpieza automática de sesiones expiradas

- **`utils/combate-manager.js`** - Gestor del sistema de combate
  - Clase CombateManager para combates tutorial
  - Integración con el sistema de tutorial
  - Manejo de estados de combate y acciones de usuario
  - Sistema de recompensas post-combate

- **`utils/creador-personajes.js`** - Sistema de creación de personajes
  - Modal de creación en 5 pasos
  - Validación de datos de entrada
  - Aplicación de bonificaciones por reino y clase
  - Generación de Quirks aleatorios

- **`utils/combate-tutorial.js`** - Lógica de combate por turnos
  - Sistema de HP, energía y estadísticas
  - Acciones de combate (atacar, defender, usar objetos, Quirks)
  - Mecánicas de daño y curación
  - Historial de acciones y estados de combate

#### Datos y Configuración
- **`data/tutorial-sections.json`** - Definición de secciones del tutorial
  - 6 secciones estructuradas con contenido, emojis y prerrequisitos
  - Configuración de tipos de sección y flujo de navegación
  - Integración multimedia (videos e imágenes)

- **`data/character-classes.json`** - Definición de clases de personajes
  - 5 clases con estadísticas balanceadas
  - Habilidades especiales por clase
  - Descripciones y emojis representativos

- **`data/kingdoms.json`** - Configuración de reinos
  - 5 reinos con bonificaciones únicas
  - Lore y descripción cultural
  - Sistema de gobierno y especialidades

#### Eventos
- **`events/interactionCreate.js`** - Manejo centralizado de interacciones
  - Router para diferentes tipos de interacciones
  - Manejo de botones, modales y select menus
  - Sistema de error handling robusto

#### Assets Multimedia
- **`assets/images/slime-tutorial.png`** - Imagen del enemigo tutorial
- **`assets/images/tutorial-sabio.png`** - Avatar de El Sabio
- **`assets/videoshttps://cdn.discordapp.com/attachments/1377005318684410007/1390467403632345218/ElSabio_-_Video_de_cuando_habla.mp4?ex=68685d2e&is=68670bae&hm=45e74a6561a8914e63292da8f05e48bc7a2a7616747b2d13aa42b27ab0f8f7c9&`** - Video de introducción
- **`assets/videoshttps://cdn.discordapp.com/attachments/1377005318684410007/1390467403258794075/El_video_de_presentacion_de_las_passquirk.mp4?ex=68685d2e&is=68670bae&hm=e2ff26631a136ef596fae2b0243bb27ee9b13b41fd26fbae4d4546b21deb92ce&`** - Video explicativo del mundo

### 8.2 Modificaciones en Archivos Existentes

#### package.json
\`\`\`json
{
  "dependencies": {
    "discord.js": "^14.14.1",  // Actualizado a versión más reciente
    "node-cron": "^3.0.2"      // Añadido para limpieza de sesiones
  },
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint ."         // Añadido para calidad de código
  }
}
\`\`\`

#### index.js
\`\`\`javascript
// Añadido al archivo principal
const TutorialManager = require('./utils/tutorial-manager');
const CombateManager = require('./utils/combate-manager');

// Inicialización de gestores
client.tutorialManager = new TutorialManager();
client.combateManager = new CombateManager();

// Evento ready mejorado
client.once('ready', () => {
    console.log(`✅ ${client.user.tag} está online!`);
    console.log(`📚 Tutorial PassQuirk RPG cargado`);
    console.log(`🎮 ${client.commands.size} comandos registrados`);
});
\`\`\`

#### .env.example
\`\`\`env
# Nuevas variables de entorno añadidas
DISCORD_TOKEN=tu_token_aqui
CLIENT_ID=tu_client_id_aqui
GUILD_ID=tu_guild_id_para_testing

# Configuración PassQuirk
PASSQUIRK_DEBUG=false
PASSQUIRK_SESSION_TIMEOUT=1800000
PASSQUIRK_MAX_SESSIONS=1000
\`\`\`

### 8.3 Nuevas Funcionalidades Implementadas

#### Sistema de Tutorial Interactivo
- **Navegación fluida**: Botones Previous/Next con validación de estado
- **Progreso visual**: Barras de progreso y indicadores de sección
- **Contenido multimedia**: Integración de videos e imágenes
- **Persistencia de sesión**: Mantenimiento de estado entre interacciones

#### Creación de Personajes Avanzada
- **Proceso guiado**: 5 pasos con validación en cada etapa
- **Sistema de clases**: 5 clases balanceadas con estadísticas únicas
- **Bonificaciones de reino**: Modificadores basados en origen
- **Generación de Quirks**: Asignación aleatoria de poderes únicos

#### Sistema de Combate Tutorial
- **Combate por turnos**: Mecánicas similares a RPG clásicos
- **Múltiples acciones**: Atacar, defender, usar objetos, habilidades Quirk
- **Gestión de recursos**: HP y energía como recursos limitados
- **Feedback visual**: Barras de progreso y mensajes descriptivos

#### Gestión de Sesiones
- **Sesiones persistentes**: Mantenimiento de progreso entre sesiones
- **Limpieza automática**: Eliminación de sesiones inactivas
- **Validación de estado**: Verificación de prerrequisitos y progreso

#### Sistema de Emojis Animados
- **Emojis externos**: Integración con cdn3.emoji.gg
- **Fallbacks**: Sistema de respaldo para emojis no disponibles
- **Personalización**: Configuración fácil de emojis por servidor

### 8.4 Arquitectura y Patrones de Diseño

#### Patrón Manager
\`\`\`javascript
// Cada sistema principal tiene su propio manager
TutorialManager    // Gestiona el flujo del tutorial
CombateManager     // Maneja los combates
CreadorPersonajes  // Controla la creación de personajes
SistemaLogros      // Administra logros y progreso
\`\`\`

#### Patrón State Machine
\`\`\`javascript
// Estados del tutorial
ESTADOS_TUTORIAL = {
    NO_INICIADO: 'no_iniciado',
    EN_PROGRESO: 'en_progreso',
    PERSONAJE_PENDIENTE: 'personaje_pendiente',
    COMBATE_PENDIENTE: 'combate_pendiente',
    COMPLETADO: 'completado'
}
\`\`\`

#### Patrón Observer
\`\`\`javascript
// Sistema de eventos para logros
sistemaLogros.on('logroObtenido', (userId, logro) => {
    // Notificar al usuario
    // Actualizar estadísticas
    // Aplicar recompensas
});
\`\`\`

### 8.5 Optimizaciones de Rendimiento

#### Gestión de Memoria
- **Limpieza automática**: Sesiones expiradas se eliminan cada 5 minutos
- **Límite de sesiones**: Máximo configurable de sesiones activas
- **Lazy loading**: Carga de datos solo cuando es necesario

#### Caché de Datos
\`\`\`javascript
// Cache de secciones del tutorial
const seccionesCache = new Map();

function obtenerSeccion(id) {
    if (!seccionesCache.has(id)) {
        seccionesCache.set(id, cargarSeccionDesdeArchivo(id));
    }
    return seccionesCache.get(id);
}
\`\`\`

#### Optimización de Embeds
- **Reutilización de componentes**: Templates para embeds comunes
- **Validación de longitud**: Prevención de errores por límites de Discord
- **Compresión de contenido**: Truncado inteligente de texto largo

### 8.6 Seguridad y Validación

#### Validación de Entrada
\`\`\`javascript
function validarNombrePersonaje(nombre) {
    if (!nombre || typeof nombre !== 'string') {
        return { valido: false, error: 'Nombre requerido' };
    }
    
    if (nombre.length < 2 || nombre.length > 50) {
        return { valido: false, error: 'Nombre debe tener entre 2 y 50 caracteres' };
    }
    
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nombre)) {
        return { valido: false, error: 'Nombre solo puede contener letras y espacios' };
    }
    
    return { valido: true };
}
\`\`\`

#### Sanitización de Datos
\`\`\`javascript
function sanitizarTexto(texto) {
    return texto
        .replace(/[<>]/g, '') // Remover caracteres peligrosos
        .trim() // Eliminar espacios extra
        .substring(0, 1000); // Limitar longitud
}
\`\`\`

#### Rate Limiting
\`\`\`javascript
const rateLimits = new Map();

function verificarRateLimit(userId, accion) {
    const key = `${userId}_${accion}`;
    const ahora = Date.now();
    const limite = rateLimits.get(key);
    
    if (limite && ahora - limite < 1000) { // 1 segundo entre acciones
        return false;
    }
    
    rateLimits.set(key, ahora);
    return true;
}
\`\`\`

### 8.7 Logging y Debugging

#### Sistema de Logs
\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

// Uso en el código
logger.info('Tutorial iniciado', { userId, seccion: 0 });
logger.error('Error en combate', { userId, error: error.message });
\`\`\`

#### Métricas y Estadísticas
\`\`\`javascript
class MetricasPassQuirk {
    constructor() {
        this.metricas = {
            tutorialesIniciados: 0,
            tutorialesCompletados: 0,
            personajesCreados: 0,
            combatesRealizados: 0,
            erroresOcurridos: 0
        };
    }
    
    incrementar(metrica) {
        if (this.metricas.hasOwnProperty(metrica)) {
            this.metricas[metrica]++;
        }
    }
    
    obtenerReporte() {
        const tasaCompletacion = (this.metricas.tutorialesCompletados / this.metricas.tutorialesIniciados) * 100;
        
        return {
            ...this.metricas,
            tasaCompletacion: tasaCompletacion.toFixed(2) + '%'
        };
    }
}
\`\`\`

### 8.8 Testing y Calidad de Código

#### Tests Unitarios
\`\`\`javascript
// tests/tutorial-manager.test.js
const TutorialManager = require('../utils/tutorial-manager');

describe('TutorialManager', () => {
    let tutorialManager;
    
    beforeEach(() => {
        tutorialManager = new TutorialManager();
    });
    
    test('debe crear una nueva sesión para usuario nuevo', () => {
        const userId = 'test123';
        const sesion = tutorialManager.crearSesion(userId);
        
        expect(sesion.userId).toBe(userId);
        expect(sesion.seccionActual).toBe(0);
        expect(sesion.personajeCreado).toBe(false);
    });
    
    test('debe navegar correctamente entre secciones', () => {
        const userId = 'test123';
        const sesion = tutorialManager.crearSesion(userId);
        
        // Avanzar sección
        sesion.seccionActual = 1;
        tutorialManager.actualizarSesion(userId, sesion);
        
        const sesionActualizada = tutorialManager.obtenerSesion(userId);
        expect(sesionActualizada.seccionActual).toBe(1);
    });
});
\`\`\`

#### Linting y Formateo
\`\`\`javascript
// .eslintrc.js
module.exports = {
    env: {
        node: true,
        es2021: true
    },
    extends: ['eslint:recommended'],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'error',
        'prefer-const': 'error',
        'no-var': 'error'
    }
};
\`\`\`

---

## 📊 RESUMEN DE IMPLEMENTACIÓN

### ✅ Características Completadas

1. **Sistema de Tutorial Completo**
   - 6 secciones interactivas con navegación fluida
   - Integración multimedia (videos de El Sabio y PassQuirks)
   - Progreso visual y validación de prerrequisitos

2. **Creación de Personajes Avanzada**
   - Proceso guiado en 5 pasos
   - 5 clases balanceadas con estadísticas únicas
   - 5 reinos con bonificaciones especiales
   - Generación automática de Quirks

3. **Sistema de Combate Tutorial**
   - Combate por turnos contra Slime de entrenamiento
   - 4 acciones disponibles (Atacar, Defender, Poción, Quirk)
   - Gestión de HP y energía
   - Sistema de recompensas

4. **Gestión de Sesiones Robusta**
   - Persistencia de progreso entre interacciones
   - Limpieza automática de sesiones expiradas
   - Validación de estado y prerrequisitos

5. **Integración Discord.js v14**
   - Slash commands con subcomandos
   - Manejo completo de interacciones (botones, modales)
   - Sistema de embeds con emojis animados

### 🔧 Herramientas de Desarrollo

- **Control de Versiones**: Scripts Git para fusión de repositorios
- **Testing**: Framework Jest con tests unitarios
- **Logging**: Sistema Winston para debugging
- **Linting**: ESLint para calidad de código
- **Documentación**: Comentarios JSDoc en todo el código

### 📈 Métricas y Rendimiento

- **Optimización de Memoria**: Limpieza automática cada 5 minutos
- **Rate Limiting**: Prevención de spam de interacciones
- **Caché Inteligente**: Carga lazy de datos pesados
- **Validación Robusta**: Sanitización de todas las entradas

### 🎯 Próximos Pasos Recom
