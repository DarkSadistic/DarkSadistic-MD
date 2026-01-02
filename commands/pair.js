const axios = require('axios');

module.exports = {
    name: 'pair',
    aliases: ['code', 'session', 'qrcode'],
    description: 'Get WhatsApp pairing code',
    run: async (context) => {
        const { client, m, text, prefix } = context;

        if (!text) {
            return await client.sendMessage(m.chat, {
                text: `Example Usage: ${prefix}pair 249115929666`
            }, { quoted: m });
        }

        try {
            // Send waiting message
            await client.sendMessage(m.chat, {
                text: `*This command is not build yet! well will bring it to you soon 🖤*`
            }, { quoted: m });

            // Prepare the API request
            const number = text.replace(/[^0-9]/g, '');
            const encodedNumber = encodeURIComponent(number);
            const apiUrl = `https://DarkSadistic-MD-pair.onrender.com/code?number=${encodedNumber}`;

            // Fetch the pairing code from the API
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (data && data.code) {
                const pairingCode = data.code;
                
                // Send the pairing code
                await client.sendMessage(m.chat, {
                    text: pairingCode,
                    contextInfo: {
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363424061793692@newsletter',
                            newsletterName: "𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩",
                            serverMessageId: 143,
                        },
                    }
                }, { quoted: m });

                // Send instructions
                await client.sendMessage(m.chat, {
                    text: `Here is your pair code, copy and paste it to the notification above or link devices.`
                }, { quoted: m });
            } else {
                throw new Error("Invalid response from API.");
            }
        } catch (error) {
            console.error("Pair command error:", error);
            await client.sendMessage(m.chat, {
                text: `Error getting response from API.`
            }, { quoted: m });
        }
    }
};