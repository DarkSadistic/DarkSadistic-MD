// commands/marry.js
module.exports = {
  name: "marry",
  alias: ["shadi", "wedding"],
  description: "Randomly marry two group members or mentioned members 💍✨",
  category: "fun",

  async run({ conn, m }) {
    try {
      if (!m.isGroup) {
        return await conn.sendMessage(m.chat, { text: "❌ This command works only in groups!" }, { quoted: m });
      }

      // Get all participants
      const metadata = await conn.groupMetadata(m.chat);
      const participants = metadata.participants.map(p => p.id);

      if (!participants || participants.length < 2) {
        return await conn.sendMessage(m.chat, { text: "⚠️ Not enough members to arrange a wedding 😅" }, { quoted: m });
      }

      let partner1, partner2;

      // If user mentions 2 people, use them
      if (m.mentionedJid && m.mentionedJid.length >= 2) {
        partner1 = m.mentionedJid[0];
        partner2 = m.mentionedJid[1];
      } else if (m.mentionedJid && m.mentionedJid.length === 1) {
        partner1 = m.sender;
        partner2 = m.mentionedJid[0];
      } else {
        // Randomly pick 2 members
        const shuffled = participants.sort(() => 0.5 - Math.random());
        partner1 = shuffled[0];
        partner2 = shuffled[1];
      }

      const marriageLines = [
        `💖 Love is in the air! @${partner1.split("@")[0]} ❤️ @${partner2.split("@")[0]} are now married! 🎉`,
        `💍 Congratulations! @${partner1.split("@")[0]} and @${partner2.split("@")[0]} tied the knot today! 🍰`,
        `✨ Wedding Alert! @${partner1.split("@")[0]} 💞 @${partner2.split("@")[0]} 🎊 Let’s celebrate love!`,
        `🥂 Cheers to the lovely couple: @${partner1.split("@")[0]} + @${partner2.split("@")[0]} ❤️ Forever together!`,
        `🌸 Fairy tales do come true! @${partner1.split("@")[0]} + @${partner2.split("@")[0]} 💖 Married!`
      ];

      const chosen = marriageLines[Math.floor(Math.random() * marriageLines.length)];

      // Send the marriage announcement
      await conn.sendMessage(m.chat, {
        text: chosen,
        mentions: [partner1, partner2]
      }, { quoted: m });

    } catch (err) {
      console.error("❌ Marry command error:", err);
      await conn.sendMessage(m.chat, { text: "❌ Something went wrong arranging the wedding 😅" }, { quoted: m });
    }
  }
};
        
