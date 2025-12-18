const { getRandom } = require('../lib/myfunc'); // or your utils
const ghostNames = [
  "Screamy Shamsher 👻", "Bloody Bano 🩸", "Moaning Majid 💀", "Toilet Ghost 🚽", "Crying Churail 😱", "Haunted BSDK 👺"
];

module.exports = {
  name: 'ghosttrace',
  category: 'fun',
  desc: 'Detects a ghost in the group',
  async exec(msg, sock) {
    if (!msg.isGroup) return msg.reply('👻 This only works in groups!');

    const groupMetadata = await sock.groupMetadata(msg.from);
    const participants = groupMetadata.participants.filter(p => p.id !== msg.sender);
    if (participants.length === 0) return msg.reply('No one to scan.');

    const target = participants[Math.floor(Math.random() * participants.length)].id;
    const ghost = getRandom(ghostNames);

    await msg.reply(`🛰️ *Scanning for paranormal activity...*`);
    await delay(1000);
    await sock.sendMessage(msg.from, {
      text: `👻 Detected 1 lost soul from *1847*...\nAttached to @${target.split('@')[0]}\nName: *${ghost}*`,
      mentions: [target]
    });

    let countdown = 5;
    const interval = setInterval(async () => {
      if (countdown === 0) {
        clearInterval(interval);
        await sock.sendMessage(msg.from, {
          text: `✅ Ghost *${ghost}* has been removed from @${target.split('@')[0]}.\n🧹 Chat cleansed.`,
          mentions: [target]
        });
      } else {
        await sock.sendMessage(msg.from, { text: `👁 Removing ghost in *${countdown}*...` });
        countdown--;
      }
    }, 1000);
  }
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
                                           }
                                           
