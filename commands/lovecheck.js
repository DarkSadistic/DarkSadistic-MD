module.exports = {
  name: "lovecheck",
  alias: ["lovemeter", "lovetest"],
  description: "Check love % between you and someone 💘",
  category: "fun",
  async run({ conn, m }) {
    const sender = m.sender;
    const target =
      m.mentionedJid[0] ||
      (m.quoted ? m.quoted.sender : null);

    if (!target)
      return m.reply("💔 Tag or reply to someone to check your love %");

    const percent = Math.floor(Math.random() * 101);
    const heartBar = "❤️".repeat(Math.floor(percent / 10)) || "💔";

    const phrases = [
      "💘 Meant to be!",
      "🥰 Cutest couple detected!",
      "💀 Stay away from each other!",
      "💞 You both might work out...",
      "🚨 Toxic match ahead!",
    ];

    const msg = `💓 *LOVE METER ANALYSIS* 💓\n\n👤 @${sender.split("@")[0]}\n❤️ @${target.split("@")[0]}\n\n💌 Love Compatibility: *${percent}%*\n${heartBar}\n\n_${phrases[Math.floor(Math.random() * phrases.length)]}_`;

    await conn.sendMessage(m.chat, { text: msg, mentions: [sender, target] }, { quoted: m });
  },
};
                                                                               
