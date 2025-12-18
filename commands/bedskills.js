module.exports = {
  name: "bedskills",
  alias: ["bedrate"],
  description: "Rate user's bedroom skills with a funny image and caption",
  category: "fun",
  async run({ conn, m, args }) {
    const mentionedJid = m.mentionedJid && m.mentionedJid[0];
    const targetUser = mentionedJid || (m.quoted && m.quoted.participant) || m.sender;
    const username = '@' + targetUser.split('@')[0];

    const rating = Math.floor(Math.random() * 10) + 1;
    const stars = '⭐'.repeat(rating) + '✩'.repeat(10 - rating);

    const comments = [
      "🥵 Certified Bed Demon 😈",
      "💤 Needs a manual to turn you on",
      "🧸 Still cuddling like it’s kindergarten",
      "🍆 MAX stamina. 0 mercy.",
      "🤔 One position only: Sleep Mode",
      "💀 Fumbled the pillow again...",
      "🔥🔥 Hotter than a toaster",
      "😳 Bro thinks cuddling is foreplay",
      "🫠 Too lazy to flip sides",
      "🎯 Always hits the right spot 😉",
      "🧼 Still figuring out where to start",
      "🚫 Access denied. No experience found.",
      "💦 Makes Niagara Falls look dry",
      "🍑 Expert in cheek clapping",
      "🔋 Dead after 2 minutes",
      "📉 Performance declining monthly",
      "💃 Full-time dancer in bed",
      "🧠 Imagination better than reality",
      "🎬 Should star in an adult movie",
      "🛏️ Just lies there like a potato",
      "👑 Bedroom king/queen status"
    ];

    const comment = comments[Math.floor(Math.random() * comments.length)];

    const imageList = [
      "https://i.imgur.com/bBQ9N5G.jpg",
      "https://i.imgur.com/DWsf3JW.jpg",
      "https://i.imgur.com/YTdt1EH.jpeg",
      "https://i.imgur.com/5VgvgoS.jpeg",
      "https://i.imgur.com/MW85IUs.jpg",
      "https://i.imgur.com/XZZ0FZ4.jpg",
      "https://i.imgur.com/GcURR6x.jpeg",
      "https://i.imgur.com/KUXzex9.jpeg",
      "https://i.imgur.com/hTfS7yx.jpeg",
      "https://i.imgur.com/VNaPB2e.jpeg",
      "https://i.imgur.com/s2TkzUz.jpeg",
      "https://i.imgur.com/BdA7k2G.jpeg",
      "https://i.imgur.com/7aPAAeZ.jpeg",
      "https://i.imgur.com/9u2EFWJ.jpeg",
      "https://i.imgur.com/bIgEjZc.jpeg",
      "https://i.imgur.com/2P1zZft.jpeg",
      "https://i.imgur.com/Jy29cyT.jpeg",
      "https://i.imgur.com/JIo3qgC.jpeg",
      "https://i.imgur.com/v9m8Zsm.jpeg",
      "https://i.imgur.com/BXxqgNf.jpeg",
      "https://i.imgur.com/jgbmhac.jpeg",
      "https://i.imgur.com/pzTJ7Sl.jpeg"
    ];
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

    const caption = `🛏️ *${username}'s Bedroom Skills*\n\n${stars} (${rating}/10)\n${comment}\n\n💡 *Powered by 𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩*\n📢 Follow: https://whatsapp.com/channel/0029VbCLVCcG8l5G2sYB9729`;

    await conn.sendMessage(m.chat, {
      image: { url: randomImage },
      caption: caption,
      mentions: [targetUser]
    }, { quoted: m });
  }
};
      
