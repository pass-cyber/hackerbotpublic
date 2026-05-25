const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

module.exports = {
    name: "image",

    async execute({ sock, sender, text }) {

        try {

            const prompt = text
                .replace(/^image/i, "")
                .trim();

            if (!prompt) {
                return sock.sendMessage(sender, {
                    text: "🖼 Utilisation : @image un chat cyberpunk"
                });
            }

            const model = genAI.getGenerativeModel({
                model: "models/imagen-4.0-ultra-generate-001"
            });

            const result = await model.generateContent(prompt);

            const image = result.response.candidates?.[0]?.content?.parts?.[0];

            await sock.sendMessage(sender, {
                text: "🖼 Image générée (fonction dépendante API)"
            });

        } catch (err) {

            console.log("IMAGE ERROR:", err);

            await sock.sendMessage(sender, {
                text: "❌ Erreur génération image"
            });
        }
    }
};