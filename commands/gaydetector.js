module.exports = {
  name: "gaydetector",
  alias: ["howgay", "gaylvl", "rainbowscan"],
  description: "Scans someone's fabulous level with brutal honesty 🏳️‍🌈",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : m.sender);
    const tag = `@${target.split("@")[0]}`;
    const percent = Math.floor(Math.random() * 101);

    const finalLabel =
      percent > 95
        ? "💅 *FULL DRAG QUEEN MODE ACTIVATED*"
        : percent > 80
        ? "🏳️‍🌈 *Certified Rainbow Ambassador*"
        : percent > 60
        ? "👠 *Suspicious Sass Detected*"
        : percent > 40
        ? "👀 *Mild Sparkle, Keep Watching...*"
        : percent > 20
        ? "😐 *Low-level Fabulousness*"
        : "✅ *Hetero Certified (Until proven otherwise)*";

    const titles = [
      "💄 Lip Gloss Collector",
      "🧚‍♂️ Glitter Breather",
      "💃 Dancing Queen of TikTok",
      "🌈 Closet Interior Designer",
      "🎤 Shower Concert Performer",
      "👑 Secretly Beyoncé",
      "🐱 Cat Walks Practicer",
      "🧼 Closet: Left Unlocked",
      "📱 Gay Reel Algorithm Victim",
      "👀 Watches Kdramas for the boys"
    ];

    const gayTools = [
      "🌈 Pocket Glitter",
      "💋 Cherry Lip Balm",
      "📀 Ariana Grande Playlist",
      "📸 37 Selfies per hour",
      "💅 Emergency Nail Polish",
      "🎀 Pink Powerbank",
      "🐱 Hello Kitty Wallet",
      "🧸 Unicorn Keychain",
      "🎧 BLACKPINK x BTS Mix"
    ];

    const celebs = [
      "RuPaul",
      "Troye Sivan",
      "Lil Nas X",
      "James Charles",
      "Lady Gaga’s Left Heel",
      "The Gay Cousin from Every Family",
      "A Drag Race Finalist",
      "A Netflix Kdrama Lead",
      "Zac Efron’s Wink in 2007"
    ];

    const emojiReact = percent > 60 ? "🌈🌈🌈" : percent > 30 ? "👀" : "😎";

    const message = `🌈 *GAY DETECTOR 9000* 🌈

👤 Target: ${tag}
📊 Rainbow Level: *${percent}%*
${emojiReact}

🧠 Result: ${finalLabel}
🎭 Title: *${titles[Math.floor(Math.random() * titles.length)]}*
🧰 Tools Found: *${gayTools[Math.floor(Math.random() * gayTools.length)]}*
🌟 Gay Icon Vibe: *${celebs[Math.floor(Math.random() * celebs.length)]}*

📝 *DarkSadistic-MD Analysis:*
"${
  percent > 80
    ? 'This user’s rainbow energy is OFF the charts. They don’t walk — they strut!'
    : percent > 50
    ? 'Definitely the type to reply with “yaaaas queen 💅”'
    : percent > 20
    ? 'A few more reels and he’s crossing over...'
    : 'No signs yet — but we’re watching. 👁️'
}"`;

    await conn.sendMessage(m.chat, {
      text: message,
      mentions: [target],
    }, { quoted: m });
  },
};
             
