const config = require("../config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

module.exports = {
    name: "video",

    async execute({ sock, sender, text }) {

        try {

            const prompt = text.replace(/^video/i, "").trim();

            if (!prompt) {
                return sock.sendMessage(sender, {
                    text: "🎥 Utilisation : @video un robot qui marche dans la pluie"
                });
            }

            const model = genAI.getGenerativeModel({
                model: "models/veo-3.1-generate-preview"
            });

            await sock.sendMessage(sender, {
                text: "🎥 Génération vidéo en cours..."
            });

            // simulation API (Veo est lourd / async)
            const result = await model.generateContent(prompt);

            await sock.sendMessage(sender, {
                text: "🎥 Vidéo générée (lien ou fichier à intégrer)"
            });

        } catch (err) {

            console.log("VIDEO ERROR:", err);

            await sock.sendMessage(sender, {
                text: "❌ Erreur génération vidéo"
            });
        }
    }
};