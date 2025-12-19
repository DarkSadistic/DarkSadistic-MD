//CREATED BY Mr. Erøxe 👿 OFFICIAL 
module.exports = {
  name: "pregnancycheck",
  alias: ["pregnancycheck", "pregcheck", "pregnant"],
  description: "Check if someone is pregnant (just for fun)",
  category: "fun",
  async run({ conn, m }) {
    const { quoted, mentionByTag, sender } = m;

    const targetUser = mentionByTag?.[0] || quoted?.sender || sender;
    const tagUser = '@' + targetUser.split('@')[0];
//CHECK LOYALTY BY DarkSadistic-MD COMMAND
    const results = [
      "✅ Positive — Congratulations, mommy! 🤰🍼",
      "❌ Negative — Not this time. 😅",
      "🧪 Still testing... please pee again. 💧",
      "🧬 Twins detected! 😳 Double trouble!",
      "😱 Triplets!? Are you okay?",
      "🛸 Alien pregnancy detected. 👽",
      "💀 Test exploded. Hormones too chaotic.",
      "😳 It's not yours — but someone else's. 💔",
      "🔍 No womb found. You sure you're human?",
      "📛 Too late to check. Baby arriving in 2 hours! 🏥"
    ];

    const result = results[Math.floor(Math.random() * results.length)];

    const caption = `🤰 *PREGNANCY TEST REPORT*  
👤 Target: ${tagUser}  
📋 Result: ${result}`;

    await conn.sendMessage(m.chat, {
      text: caption,
      mentions: [targetUser]
    }, { quoted: m });
  }
};
