const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comandos')
        .setDescription('Muestra todos los comandos disponibles de PassQuirk RPG'),

    async execute(interaction) {
        // Crear el menú de selección de categorías
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('categoria_comandos')
                    .setPlaceholder('Selecciona una categoría')
                    .addOptions([
                        {
                            label: '⚙️ Configuración',
                            description: 'Configura el servidor y el bot',
                            value: 'configuracion',
                            emoji: '⚙️'
                        },
                        {
                            label: '🎮 Juego',
                            description: 'Comandos principales del juego',
                            value: 'juego',
                            emoji: '🎮'
                        },
                        {
                            label: '🔧 Utilidades',
                            description: 'Herramientas útiles',
                            value: 'utilidades',
                            emoji: '🔧'
                        },
                        {
                            label: '❓ Ayuda',
                            description: 'Obtén ayuda sobre el bot',
                            value: 'ayuda',
                            emoji: '❓'
                        }
                    ])
            );

        // Crear el embed principal
        const embed = new EmbedBuilder()
            .setColor('#6B4EFF')
            .setTitle('🎮 Panel de Comandos - PassQuirk RPG')
            .setDescription('Selecciona una categoría para ver los comandos disponibles.\n\n*Usa los menús desplegables para navegar entre las diferentes secciones.*')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setFooter({ text: 'PassQuirk RPG', iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        // Enviar el mensaje con el menú
        await interaction.reply({ 
            embeds: [embed], 
            components: [row],
            ephemeral: true 
        });
    }
};

// Manejador de interacciones para el menú de selección
module.exports.handleSelectMenu = async (interaction) => {
    if (interaction.customId === 'categoria_comandos') {
        const categoria = interaction.values[0];
        
        // Crear botón para volver al menú principal
        const backButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('volver_menu_principal')
                    .setLabel('← Volver al menú principal')
                    .setStyle(ButtonStyle.Secondary)
            );

        let embed;

        switch (categoria) {
            case 'configuracion':
                embed = new EmbedBuilder()
                    .setColor('#4CAF50')
                    .setTitle('⚙️ Configuración del Servidor')
                    .setDescription('Configura los ajustes del servidor y del bot.')
                    .addFields(
                        { name: '/configurar-tiempo', value: 'Configura los canales de tiempo y clima', inline: true },
                        { name: '/cambiar-zona', value: 'Cambia la zona horaria del servidor', inline: true },
                        { name: '/configurar-prefijo', value: 'Cambia el prefijo de comandos', inline: true },
                        { name: '/ajustes-idioma', value: 'Configura el idioma del bot', inline: true }
                    )
                    .setFooter({ text: 'Solo administradores pueden usar estos comandos' });
                break;

            case 'juego':
                embed = new EmbedBuilder()
                    .setColor('#9C27B0')
                    .setTitle('🎮 Comandos del Juego')
                    .setDescription('Comandos principales para jugar a PassQuirk RPG')
                    .addFields(
                        { name: '/personaje', value: 'Gestiona tu personaje', inline: true },
                        { name: '/inventario', value: 'Mira tu inventario', inline: true },
                        { name: '/misiones', value: 'Mira tus misiones activas', inline: true },
                        { name: '/combate', value: 'Inicia un combate', inline: true },
                        { name: '/explorar', value: 'Explora el mundo', inline: true },
                        { name: '/estadisticas', value: 'Mira tus estadísticas', inline: true },
                        { name: '/tienda', value: 'Visita la tienda', inline: true },
                        { name: '/clan', value: 'Gestiona tu clan', inline: true }
                    );
                break;

            case 'utilidades':
                embed = new EmbedBuilder()
                    .setColor('#2196F3')
                    .setTitle('🔧 Utilidades')
                    .setDescription('Herramientas útiles para los jugadores')
                    .addFields(
                        { name: '/ayuda', value: 'Muestra información de ayuda', inline: true },
                        { name: '/reportar', value: 'Reporta un problema', inline: true },
                        { name: '/sugerencia', value: 'Envía una sugerencia', inline: true },
                        { name: '/invitacion', value: 'Obtén el enlace de invitación del bot', inline: true },
                        { name: '/estado', value: 'Ver el estado del servidor', inline: true },
                        { name: '/perfil', value: 'Ver tu perfil de usuario', inline: true }
                    );
                break;

            case 'ayuda':
                embed = new EmbedBuilder()
                    .setColor('#FF9800')
                    .setTitle('❓ Ayuda de PassQuirk RPG')
                    .setDescription('¿Neitas ayuda? Aquí tienes algunos recursos útiles:')
                    .addFields(
                        { name: '📚 Guía para principiantes', value: '`/guia` - Aprende a jugar' },
                        { name: '📜 Reglas del juego', value: '`/reglas` - Lee las reglas del servidor' },
                        { name: '📢 Notas de la versión', value: '`/actualizaciones` - Últimos cambios' },
                        { name: '❓ Preguntas frecuentes', value: '`/faq` - Preguntas comunes' },
                        { name: '📞 Soporte', value: '¿Aún tienes dudas? Usa `/reportar` para contactar al equipo de soporte.' }
                    )
                    .setFooter({ text: '¡Diviértete jugando a PassQuirk RPG!' });
                break;
        }

        await interaction.update({ 
            embeds: [embed], 
            components: [backButton] 
        });
    }

    // Manejar el botón de volver
    if (interaction.customId === 'volver_menu_principal') {
        // Volver a mostrar el menú principal
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('categoria_comandos')
                    .setPlaceholder('Selecciona una categoría')
                    .addOptions([
                        {
                            label: '⚙️ Configuración',
                            description: 'Configura el servidor y el bot',
                            value: 'configuracion',
                            emoji: '⚙️'
                        },
                        {
                            label: '🎮 Juego',
                            description: 'Comandos principales del juego',
                            value: 'juego',
                            emoji: '🎮'
                        },
                        {
                            label: '🔧 Utilidades',
                            description: 'Herramientas útiles',
                            value: 'utilidades',
                            emoji: '🔧'
                        },
                        {
                            label: '❓ Ayuda',
                            description: 'Obtén ayuda sobre el bot',
                            value: 'ayuda',
                            emoji: '❓'
                        }
                    ])
            );

        const embed = new EmbedBuilder()
            .setColor('#6B4EFF')
            .setTitle('🎮 Panel de Comandos - PassQuirk RPG')
            .setDescription('Selecciona una categoría para ver los comandos disponibles.\n\n*Usa los menús desplegables para navegar entre las diferentes secciones.*')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setFooter({ text: 'PassQuirk RPG', iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.update({ 
            embeds: [embed], 
            components: [row] 
        });
    }
};
