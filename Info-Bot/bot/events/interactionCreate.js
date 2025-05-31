const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Importar los manejadores de comandos
const comandosHandler = require('../commands/comandos');
const configuracionHandler = require('../commands/configuracion/configuracion');

// Importar el gestor del bot
const { botManager } = require('../config/botManager');
const { getPlayerData, savePlayerData } = require('../config/botManager');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // Manejar comandos de barra (slash commands)
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No se encontró el comando: ${interaction.commandName}`);
                return;
            }

            try {
                console.log(`Ejecutando comando: ${interaction.commandName} por ${interaction.user.tag}`);
                await command.execute(interaction, client);
                
                // Registrar el comando en la base de datos
                try {
                    const User = require('../models/User');
                    await User.findOneAndUpdate(
                        { userId: interaction.user.id },
                        { 
                            $inc: { 'stats.commands': 1 },
                            $set: { username: interaction.user.username }
                        },
                        { upsert: true, new: true }
                    );
                } catch (dbError) {
                    console.error('Error al actualizar estadísticas del usuario:', dbError);
                }
                
            } catch (error) {
                console.error(`Error al ejecutar el comando ${interaction.commandName}:`, error);
                
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('❌ Error')
                    .setDescription('Ocurrió un error al ejecutar el comando. Por favor, inténtalo de nuevo más tarde.')
                    .setFooter({ text: 'Si el problema persiste, contacta con el soporte.' });
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
            }
        }
        
        // Manejar botones
        else if (interaction.isButton()) {
            // Manejar botones del gestor del bot
            try {
                // Verificar si es un botón del gestor del bot
                const userId = interaction.user.id;
                const session = botManager.activeEmbeds.get(userId);
                
                if (session) {
                    // Obtener datos del jugador
                    const playerData = await getPlayerData(userId);
                    
                    // Manejar la interacción con el gestor del bot
                    await botManager.handleButtonInteraction(interaction);
                    
                    // Guardar los cambios en los datos del jugador
                    await savePlayerData(userId, playerData);
                    return;
                }
            } catch (error) {
                console.error('Error al manejar el botón del gestor del bot:', error);
                
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription('❌ Ocurrió un error al procesar esta acción.');
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
                return;
            }
            
            // Manejar botones de navegación estándar
            if (interaction.customId === 'volver_menu_principal') {
                try {
                    await comandosHandler.handleSelectMenu(interaction);
                    return;
                } catch (error) {
                    console.error('Error al volver al menú principal:', error);
                    
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setDescription('❌ No se pudo volver al menú principal.');
                    
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
                    } else {
                        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                    }
                    return;
                }
            }
            
            // Manejar otros botones
            const button = client.buttons.get(interaction.customId);
            
            if (!button) return;
            
            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(`Error al ejecutar el botón ${interaction.customId}:`, error);
                
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription('❌ Ocurrió un error al procesar esta acción.');
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
            }
        }
        
        // Manejar menús desplegables
        else if (interaction.isStringSelectMenu()) {
            // Manejar el menú de comandos principal
            if (interaction.customId === 'categoria_comandos' || interaction.customId === 'volver_menu_principal') {
                try {
                    await comandosHandler.handleSelectMenu(interaction);
                } catch (error) {
                    console.error('Error en el menú de comandos:', error);
                    
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('❌ Error')
                        .setDescription('Ocurrió un error al procesar el menú de comandos.');
                    
                    if (interaction.replied || interaction.deferred) {
                        await interaction.editReply({ embeds: [errorEmbed], components: [] });
                    } else {
                        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                    }
                }
                return;
            }
            
            // Manejar el menú de configuración
            if (interaction.customId === 'categoria_configuracion' || interaction.customId === 'volver_menu_config') {
                try {
                    await configuracionHandler.handleSelectMenu(interaction);
                } catch (error) {
                    console.error('Error en el menú de configuración:', error);
                    
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('❌ Error')
                        .setDescription('Ocurrió un error al procesar el menú de configuración.');
                    
                    if (interaction.replied || interaction.deferred) {
                        await interaction.editReply({ embeds: [errorEmbed], components: [] });
                    } else {
                        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                    }
                }
                return;
            }
            
            // Manejar otros menús desplegables
            const selectMenu = client.selectMenus.get(interaction.customId);
            
            if (!selectMenu) return;
            
            try {
                await selectMenu.execute(interaction, client);
            } catch (error) {
                console.error(`Error al ejecutar el menú ${interaction.customId}:`, error);
                
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription('❌ Ocurrió un error al procesar esta selección.');
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
            }
        }
        
        // Manejar botones de navegación para configuración
        else if (interaction.isButton() && interaction.customId === 'volver_menu_config') {
            try {
                await configuracionHandler.handleSelectMenu(interaction);
            } catch (error) {
                console.error('Error al volver al menú de configuración:', error);
                
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription('❌ No se pudo volver al menú de configuración.');
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.editReply({ embeds: [errorEmbed], components: [] });
                } else {
                    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
            }
        }
        
        // Manejar envíos de modales
        else if (interaction.isModalSubmit()) {
            // Manejar el envío de formularios del sistema de diálogos
            if (interaction.customId.startsWith('dialogue_modal_')) {
                try {
                    // Inicializar el sistema de diálogos si no está inicializado
                    if (!dialogueSystem) {
                        dialogueSystem = new DialogueSystem(interaction.client);
                    }
                    
                    // Procesar el envío del modal
                    await dialogueSystem.handleModalSubmit(interaction);
                } catch (error) {
                    console.error('Error al procesar el formulario de diálogo:', error);
                    
                    const errorEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('❌ Error')
                        .setDescription('Ocurrió un error al procesar el formulario.');
                    
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
                    } else {
                        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                    }
                }
            }
        }
    },
};
