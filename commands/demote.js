const { isAdmin } = require('../lib/isAdmin');

async function demoteCommand(sock, chatId, mentionedJids, message) {
    try {
        if (!chatId.endsWith('@g.us')) {
            await sock.sendMessage(chatId, {
                text: '🚫 This command only works in *groups*!'
            });
            return;
        }

        try {
            const adminStatus = await isAdmin(sock, chatId, message.key.participant || message.key.remoteJid);

            if (!adminStatus.isBotAdmin) {
                await sock.sendMessage(chatId, {
                    text: '🔒 *DarkSadistic-MD* needs his aura powers to swing the demotion hammer! 🔨'
                });
                return;
            }

            if (!adminStatus.isSenderAdmin) {
                await sock.sendMessage(chatId, {
                    text: '❌ Only true aura farmers can command demotions. You’re not one of them... yet. 😬'
                });
                return;
            }
        } catch (adminError) {
            console.error('Error checking admin status:', adminError);
            await sock.sendMessage(chatId, {
                text: '⚠️ DarkSadistic-MD can’t check aura farmers status. Make sure the bot has permissions.'
            });
            return;
        }

        let userToDemote = [];

        if (mentionedJids && mentionedJids.length > 0) {
            userToDemote = mentionedJids;
        } else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToDemote = [message.message.extendedTextMessage.contextInfo.participant];
        }

        if (userToDemote.length === 0) {
            await sock.sendMessage(chatId, {
                text: '🚫 Please *mention someone* or *reply to their message* to demote!'
            });
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.groupParticipantsUpdate(chatId, userToDemote, "demote");

        const usernames = await Promise.all(userToDemote.map(async jid => {
            return `@${jid.split('@')[0]}`;
        }));

        const demoter = message.key.participant || message.key.remoteJid;

        const demotionMessage =
            `💔 *DarkSadistic-MD - DEMOTION NOTICE* 💔\n\n` +
            `👎 *User${userToDemote.length > 1 ? 's' : ''} Demoted:*\n` +
            `${usernames.map(name => `• ${name}`).join('\n')}\n\n` +
            `👑 *By:* @${demoter.split('@')[0]}\n` +
            `📅 *On:* ${new Date().toLocaleString()}\n\n` +
            `⚠️ You lost your powers. Back to civilian mode! 🎭`;

        await sock.sendMessage(chatId, {
            text: demotionMessage,
            mentions: [...userToDemote, demoter]
        });
    } catch (error) {
        console.error('Error in demote command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                await sock.sendMessage(chatId, {
                    text: '⚠️ Rate limit reached! Let DarkSadistic-MD catch its breath. 😮‍💨'
                });
            } catch (retryError) {
                console.error('Error sending retry message:', retryError);
            }
        } else {
            try {
                await sock.sendMessage(chatId, {
                    text: '❌ DarkSadistic-MD failed to demote! Is the user already powerless or bot not admin?'
                });
            } catch (sendError) {
                console.error('Error sending error message:', sendError);
            }
        }
    }
}

// Auto demotion event
async function handleDemotionEvent(sock, groupId, participants, author) {
    try {
        if (!groupId || !participants) {
            console.log('Invalid groupId or participants:', { groupId, participants });
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        const demotedUsernames = await Promise.all(participants.map(async jid => {
            return `@${jid.split('@')[0]}`;
        }));

        let demotedBy;
        let mentionList = [...participants];

        if (author && author.length > 0) {
            const authorJid = author;
            demotedBy = `@${authorJid.split('@')[0]}`;
            mentionList.push(authorJid);
        } else {
            demotedBy = '🤖 System (Auto-Demotion)';
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        const demotionMessage = `💢 *AUTO-DEMOTION DETECTED BY DarkSadistic-MD* 💢\n\n` +
            `👤 *Demoted:*\n${demotedUsernames.map(name => `• ${name}`).join('\n')}\n\n` +
            `👑 *By:* ${demotedBy}\n` +
            `📆 *Time:* ${new Date().toLocaleString()}\n\n` +
            `🔕 Power Gone! Welcome back to the regular squad. 🎭`;

        await sock.sendMessage(groupId, {
            text: demotionMessage,
            mentions: mentionList
        });
    } catch (error) {
        console.error('Error handling demotion event:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

module.exports = { demoteCommand, handleDemotionEvent };
              
