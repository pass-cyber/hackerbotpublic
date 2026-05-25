module.exports = {
    name: "ping",

    execute: async ({ sock, sender }) => {

        await sock.sendMessage(sender, {
            text: "🏓 Pong ! Bot actif"
        });
    }
};