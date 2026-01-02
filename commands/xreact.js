const axios = require('axios');

module.exports = {
    name: 'rch',
    aliases: ['reactchannel', 'channelreact'],
    description: 'Send reactions to WhatsApp channel posts (Developer Only)',
    run: async (context) => {
        const { client, m, text } = context;

        const developerNumber = "249115929666@s.whatsapp.net";
        if (m.sender !== developerNumber) {
            return client.sendMessage(m.chat, {
                text: `╭┈┈┈┈━━━━━━┈┈┈┈◈◈\n│❒ Who the hell are you? This command is only for the developer. 🚫\n│❒ Your peasant ass can't use this. 🔒\n╰┈┈┈┈━━━━━━┈┈┈┈◈\n> ©𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩`
            }, { quoted: m });
        }

        if (!text || !text.trim()) {
            return client.sendMessage(m.chat, {
                text: `╭┈┈┈┈━━━━━━┈┈┈┈◈◈\n│❒ Even I need proper format, genius. 🤦🏻\n│❒ Usage: .rch <channel-link> <emoji1,emoji2,emoji3>\n│❒ Example: .rch https://whatsapp.com/channel/0029VbCLVCcG8l5G2sYB9729 😂,❤️,😍\n╰┈┈┈┈━━━━━━┈┈┈┈◈\n> ©𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩`
            }, { quoted: m });
        }

        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.key } });

        try {
            const args = text.trim().split(' ');
            const channelLink = args[0];
            const emojisString = args.slice(1).join(' ');

            const emojis = emojisString.split(',')
                .map(e => e.trim())
                .filter(e => e.length > 0);

            if (emojis.length === 0) {
                await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                return client.sendMessage(m.chat, {
                    text: `╭┈┈┈┈━━━━━━┈┈┈┈◈◈\n│❒ Where are the emojis, dumbass? 🤨\n│❒ Format: emoji1,emoji2,emoji3\n│❒ Example: 😂,❤️,😍\n╰┈┈┈┈━━━━━━┈┈┈┈◈\n> ©𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩`
                }, { quoted: m });
            }

            const urlMatch = channelLink.match(/whatsapp\.com\/channel\/([a-zA-Z0-9@\.\-]+)\/(\d+)$/);

            if (!urlMatch) {
                await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
                return client.sendMessage(m.chat, {
                    text: `╭┈┈┈┈━━━━━━┈┈┈┈◈◈\n│❒ Invalid channel link format! 🤦🏻\n│❒ Must include message ID at the end\n│❒ Example: https://whatsapp.com/channel/0029VbCLVCcG8l5G2sYB9729\n╰┈┈┈┈━━━━━━┈┈┈┈◈\n> ©𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩`
                }, { quoted: m });
            }

            const bearerToken = "a05f5b8ddef8198a79d07d36fed3f0055f3e76250f41ce68819b41318ca537d0";

            const response = await axios.post(
                'https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/channel/react-to-post',
                {
                    post_link: channelLink,
                    reacts: emojis
                },
                {
                    headers: {
                        'authorization': `Bearer ${bearerToken}`,
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    },
                    timeout: 30000
                }
            );

            await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

            await client.sendMessage(m.chat, {
                text: `╭┈┈┈┈━━━━━━┈┈┈┈◈◈\n│❒ ✅ Reactions sent successfully!\n│❒ Channel: ${channelLink}\n│❒ Emojis: ${emojis.join(', ')}\n│❒ Status: ${response.status}\n│❒ Developer: Unlimited reactions 🔥\n╰┈┈┈┈━━━━━━┈┈┈┈◈\n> ©𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩`
            }, { quoted: m });

        } catch (error) {
            console.error('Channel reaction error:', error);
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

            let errorMessage = `Failed to send reactions, API probably hates you. `;
            if (error.response?.status === 401) {
                errorMessage += "Bearer token expired or invalid. 🔑";
            } else if (error.response?.status === 404) {
                errorMessage += "Channel or post not found. 🕵️";
            } else if (error.message.includes('timeout')) {
                errorMessage += "API timeout, try again. ⏱️";
            } else if (error.message.includes('Network Error')) {
                errorMessage += "Network issue. 🌐";
            } else {
                errorMessage += `Error: ${error.message}`;
            }

            await client.sendMessage(m.chat, {
                text: `╭┈┈┈┈━━━━━━┈┈┈┈◈◈\n│❒ ${errorMessage}\n╰┈┈┈┈━━━━━━┈┈┈┈◈\n> ©𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩`
            }, { quoted: m });
        }
    },
};