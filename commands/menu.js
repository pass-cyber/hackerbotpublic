const config = require("../config");

module.exports = {

    name: "menu",

    async execute({ sock, sender }) {

        await sock.sendMessage(sender, {
            text:
`🤖 ${config.botName}

🚀 Fonctionnalités disponibles :

🤖 Intelligence artificielle
👥 Gestion de groupes
🎵 Multimédia
🎮 Jeux
📥 Téléchargements
🔊 Réponses vocales
🛡️ Administration
📊 Statistiques
🌍 Multi-langues
📅 Automatisations

💡 Utilisez :

${config.prefix}help

pour voir les commandes disponibles.`
        });
    }
};