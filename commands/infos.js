const config = require("../config");

module.exports = {

    name: "info",

    async execute({ sock, sender }) {

        await sock.sendMessage(sender, {
            text:
`🤖 ${config.botName}

👨‍💻 Créateur :
${config.creator}

🏢 Organisation :
${config.org}

🚀 Plateforme WhatsApp intelligente basée sur Baileys.`
        });
    }
};