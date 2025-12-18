module.exports = {
  name: "flirt2",
  alias: ["seduce", "flirty"],
  description: "Send a romantic and spicy poetic flirt 😘",
  category: "fun",
  async run({ conn, m }) {
    const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);

    if (!target) {
      return m.reply("😳 Tag someone to flirt with! Example: .flirt2 @username");
    }

    const tag = `@${target.split('@')[0]}`;

    const flirtLines = [
      `🌹 ${tag}, your eyes could melt glaciers… and my heart.`,
      `💋 Are you a sunset? Because I can’t stop staring at your glow.`,
      `🔥 Every time you smile, my heart skips a beat—and trust me, it's dancing now.`,
      `🥀 If kisses were stars, I’d give you the whole galaxy.`,
      `🫦 ${tag}, I don't need a candle… your presence sets my soul on fire.`,
      `💌 You're my favorite notification.`,
      `🌙 Let’s cancel the moon tonight, because your glow is all I need.`,
      `💞 One chat with you, and I’m already daydreaming of forever.`,
      `🌸 I don’t flirt. I just spill poetry every time I see you online.`,
      `👀 I’d read your messages over a hundred times… and still blush.`,
      `💘 You’re not a distraction… you’re the reason I can't focus.`,
      `🥵 ${tag}, you're the reason even my phone gets hot. 😏`,
      `🎵 If I were to sing about you, even love songs would sound flat.`,
      `💭 You’re always in my thoughts—and sometimes my dreams get jealous.`,
      `🌹 Your voice could cure my sadness and cause butterflies all at once.`,
      `🫀 Be careful, ${tag}, your beauty is dangerously addictive.`,
      `🔥 I'd steal glances, but with you… I want to steal forever.`,
      `🍓 My lips are tired of saying your name in silence.`,
      `🥰 Can I be the reason you smile at your phone?`,
      `🛌 Let’s not talk. Let’s lie under stars and let our hands flirt.`,
      `💞 I want you. In all the ways—soft, wild, slow, and deep.`,
      `🥂 Every second with you is like champagne—intoxicating and rare.`,
      `💤 Even sleep isn’t peaceful without one more text from you.`,
      `💦 If love had a temperature, mine’s boiling when you're near.`,
      `🕯️ You bring light to my darkest cravings.`,
      `🫶 Let’s skip small talk and jump to forehead kisses.`,
      `💝 ${tag}, just say my name… I’ll turn your world into poetry.`,
      `😈 Your body is a mystery I want to get lost in.`,
      `💓 Are you a spell? Because I’m enchanted and helpless.`,
      `🖤 I don’t want to date… I want to love you, wildly and completely.`,
      `🔞 With you, even silence feels seductive.`,
      `🧸 Let me be the reason you cancel your plans tonight.`,
      `🫦 I wanna get lost in your scent, in your touch, in your everything.`,
      `🥵 Baby, your aura… it’s Like Erøxe.`,
    ];

    const flirtText = flirtLines[Math.floor(Math.random() * flirtLines.length)];

    await conn.sendMessage(m.chat, {
      text: flirtText,
      mentions: [target]
    }, { quoted: m });
  }
};
      
