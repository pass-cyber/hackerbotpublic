
const config = require("../config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

// ======================
// 🧠 MODELS
// ======================
const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-pro"
});

// ======================
// 🧠 MEMORY STORE (RAM)
// ======================
// structure:
// { userId: [{role, text}, ...] }

const memory = {};
const MAX_MEMORY = 10;

// ======================
// 🧠 CLEAN PROMPT
// ======================
function cleanPrompt(text) {
    return (text || "")
        .replace(/^smartai/i, "")
        .trim();
}
// ======================
// 🧠 MEMORY HELPERS
// ======================

function getMemory(userId) {
    if (!memory[userId]) memory[userId] = [];
    return memory[userId];
}

function addMemory(userId, role, text) {
    const mem = getMemory(userId);

    mem.push({ role, text });

    if (mem.length > MAX_MEMORY) {
        mem.shift(); // supprime ancien message
    }
}

// ======================
// 🤖 MAIN
// ======================

module.exports = {
    name: "smartai",

    async execute({ sock, sender, text }) {

        try {

            const userId = sender;
            const prompt = cleanPrompt(text);

            if (!prompt) {
                return sock.sendMessage(sender, {
                    text:
`🤖 IA SYSTEM

Utilisation :

@ai question
@smartai question (rapide)
@smartai question (puissant)`
                });
            }

            // ======================
            // 🧠 LOAD MEMORY
            // ======================

            const history = getMemory(userId);

            // format history pour Gemini
            const contents = history.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            // ajoute question actuelle
            contents.push({
                role: "user",
                parts: [{ text: prompt }]
            });

            // ======================
            // 🤖 MODEL CALL
            // ======================

            const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-pro"
});

            const result = await model.generateContent({
                contents
            });

            const response = result.response.text();

            // ======================
            // 🧠 SAVE MEMORY
            // ======================

            addMemory(userId, "user", prompt);
            addMemory(userId, "model", response);

            return sock.sendMessage(sender, {
                text: response
            });

        } catch (err) {

            console.log("AI ERROR:", err);

            return sock.sendMessage(sender, {
                text: "❌ IA indisponible pour le moment"
            });
        }
    }
};
