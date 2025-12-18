module.exports = {
  name: "brainwash",
  description: "Funny command from DarkSadistic-MD",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['Injecting DarkSadistic-MD.exe into your cerebrum…', 'Replacing brain with potato 🥔...', 'Congratulations, your Insect 🪱 has been died', 'Too late. You’re one of us now 😈'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
                                                     
