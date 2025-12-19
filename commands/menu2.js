const settings = require('../settings');
const fs = require('fs');
const path = require('path');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function helpCommand(sock, chatId, message) {
    const start = Date.now();
    await sock.sendMessage(chatId, { text: '⏳ *Loading sweet DarkSadistic-MD menu...* ♻️' }, { quoted: message });
    const end = Date.now();
    const ping = Math.round((end - start) / 2);
    const uptimeFormatted = formatTime(process.uptime());

    const helpMessage = `
╔═════ *〔 🤖 𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 〕*
║╭━━━ *[Author:- 𝐌𝐫. 𝐄𝐫𝐨𝐱𝐞]* ━━━╮
║┃ 💠 *User Name:* ${settings.botOwner}
║┃ 🔖 *Version:* 1.0.0
║│ ⏳ *Uptime:* ${uptimeFormatted}
║│ 🕐 *Time:* ${new Date().toLocaleString()}
║│ ⚡ *Speed:* ${ping}
║┃ 👑 *Owner:* Eroxe [RanaTahirG]
║┃ 📺 *Facebook:* https://facebook.com/YourFatherEditor
║╰━━━━━━━━━━━━━━━━━━━━━━╯
║🇵🇰*It is not just a bot, it's a Devotion*
║✨*Designed with 🫀 by Mr. Erøxe*
║🪄*Use the Commands to explore the Magic*
╚════════════════════════════╝

╔═ *📌 Available Commands* ═╗
║╭─🔐 *OTP Fetcher*
║│ 🌍 .otp countries
║│ 📱 .otp services
║│ 🔄 .otp get <country> <service>
║│ 📥 .otp check
║│ 🔄 .otp auto
║│ 📊 .otp status
║│ 🧹 .otp clear
║│ 📋 .otp recent
║│ 🔍 .otp test
║│ 
║│ 📝 *Examples:*
║│ • .otp get US whatsapp
║│ • .otp get IN telegram
║│ • .otp get GB google
║╰──────────────
║
║╭─🌐 *General Commands*
║│📜  .menu
║│ 🌐 .help  
║│ 📡 .ping  
║│🕐  .runtime
║│ ⚡ .alive  
║│ 🗣️ .tts  
║│ 👑 .owner  
║│ 😂 .joke  
║│ 📜 .quote  
║│ 📚 .fact  
║│ 🌤️ .weather  
║│ 📰 .news  
║│ 🖍️ .attp  
║│ 🎶 .lyrics  
║│ 🎱 .8ball  
║│ 📎 .vv  
║│ 🌍 .trt  
║│ 🖼️ .ss  
║│ 🆔 .jid  
║╰──────────────
║
║╭─🛡️ *Group Menu*
║│ 👥 .groupinfo 
║│👨🏻‍✈️  .admins
║│ 🛡️ .staff  
║│ 🚫 .ban  
║│ ⬆️ .promote  
║│ ⬇️ .demote  
║│ 🔇 .mute  
║│ 🔊 .unmute  
║│ 🗑️ .delete  
║│ 🦵🏻 .kick  
║│ ⚠️ .warnings  
║│ ⚡ .warn  
║│ 🛑 .antilink  
║│ 🤬 .antibadword  
║│ 🧹 .clear  
║│ 📢 .tag  
║│ 📣 .tagall  
║│ 🤖 .chatbot  
║│ 🔁 .resetlink  
║│ 👋 .welcome  
║│ 🥀 .goodbye  
║╰──────────────
║
║╭─🔒 *Owner Commands*
║│🔴  .ban
║│🟢  .unban
║│🌍  .public
║│🔐  .private
║│✅  .sudo
║│❌  .delsudo
║│🛠️  .mode <public/private>
║│🚫  .antidelete
║│❤️  .autoreact
║│📶  .autostatus
║│📜  .autobio
║│⌨️ .autotyping
║│📖  .autoread
║│🎙️  .autorecording
║│🧼  .clearsession    
║│🗑  .cleartmp  
║│🖼️  .getpp
║│🖼  .setpp
║╰──────────────
║
║╭─🎨 *Image/Sticker Tools*
║│ 🌀 .blur  
║│ 🖼️ .simage  
║│ 🪄 .sticker  
║│ 🔗 .tgsticker  
║│ 😂 .meme  
║│ 🏷️ .take  
║│ 😎 .emojimix  
║╰──────────────
║
║╭─🎮 *Game Room*
║│ ⭕ .tictactoe  
║│ 💀 .hangman  
║│ 🔤 .guess  
║│ ❓ .trivia  
║│ ✅ .answer  
║│ 🔍 .truth  
║│ 🔥 .dare  
║╰──────────────
║
║╭─🧠 *AI Power*
║│ 🤖 .gpt  
║│💡  .gptgo
║│ 🧠 .gemini  
║│ 🎨 .imagine  
║│ 🌌 .flux  
║╰──────────────
║
║╭─🎉 *Fun Commands*
║│ 💘 .compliment  
║│ 🤬 .insult  
║│ 😎 .flirt  
║│ 💋 .kiss 
║│ ✍🏻 .shayari  
║│ 🌙 .goodnight  
║│ 🌹 .roseday  
║│ 🎭 .character  
║│ ☠️ .wasted  
║│ 🚢 .ship  
║│ 🤤 .simp  
║│ 🤡 .stupid 
║│ 🧠 .brainwash
║│ 🐔 .detect
║│ 🧟 .ghost
║│ 👀 .mindread
║│ 💩 .toilet
║│ ☎️ .callmom
║│ 💘 .crush
║│ 🪞 .mirror
║│ 💣 .explode
║│ 👮🏻‍♂️ .spy
║│ 💨 .bombgas
║│ 🛏️ .bedrate
║│ 🤰🏻 .pregnancycheck
║│ ❤️ .lovecheck
║│ 🌈 .gaycheck 
║│ 🔥 .hornycheck
║│ *👑 .Tahir*
║╰──────────────
║
║╭─✍️ *Text Maker*
║│ 💎 .metallic  
║│ 🧊 .ice  
║│ ❄️ .snow  
║│ ✨ .impressive  
║│ 🌌 .matrix  
║│ 💡 .light  
║│ 🎇 .neon  
║│ 👿 .devil  
║│ 💜 .purple  
║│ ⚡ .thunder  
║│ 🌿 .leaves  
║│ 🎬 .1917  
║│ 🛡️ .arena  
║│ 💀 .hacker  
║│ 🏖️ .sand  
║│ 🩷 .blackpink 
║│ 💥 .glitch  
║│ 🔥 .fire  
║╰──────────────
║
║╭─📥 *Download Menu*
║│ 🎧 .play <song>
║│ 🎵 .song <name>
║│ 📹 .video <name/link>
║│ ▶️ .ytmp4 <link>
║│ 📸 .instagram or .igs <link>
║│ 📘 .fb <link>
║│ 🎞️ .tiktok <link>
║╰──────────────
║
║╭─💻 *GitHub Commands*
║│ 🖥️ .git  
║│ 📂 .github  
║│ 🧠 .sc  
║│ 🧾 .script  
║│ 📦 .repo  
║╰──────────────
║
║╭─🚀 *System*
║│⬆️  .update
║╰──────────────
║
╚══ 📢 *Join our Channel* ══╝
`;

    try {
        const imagePath = path.join(__dirname, '../assets/pathan_image.jpg');
        const audioPath = path.join(__dirname, '../assets/menu.mp3');
        const audio3Path = path.join(__dirname, '../assets/audio3.mp3');

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363424061793692@newsletter',
                        newsletterName: '𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩'
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });

            if (fs.existsSync(audioPath)) {
                const audioBuffer = fs.readFileSync(audioPath);
                await sock.sendMessage(chatId, {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            }

            if (fs.existsSync(audio3Path)) {
                const audio3Buffer = fs.readFileSync(audio3Path);
                await sock.sendMessage(chatId, {
                    audio: audio3Buffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            }

        } else {
            await sock.sendMessage(chatId, { text: helpMessage });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
  
