require("dotenv").config();

module.exports = {

    prefix: "@",

    botName: "Open Formation Bot",

    creator: "Hacker Génie",

    org: "Open Formation Area",

    geminiApiKey: process.env.GEMINI_API_KEY,

    geminiModel: "gemini-2.5-flash"
};