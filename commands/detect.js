module.exports = {
  name: "detect",
  description: "Funny command from DarkSadistic-MD",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const messages = ['Scanning phone for sus files...', 'Found: crush_chat.txt, 🔞Viral_XXX.mp4, Adult_websites_Opener.apk', 'Do you want to report yourself to the FBI? [Y/N]'];
    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
