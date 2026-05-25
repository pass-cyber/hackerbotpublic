const clearTerminal = (seconds = 5) => {
    setTimeout(() => {
        console.clear();
    }, seconds * 1000);
};

const fs = require("fs");
const pino = require("pino");

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const config = require("./config");
const handleCommands = require("./commands/handler");

// ======================
// 📦 LOAD COMMANDS
// ======================
const commands = new Map();

const files = fs.readdirSync("./commands");

for (const file of files) {
    if (file.endsWith(".js") && file !== "handler.js") {
        const cmd = require(`./commands/${file}`);
        if (cmd?.name) {
            commands.set(cmd.name, cmd);
        }
    }
}

// ======================
// 🚀 BOT START
// ======================
async function startBot() {

    console.log(`🚀 ${config.botName} STARTING...`);

    const { state, saveCreds } =
        await useMultiFileAuthState("./auth");

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        browser: [config.botName, "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {

        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            console.log("✅ BOT CONNECTÉ !");
            console.log(`🤖 Org: ${config.org}`);
            clearTerminal()
        }

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log("❌ Connexion fermée");
            console.log("🔄 Reconnect:", shouldReconnect);

            if (shouldReconnect) startBot();
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const message = messages[0];
        if (!message?.message) return;

        if (message.key.remoteJid === "status@broadcast") return;

        const text =
            message.message.conversation ||
            message.message.extendedTextMessage?.text ||
            message.message.imageMessage?.caption ||
            message.message.videoMessage?.caption;

        if (!text) return;

        const sender = message.key.remoteJid;
        const pushName = message.pushName || "Utilisateur";

        console.log(`\n${pushName}: ${text}`);
        console.log(`🏢 ${config.org}`);

        // ======================
        // 👋 AUTO GREETING
        // ======================
        const lower = text.toLowerCase();

        if (["salut", "bonjour", "hello", "yo"].includes(lower)) {
            await sock.sendMessage(sender, {
                text: `👋 Salut ${pushName}\n\nTape -help`
            });
            return;
        }

        await handleCommands({
            sock,
            message,
            commands
        });
    });
}

startBot();