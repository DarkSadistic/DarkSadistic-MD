//CREATED BY MINATO NAMIKAZE
module.exports = {
  name: 'flirt',
  alias: ['flirty', 'pickup', 'rizz'],
  description: 'Flirts with the tagged or replied user in a romantic and cheeky way 😘',
  category: 'fun',

  async run({ conn, m }) {
    try {
      // Mentioned user
      const mentionedJid = m.mentionedJid?.[0];

      // Replied user
      const quotedParticipant = m.quoted?.sender;

      // Who to flirt with
      const targetJid = mentionedJid || quotedParticipant;
      if (!targetJid) {
        return await conn.sendMessage(m.chat, {
          text: `💘 Tag or reply to someone to flirt!\n\nExample: .flirt @username 😘`,
          mentions: [m.sender],
        }, { quoted: m });
      }

      const tag = `@${targetJid.split('@')[0]}`;

      const flirtLines = [
        `👀 ${tag}, you're not just hot... you're a full-blown fire my soul dances in. 🔥`,
        `💋 ${tag}, if kisses were words, I'd write you a novel every night.`,
        `🍓 ${tag}, your lips look like sin... and I’ve never wanted to sin more.`,
        `🥀 ${tag}, you're my favorite daydream — and I hope you keep coming back.`,
        `🌹 ${tag}, you don’t walk into a room… you seduce the air around you.`,
        `🫦 ${tag}, the things I could whisper in your ear would make the stars blush.`,
        `💞 ${tag}, I want to drown in your scent, get lost in your touch, and live in your smile.`,
        `🥂 ${tag}, let’s toast to the tension between us — electric, sweet, and dangerous.`,
        `🛏️ ${tag}, I won’t say what I’m thinking… but your name is tangled in it.`,
        `🔥 ${tag}, being near you feels like standing in poetry — warm, slow-burning, and divine.`,
        `🌙 ${tag}, let’s make the moon jealous of what we could become under its light.`,
        `👅 ${tag}, say my name once... I’ll write yours on every breath.`,
        `🖤 ${tag}, my fantasies wear your face — unapologetically, every night.`,
        `🧲 ${tag}, I’m not flirting… I’m confessing a sweet little obsession.`,
        `💌 ${tag}, I’d steal glances forever just to see you smile one more time.`,
        `📖 ${tag}, you’re my favorite plot twist in this boring life story.`,
        `🫀 ${tag}, I don’t want your heart. I want *every* heartbeat with me.`,
        `💫 ${tag}, heaven must’ve cried when you were sent down — so the earth could fall in love.`,
        `👑 ${tag}, you rule me — no crown needed, just that look in your eyes.`,
        `🧁 ${tag}, you’re sweeter than anything I’ve ever tasted — and I’m hungry for more.`,
        `🌌 ${tag}, you’re not the universe — you’re the gravity holding my chaos together.`,
        `🎼 ${tag}, your voice is a song I want on repeat — with nothing but candlelight.`,
        `🌊 ${tag}, every time you speak, waves crash inside me.`,
        `👄 ${tag}, don’t say a word — just look at me the way you do… that’s enough to undo me.`,
        `🔒 ${tag}, my thoughts are chained to you… willingly.`,
        `🫧 ${tag}, even your silence seduces me.`,
        `🍷 ${tag}, I’d sip you like wine — slowly, savoring every second.`,
        `⏳ ${tag}, the night is long… and so are the things I’d whisper if you stayed close.`,
        `🫠 ${tag}, you're not a crush — you're a slow-burning wildfire I never want to put out.`,
        `💭 ${tag}, I flirt with your memory more than I sleep.`,
      ];

      const flirtText = flirtLines[Math.floor(Math.random() * flirtLines.length)];

      await conn.sendMessage(m.chat, {
        text: flirtText,
        mentions: [targetJid],
      }, { quoted: m });

    } catch (err) {
      console.error('❌ Flirt command error:', err);
      await conn.sendMessage(m.chat, {
        text: '💔 Something glitched while flirting. Even charm breaks sometimes!',
      }, { quoted: m });
    }
  }
};
          
