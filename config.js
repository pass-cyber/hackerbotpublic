require("dotenv").config();

if (!process.env.GEMINI_API_KEY) 
    {
        console.warn("⚠ GEMINI_API_KEY non exportée");
    }

module.exports = {

    prefix: "@",

    botName: "Open Formation Bot",

    creator: "Hacker Génie",

    org: "Area Reform (Open Formation)",

    debug: true,

    geminiApiKey: process.env.GEMINI_API_KEY,

    geminiModel: "gemini-2.5-flash",

    version: "1.0.0",

        
    paths: 
    {

        commands: "./commands",

        adminCommands: "./commands/admin_commands",

        database: "./database",

        planif: "./database/dbcommands/planif/planif.json",


    },
};