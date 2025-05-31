const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diálogo')
        .setDescription('Muestra un diálogo de ejemplo'),
    
    async execute(interaction) {
        try {
            // Mostrar el diálogo de bienvenida
            await interaction.client.dialogueManager.showDialog(
                interaction, 
                'welcome',
                { 
                    // Opciones adicionales pueden ir aquí
                }
            );
        } catch (error) {
            console.error('Error al mostrar el diálogo:', error);
            await interaction.reply({
                content: '❌ Ocurrió un error al mostrar el diálogo.',
                ephemeral: true
            });
        }
    }
};
