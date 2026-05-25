const config = require("../config");
const { GoogleGenerativeAI } = require("@google/generative-ai");
//const { GoogleGenerativeAI } = require("@google/genai");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

// ======================
// 🧠 MODEL MAP
// ======================

const MODELS = {
    smart: "models/gemini-3.1-pro-preview",
    fast: "models/gemini-3.5-flash",
    auto: "models/gemini-3.1-flash-lite"
};

function detectMode(text) {

    const t = text.toLowerCase();

    if (t.startsWith("smartai")) return "smart";
    if (t.startsWith("fastai")) return "fast";

    return "auto";
}

module.exports = {
    name: "ai",

    async execute({ sock, sender, text }) {

        try {

            const mode = detectMode(text);

            const model = genAI.getGenerativeModel({
                model: MODELS[mode]
            });

            let prompt = text;

            // enlever le prefix IA
            prompt = prompt
                .replace(/^smartai|^fastai|^ai/i, "")
                .trim();

            if (!prompt) {

                return sock.sendMessage(sender, {
                    text:
`🤖 IA SYSTEM

Utilisation :

@ai question (auto)
@fastai question (rapide)
@smartai question (puissant)`
                });
            }

            const result = await model.generateContent(prompt);
            const response = result.response.text();

            await sock.sendMessage(sender, {
                text: response
            });

        } catch (err) {

            console.log("AI ERROR:", err);

            await sock.sendMessage(sender, {
                text: "❌ IA indisponible pour le moment"
            });
        }
    }
};