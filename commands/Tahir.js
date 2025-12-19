// commands/Tahir.js
module.exports = {
  name: 'Tahir',
  alias: ['RanaTahirG', 'Eroxe', 'DarkSadistic'],
  description: 'Shows info and tribute about Mr. Tahir 😎',
  category: 'fun',

  lastUsed: {},

  async run({ conn, m }) {
    try {
      const chatId = m.chat;
      const sender = m.sender;

      if (!this.lastUsed[chatId]) this.lastUsed[chatId] = {};
      if (!this.lastUsed[chatId][sender]) this.lastUsed[chatId][sender] = 0;

      this.lastUsed[chatId][sender] += 1;

      if (this.lastUsed[chatId][sender] % 2 === 1) {
        // Odd times: Show image with caption
        await conn.sendMessage(chatId, {
          image: { url: 'https://files.catbox.moe/zyg1h1.jpg' }, // your image link
          caption: `👑 *Mr. Erøxe 👿 [RanaTahirG]* 👑\n\n✨ The creator of *DarkSadistic-MD* ✨\n💖 A Poetry lover & DPs Editor 🖤\n🔥 Always innovating, always shining 🌟`
        }, { quoted: m });

      } else {
        // Even times: Show good lines about you
        const messages = [
          `🌟 *Mr. Eroxe* 🌟\nA leader in coding & style 💻\nBringing fun & power to WhatsApp 💬🚀`,
          `💖 *Mr. Eroxe* 💖\nYour friendly developer 😎\nAlways coding with passion & heart ✨`,
          `🔥 *Mr. Eroxe* 🔥\nMastermind of bots 👑\nDarkSadistic-MD is his legacy 🤖`
        ];

        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        await conn.sendMessage(chatId, {
          text: randomMsg,
          mentions: [sender],
        }, { quoted: m });
      }

    } catch (err) {
      console.error('❌  command error:', err);
      await conn.sendMessage(m.chat, {
        text: '💔 Oops! Something went wrong while showing Me. Eroxe info...',
      }, { quoted: m });
    }
  }
};
          
