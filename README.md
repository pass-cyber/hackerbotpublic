# hacker_bot
un bot whatsapp avec fonctionnalité de hack
Voici un **README.md complet, propre et professionnel** pour ton bot WhatsApp Baileys + IA Gemini, de A à Z.

---

# 🤖 Open Formation Bot

Bot WhatsApp avancé basé sur **Baileys + Gemini AI**, conçu pour automatiser les conversations, gérer les groupes et fournir une intelligence artificielle intégrée.

---

# 🚀 Fonctionnalités

## 🤖 Intelligence Artificielle

* Chat IA via Gemini
* Mode rapide et intelligent (`fastai`, `smartai`)
* Compréhension naturelle des messages
* Réponses contextuelles

---

## ⚡ Commandes système

* Système de commandes modulaire
* Chargement automatique depuis `/commands`
* Prefix configurable (`@`)
* Commandes dynamiques + extensibles

---

## 👋 Système intelligent de salutations

* Détection automatique :

  * salut
  * bonjour
  * hello
  * yo
  * @salut
* Réponse automatique sans prefix

---

## 📡 Réseau

* `@ping` → ping réel système Linux
* support `-c` (nombre de paquets)
* retour console réel

---

## 📚 Aide intégrée

* `@help` → menu principal
* `@menu` → fonctionnalités du bot
* `@command infos` → documentation avancée

---

## 👥 Groupes (prévu / évolutif)

* gestion membres
* messages de bienvenue
* anti-spam
* contrôle d’adhésion
* système de likes

---

## 🎵 Multimédia (prévu)

* YouTube downloader
* audio / voice messages
* stickers
* génération de contenu

---

## 🌍 Multi-langue (prévu)

* français
* anglais
* détection automatique de langue

---

## 🧠 Architecture modulaire

* chaque commande est un fichier séparé
* système scalable
* facile à maintenir
* base plugin-ready

---

# 📁 Structure du projet

```
baileys-bot/
│
├── auth/                  # session WhatsApp
├── commands/             # commandes bot
│   ├── ai.js
│   ├── ping.js
│   ├── help.js
│   ├── info.js
│   ├── salut.js
│   ├── menu.js
│   ├── handler.js
│   └── cmd_infos.js     # documentation des commandes
│
├── index.js             # point d'entrée principal
├── config.js            # configuration globale
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Installation

## 1. Cloner le projet

```bash
git clone https://github.com/ton-repo/bot.git
cd bot
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Configuration `.env`

```env
GEMINI_API_KEY=ton_api_key_ici
```

---

## 4. Lancer le bot

```bash
node index.js
```

---

# ⚙️ Configuration (`config.js`)

```js
module.exports = {
    prefix: "@",
    aiPrefix: "ai",

    botName: "Open Formation Bot",
    creator: "Hacker Génie",
    org: "Open Formation Area",

    geminiApiKey: process.env.GEMINI_API_KEY,
    geminiModel: "gemini-2.5-flash"
};
```

---

# 🤖 Commandes disponibles

## ⚡ IA

### Chat IA

```text
@ai explique javascript
```

### Modes futurs

```text
@fastai question rapide
@smartai question complexe
```

---

## 📡 Ping système

```text
@ping -c 4 8.8.8.8
```

---

## 👋 Salutation automatique

```text
salut
bonjour
hello
yo
```

---

## 📚 Help

```text
@help
```

---

## ℹ️ Infos bot

```text
@info
```

---

## 📖 Documentation commande

```text
@ping infos
@ai infos
```

---

# 🧠 Système cmd_infos.js

Chaque commande possède une documentation structurée :

```js
ping: {
    advanced: true,

    description: "Permet de tester une adresse IP avec un vrai ping système.",

    format: `${config.prefix}ping -c nombre ip`,

    example: `${config.prefix}ping -c 4 8.8.8.8`,

    details: [
        "-c définit le nombre de paquets",
        "Compatible IPv4",
        "Retourne le vrai résultat terminal Linux"
    ]
}
```

---

# 🧩 Architecture technique

* Baileys (WhatsApp Web API)
* Node.js v24+
* Gemini AI (@google/generative-ai)
* système de modules dynamique
* event-driven architecture

---

# ⚠️ Limitations actuelles

* génération vidéo (Veo) non supportée via SDK actuel
* génération image (Imagen) limitée selon API
* dépendance à Google Gemini API quota

---

# 🚀 Roadmap

## 🔥 Phase 1 (actuelle)

* bot fonctionnel WhatsApp
* IA Gemini
* commandes de base

## 🚀 Phase 2

* système cmd_infos dynamique
* menus automatiques
* catégories commandes

## 🤖 Phase 3

* IA multi-modèles (fast / smart / pro)
* router intelligent

## 🌍 Phase 4

* groupe management avancé
* anti-spam
* analytics

## 🎮 Phase 5

* jeux + XP + economy system

---

# 👨‍💻 Auteur

* **Nom** : Hacker Génie
* **Projet** : Hacker Bot
* **Organisation** : Open Formation Area Reform

---

# ⭐ Objectif du projet

Créer un **bot WhatsApp intelligent complet**, capable de :

* répondre comme une IA moderne
* gérer des groupes automatiquement
* évoluer comme une plateforme (Meta AI-like)
* rester modulaire et scalable

---

# 📌 Conclusion

Ce bot est conçu comme une base solide pour devenir :

👉 un assistant IA WhatsApp complet
👉 un système automatisé de gestion de groupes
👉 une plateforme évolutive multi-modules

---

Si tu veux 👍

Je peux maintenant te faire :

🔥 README version GitHub stylé avec badges
🔥 ou architecture finale type “Meta AI bot pro”
🔥 ou système cmd_infos automatique (plus besoin de modifier help)
