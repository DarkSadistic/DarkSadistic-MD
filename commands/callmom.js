module.exports = {
  name: "callmom",
  description: "Funny command from DarkSadistic-MD",
  category: "fun",
  async run({ conn, m, args }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
const messages = [
  '📞 *Incoming Call: Mom is Calling...*',
  '👩‍👦 *Mom:* "Son, What are you doing on WhatsApp still? 🤨"',
  '🫣 *You:* "just time pass, mom..."',
  '📵 *Mom:* "Time pass or secret girlfriend? 😏"',
  '💀 *Erøxe:* You just got exposed by your *DarkSadistic-MD* — in 4K.'
];

    for (const msg of messages) {
      await delay(2000);
      await conn.sendMessage(m.chat, { text: msg }, { quoted: m });
    }
  }
};
                                                     
