const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function run() {
    const res = await ai.models.list();

    console.log("🔥 MODELES DISPONIBLES:\n");

    console.log(res); // <-- IMPORTANT
}

run();