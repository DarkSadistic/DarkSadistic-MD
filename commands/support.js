module.exports = {
  name: "support",
  alias: ["helpbot", "support", "pathanupport"],
  description: "Get DarkSadistic-MD support links and contact info",
  category: "general",
  async run({ conn, m }) {
    const caption = `🛠️ *𝐃𝐚𝐫𝐤𝐒𝐚𝐝𝐢𝐬𝐭𝐢𝐜-𝐌𝐃 🖤🚩 - SUPPORT CENTER* 🛠️



💬 *Official WhatsApp Channel:*  
https://whatsapp.com/channel/0029VbCLVCcG8l5G2sYB9729

💙 *Official Facebook Account:*
https://facebook.com/YourFatherEditor

📲 *WhatsApp Support:*  
https://wa.me/+249115929666

🧑‍💻 *GitHub Repository:*  
https://github.com/DarkSadistic/DarkSadistic-MD

📞 *Bot Admin:*  
wa.me/923287024614

📞 *Bot Owner:*  
wa.me/249115929666

🧠 Use *.menu* to explore commands.
💥 Stay updated and have fun using DarkSadistic-MD!`;

    await conn.sendMessage(m.chat, {
      text: caption,
      mentions: [m.sender]
    }, { quoted: m });
  }
};
