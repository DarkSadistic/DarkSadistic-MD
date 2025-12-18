// commands/kiss.js
module.exports = {
  name: 'kiss',
  alias: ['kiss', 'muah'],
  description: 'Send a virtual kiss 😘',
  category: 'fun',

  async run({ conn, m, args }) {
    try {
      const sender = m.sender;
      const chatId = m.chat;

      // ✅ Determine target: either mentioned or replied user
      let targetJid = null;

      // Case 1: User explicitly tags someone
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        targetJid = m.mentionedJid[0];
      }
      // Case 2: User replies to a message
      else if (m.quoted && m.quoted.sender) {
        targetJid = m.quoted.sender;
      }

      if (!targetJid) {
        return await conn.sendMessage(chatId, { 
          text: "💋 Tag someone or reply to their message to send a kiss!\nExample: *.kiss @user*" 
        }, { quoted: m });
      }

      // Format sender & target as @username
      const senderTag = "@" + sender.split("@")[0];
      const targetTag = "@" + targetJid.split("@")[0];

      // Kiss lines
      const lines = [
        `😘 ${senderTag} sends a sweet kiss to ${targetTag}!`,
        `💋 ${senderTag} blows a magical kiss toward ${targetTag}!`,
        `😍 ${senderTag} can’t resist and kisses ${targetTag} passionately!`,
        `❤️ ${senderTag} gives ${targetTag} the warmest kiss ever!`,
        `🔥 ${senderTag} kisses ${targetTag} with full love and energy!`
      ];

      const message = lines[Math.floor(Math.random() * lines.length)];

      // ✅ Send message with mentions
      await conn.sendMessage(chatId, {
        text: message,
        mentions: [sender, targetJid]
      }, { quoted: m });

    } catch (err) {
      console.error("❌ Kiss command error:", err);
      await conn.sendMessage(chatId, { 
        text: "💔 Oops! Something went wrong with the kiss command." 
      }, { quoted: m });
    }
  }
};
          
