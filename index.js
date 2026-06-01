const fs = require("fs");
const pino = require("pino");

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const config = require("./config");

const handleCommands =
    require("./commands/handler");

const clearTerminal = (seconds = 5) => {
    setTimeout(() => {
        console.clear();
    }, seconds * 1000);
};

// ======================
// 📦 LOAD COMMANDS
// ======================

const commands = new Map();

const files =
    fs.readdirSync("./commands");

for (const file of files) {

    if (
        file.endsWith(".js") &&
        ![
            "handler.js",
            "cmd_infos.js"
        ].includes(file)
    ) {

        const command =
            require(`./commands/${file}`);

        if (command?.name) {
            commands.set(command.name, command);
        }
    }
}

// ======================
// 🚀 START BOT
// ======================

async function startBot() {

    console.log(`🚀 ${config.botName} STARTING...`);

    const { state, saveCreds } =
        await useMultiFileAuthState("./auth");

    const sock = makeWASocket({

        auth: state,

        logger: pino({ level: "silent" }),

        browser: [
            config.botName,
            "Chrome",
            "1.0.0"
        ]
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {

        const { connection, lastDisconnect } = update;

        if (connection === "open") {

            console.log("✅ BOT CONNECTÉ");
            console.log(`🏢 ${config.org}`);

            clearTerminal();
        }

        if (connection === "close") {

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;

            console.log("❌ Connexion fermée");

            if (shouldReconnect) {
                startBot();
            }
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

        console.log(`\n👤 ${pushName}: ${text}`);

        const lower = text.toLowerCase().trim();

        // ======================
        // 👋 GREETINGS SYSTEM
        // ======================

        const greetings = [
            "salut",
            "bonjour",
            "hello",
            "yo",
            "hi",
            "bonsoir",
            `${config.prefix}salut`
        ];

        if (greetings.includes(lower)) {

            const salutCommand = commands.get("salut");

            if (salutCommand) {
                await salutCommand.execute({
                    sock,
                    sender,
                    message
                });
                return;
            }
        }

        // ======================
        // 📦 COMMAND HANDLER
        // ======================

        await handleCommands({
            sock,
            message,
            commands
        });
    });
}

startBot();