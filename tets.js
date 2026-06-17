const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
    const model = ai.getGenerativeModel({
        model: "gemini-3.5-flash"
    });

    const result = await model.generateContent("Say hello");

    const response = await result.response;
    console.log(response.text());
}

main();