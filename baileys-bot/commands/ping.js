const { exec } = require("child_process");

module.exports = {

    name: "ping",

    async execute({
        sock,
        sender,
        args
    }) {

        try {

            let count = 4;
            let ip = "8.8.8.8";

            const countIndex = args.indexOf("-c");

            if (
                countIndex !== -1 &&
                args[countIndex + 1]
            ) {
                count = parseInt(args[countIndex + 1]);
            }

            const filteredArgs =
                args.filter(a =>
                    a !== "-c" &&
                    a !== String(count)
                );

            if (filteredArgs.length > 0) {
                ip = filteredArgs[0];
            }

            const command =
                `ping -c ${count} ${ip}`;

            await sock.sendMessage(sender, {
                text:
`📡 Ping en cours...

🌐 IP :
${ip}

📦 Paquets :
${count}`
            });

            exec(command, {
                timeout: 15000
            }, async (error, stdout, stderr) => {

                if (error && !stdout) {

                    return await sock.sendMessage(sender, {
                        text:
`❌ Impossible d'effectuer le ping.

🌐 Adresse :
${ip}`
                    });
                }

                const result =
                    stdout || stderr;

                const cleaned =
                    result
                    .toString()
                    .trim()
                    .slice(0, 3900);

                await sock.sendMessage(sender, {
                    text:
`📡 Résultat du ping

\`\`\`
${cleaned}
\`\`\``
                });

            });

        } catch (err) {

            console.log("PING ERROR:", err);

            await sock.sendMessage(sender, {
                text:
"❌ Erreur durant le ping."
            });
        }
    }
};