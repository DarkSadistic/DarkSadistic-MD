async function resetlinkCommand(sock, chatId, senderId) {
    try {
        const groupMetadata = await sock.groupMetadata(chatId);

        // Check if user is admin
        const isAdmin = groupMetadata.participants.some(p => 
            p.id === senderId && (p.admin === 'admin' || p.admin === 'superadmin')
        );

        // Check if bot is admin
        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const isBotAdmin = groupMetadata.participants.some(p => 
            p.id === botId && (p.admin === 'admin' || p.admin === 'superadmin')
        );

        if (!isAdmin) {
            return await sock.sendMessage(chatId, {
                text: '🚫 *Only group admins can use this command!*'
            });
        }

        if (!isBotAdmin) {
            return await sock.sendMessage(chatId, {
                text: '🛑 *I need admin rights to reset the group link!*'
            });
        }

        // Revoke and get new invite link
        const newCode = await sock.groupRevokeInvite(chatId);

        await sock.sendMessage(chatId, {
            text: `🔁 *Group Invite Link Reset Successfully!*\n\n🔗 *New Link:* https://chat.whatsapp.com/${newCode}\n\n🤖 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 DarkSadistic-MD*`
        });

    } catch (error) {
        console.error('Error in resetlink command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ *Failed to reset group link. Please try again later.*'
        });
    }
}

module.exports = resetlinkCommand;
                  
