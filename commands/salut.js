const config = require("../config");

module.exports = {

    name: "salut",

    async execute({
        sock,
        sender,
        message
    }) {

        const pushName =
            message.pushName || "Utilisateur";

        await sock.sendMessage(sender, {
            text:
`👋 Salut ${pushName}

🤖 Bienvenue sur ${config.botName}

💡 Utilisez :

${config.prefix}help

pour voir toutes les commandes.

🏢 ${config.org}`
        });
    }
};