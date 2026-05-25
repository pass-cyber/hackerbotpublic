const config = require("../config");

module.exports = {

    // ======================
    // 🤖 AI SYSTEM
    // ======================

    ai: {
        advanced: true,

        description: "Permet de parler avec l'intelligence artificielle (mode automatique).",

        format:
`${config.prefix}ai votre question`,

        example:
`${config.prefix}ai explique javascript`,

        details: [
            "Choisit automatiquement le meilleur modèle",
            "Utilise Gemini AI",
            "Réponses intelligentes et contextuelles"
        ]
    },

    fastai: {
        advanced: true,

        description: "IA rapide optimisée pour des réponses courtes et instantanées.",

        format:
`${config.prefix}fastai votre question`,

        example:
`${config.prefix}fastai résume la physique`,

        details: [
            "Modèle rapide (Gemini Flash)",
            "Réponse très rapide",
            "Moins détaillé mais efficace"
        ]
    },

    smartai: {
        advanced: true,

        description: "IA avancée pour analyses profondes et réponses complexes.",

        format:
`${config.prefix}smartai votre question`,

        example:
`${config.prefix}smartai explique la théorie de la relativité`,

        details: [
            "Modèle puissant (Gemini Pro)",
            "Analyse profonde",
            "Idéal pour code et logique complexe"
        ]
    },

    // ======================
    // 🖼 IMAGE GENERATION
    // ======================

    image: {
        advanced: true,

        description: "Génère des images IA réalistes ou stylisées.",

        format:
`${config.prefix}image description`,

        example:
`${config.prefix}image un robot cyberpunk dans la pluie`,

        details: [
            "Utilise Imagen 4 Ultra",
            "Génération d'images haute qualité",
            "Supporte styles réalistes et artistiques"
        ]
    },

    // ======================
    // 🎥 VIDEO GENERATION
    // ======================

    video: {
        advanced: true,

        description: "Génère des vidéos à partir d'une description.",

        format:
`${config.prefix}video description`,

        example:
`${config.prefix}video un vaisseau spatial dans l'univers`,

        details: [
            "Utilise Veo 3",
            "Génération vidéo IA",
            "Transforme texte en scène animée"
        ]
    },

    // ======================
    // 📡 PING
    // ======================

    ping: {
        advanced: true,

        description: "Permet de tester une adresse IP avec un vrai ping système.",

        format:
`${config.prefix}ping -c nombre ip`,

        example:
`${config.prefix}ping -c 4 8.8.8.8`,

        details: [
            "-c définit le nombre de paquets",
            "Compatible IPv4",
            "Retourne le vrai résultat terminal Linux"
        ]
    },

    // ======================
    // 🤖 SALUTATION
    // ======================

    salut: {
        advanced: false,

        description: "Message de bienvenue automatique.",

        format:
"salut | bonjour | hello | yo",

        example:
"salut",

        details: [
            "Déclenche sans prefix",
            "Réponse automatique",
            "Accueille l'utilisateur"
        ]
    },

    // ======================
    // 📖 HELP
    // ======================

    help: {
        advanced: false,

        description: "Affiche la liste des commandes disponibles.",

        format:
`${config.prefix}help`,

        example:
`${config.prefix}help`,

        details: [
            "Liste toutes les commandes",
            "Affichage dynamique",
            "Basé sur config bot"
        ]
    }
};