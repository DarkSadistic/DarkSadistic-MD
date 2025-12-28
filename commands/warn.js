const fs = require('fs');
const path = require('path');
const isAdmin = require('../lib/isAdmin');

// Define paths
const databaseDir = path.join(process.cwd(), 'data');
const warningsPath = path.join(databaseDir, 'warnings.json');

// Initialize warnings file if it doesn't exist
function initializeWarningsFile() {
    if (!fs.existsSync(databaseDir)) {
        fs.mkdirSync(databaseDir, { recursive: true });
    }
    if (!fs.existsSync(warningsPath)) {
        fs.writeFileSync(warningsPath, JSON.stringify({}), 'utf8');
    }
}

async function warnCommand(sock, chatId, senderId, mentionedJids, message) {
    try {
        initializeWarningsFile();

        if (!chatId.endsWith('@g.us')) {
            await sock.sendMessage(chatId, { 
                text: '🔒 This command only works in *group chats*! 🔰 *DarkSadistic-MD WARNING SYSTEM*'
            });
            return;
        }

        try {
            const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);
            
            if (!isBotAdmin) {
                await sock.sendMessage(chatId, { 
                    text: '⚠️ Please promote the bot to *Admin* to use this feature.\n🔰 *DarkSadistic-MD WARNING SYSTEM*'
                });
                return;
            }

            if (!isSenderAdmin) {
                await sock.sendMessage(chatId, { 
                    text: '⛔ Only *group Admins* can issue warnings!\n🔰 *DarkSadistic-MD WARNING SYSTEM*'
                });
                return;
            }
        } catch (adminError) {
            console.error('Error checking admin status:', adminError);
            await sock.sendMessage(chatId, { 
                text: '🛑 Could not verify Admin status. Make sure the bot is admin.\n🔰 *DarkSadistic-MD WARNING SYSTEM*'
            });
            return;
        }

        let userToWarn;
        if (mentionedJids && mentionedJids.length > 0) {
            userToWarn = mentionedJids[0];
        } else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToWarn = message.message.extendedTextMessage.contextInfo.participant;
        }

        if (!userToWarn) {
            await sock.sendMessage(chatId, { 
                text: '❗ Please *mention* a user or *reply* to their message to warn them.\n🔰 *DarkSadistic-MD WARNING SYSTEM*'
            });
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            let warnings = {};
            try {
                warnings = JSON.parse(fs.readFileSync(warningsPath, 'utf8'));
            } catch (error) {
                warnings = {};
            }

            if (!warnings[chatId]) warnings[chatId] = {};
            if (!warnings[chatId][userToWarn]) warnings[chatId][userToWarn] = 0;
            
            warnings[chatId][userToWarn]++;
            fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));

            const warningMessage = 
`🔰 *Warned 👿 By DarkSadistic-MD*

🚨 *Warning Issued!*

👤 *User:* @${userToWarn.split('@')[0]}
⚠️ *Warnings:* ${warnings[chatId][userToWarn]}/3
🛡️ *Warned By:* @${senderId.split('@')[0]}
🕒 *Time:* ${new Date().toLocaleString()}`;

            await sock.sendMessage(chatId, { 
                text: warningMessage,
                mentions: [userToWarn, senderId]
            });

            if (warnings[chatId][userToWarn] >= 3) {
                await new Promise(resolve => setTimeout(resolve, 1000));

                await sock.groupParticipantsUpdate(chatId, [userToWarn], "remove");
                delete warnings[chatId][userToWarn];
                fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));
                
                const kickMessage = 
`🔰 *DarkSadistic-MD WARNING SYSTEM*

❌ @${userToWarn.split('@')[0]} has been *removed* from the group after reaching 3 warnings.`;

                await sock.sendMessage(chatId, { 
                    text: kickMessage,
                    mentions: [userToWarn]
                });
            }
        } catch (error) {
            console.error('🛑 Error in warn command:', error);
            await sock.sendMessage(chatId, { 
                text: '🛑 Failed to warn user!\n🔰 *DarkSadistic-MD WARNING SYSTEM*'
            });
        }
    } catch (error) {
        console.error('Error in warn command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await sock.sendMessage(chatId, { 
                text: '🛑 Rate limit reached. Try again shortly.\n🔰 *DarkSadistic-MD WARNING SYSTEM*'
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: '🛑 Unexpected error occurred. Ensure bot has admin rights.\n🔰 *DarkSadistic-MD WARNING SYSTEM*'
            });
        }
    }
}

module.exports = warnCommand;
