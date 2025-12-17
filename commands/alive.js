// commands/alive.js
const os = require('os'); // Module to get system information (OS, RAM, etc.)
const settings = require('../settings.js'); // Import bot settings

module.exports = {
  name: 'alive', // Command name (.alive)
  alias: ['bot', 'online'], // Other names (.bot, .online)
  category: 'general', // Category of command
  description: 'Check if bot is alive in stylish format 😎',
  
  lastUsed: {}, // Track usage per user in chat

  async run({ conn, m, args }) {
    try {
      const chatId = m.chat; // Current chat ID
      const sender = m.sender; // Who sent the command

      // Track how many times each user used alive command
      if (!this.lastUsed[chatId]) this.lastUsed[chatId] = {};
      if (!this.lastUsed[chatId][sender]) this.lastUsed[chatId][sender] = 0;
      this.lastUsed[chatId][sender] += 1;

      // Tag user (mention them)
      const tagUser = sender.includes("@") ? "@" + sender.split("@")[0] : sender;

      // ===============================
      // ⏱ BOT UPTIME (how long bot is running)
      // ===============================
      let uptimeSec = process.uptime(); // Total uptime in seconds
      let hours = Math.floor(uptimeSec / 3600); // Convert to hours
      let minutes = Math.floor((uptimeSec % 3600) / 60); // Convert to minutes
      let seconds = Math.floor(uptimeSec % 60); // Convert to seconds
      let uptime = `${hours}h ${minutes}m ${seconds}s`; // Format uptime

      // ===============================
      // 🕐 PAKISTAN DATE & TIME
      // ===============================
      const dateAfghanistan = new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Kabul" });
      const timeAfghanistan = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kabul" });

      // ===============================
      // 💻 SYSTEM INFORMATION
      // ===============================
      const platform = os.platform(); // Operating system (linux, windows, etc.)
      const arch = os.arch(); // System architecture (x64, arm, etc.)
      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1); // Total RAM (in GB)
      const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);   // Free RAM (in GB)

      // ===============================
      // 📝 ALIVE MESSAGE TEMPLATE
      // ===============================
      const aliveMsg = `
🌸━━━━━━━━━━━━━━━━━━━🌸
 ✨ DarkSadistic-MD ✨
🌸━━━━━━━━━━━━━━━━━━━🌸

💖 *Hello! ${tagUser},*
I’m alive, active & ready to serve you 😍✨

⏱ *Uptime:* ${uptime}  
🗓 *Date:* ${datePakistan}  
🕒 *Time:* ${timePakistan}  
👤 *Requested by*: ${tagUser}
💻 *System Info:*  
🔹 OS: ${platform} (${arch})  
🔹 RAM: ${freeMem}GB free / ${totalMem}GB total  

🤖 *Bot Status:* Online ✅  
🌟 *Version:* 1.0.0  

💌 Stay Safe, Stay Happy, and Keep Smiling 🌷🌸  
━━━━━━━━━━━━━━━━━━━━━━━
⚡ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 *𝐄røxe 𝐄dīītør*
🌸━━━━━━━━━━━━━━━━━━━🌸`;

      // ===============================
      // 📤 SEND MESSAGE WITH IMAGE
      // ===============================
      await conn.sendMessage(chatId, {
        image: { url: 'https://files.catbox.moe/zyg1h1.jpg' }, // Alive image
        caption: aliveMsg, // Alive message
        mentions: [sender] // Mention user who used the command
      }, { quoted: m });

    } catch (e) {
      // If something goes wrong, show error
      console.error("❌ Alive command error:", e);
      await conn.sendMessage(m.chat, { text: "❌ Something went wrong while showing alive message." }, { quoted: m });
    }
  }
};
    
