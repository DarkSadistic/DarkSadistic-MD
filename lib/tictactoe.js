const TicTacToe = require('../lib/tictactoe');

// Store games globally
const games = {};

async function tictactoeCommand(sock, chatId, senderId, text) {
    try {
        // Check if player is already in a game
        if (Object.values(games).find(room =>
            room.id.startsWith('tictactoe') &&
            [room.game.playerX, room.game.playerO].includes(senderId)
        )) {
            return await sock.sendMessage(chatId, {
                text: '❌ You are already in a game. Type *surrender* to quit!'
            });
        }

        // Look for waiting room
        let room = Object.values(games).find(room =>
            room.state === 'WAITING' &&
            (text ? room.name === text : true)
        );

        if (room) {
            room.o = chatId;
            room.game.playerO = senderId;
            room.state = 'PLAYING';

            const arr = room.game.render().map(v => ({
                'X': '❎', 'O': '⭕',
                '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
                '4': '4️⃣', '5': '5️⃣', '6': '6️⃣',
                '7': '7️⃣', '8': '8️⃣', '9': '9️⃣'
            }[v]));

            const str = `
🎮 *TicTacToe Game Started!*
🤖 Powered by *DarkSadistic-MD*

🔁 Turn: @${room.game.currentTurn.split('@')[0]}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

🆔 *Room ID:* ${room.id}
📜 *Rules:*
• Make 3 in a row to win
• Type a number (1-9) to place your symbol
• Type *surrender* to quit
`;

            await sock.sendMessage(chatId, {
                text: str,
                mentions: [room.game.currentTurn, room.game.playerX, room.game.playerO]
            });

        } else {
            room = {
                id: 'tictactoe-' + (+new Date),
                x: chatId,
                o: '',
                game: new TicTacToe(senderId, 'o'),
                state: 'WAITING'
            };

            if (text) room.name = text;

            await sock.sendMessage(chatId, {
                text: `⏳ *Waiting for an opponent...*\nType *.ttt ${text || ''}* to join!`
            });

            games[room.id] = room;
        }

    } catch (error) {
        console.error('Error in tictactoeCommand:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to start game. Try again later.'
        });
    }
}

async function handleTicTacToeMove(sock, chatId, senderId, text) {
    try {
        const room = Object.values(games).find(room =>
            room.id.startsWith('tictactoe') &&
            [room.game.playerX, room.game.playerO].includes(senderId) &&
            room.state === 'PLAYING'
        );

        if (!room) return;

        const isSurrender = /^(surrender|give up)$/i.test(text);
        if (!isSurrender && !/^[1-9]$/.test(text)) return;

        if (senderId !== room.game.currentTurn && !isSurrender) {
            return await sock.sendMessage(chatId, {
                text: '⛔ It’s not your turn yet!'
            });
        }

        let ok = isSurrender ? true : room.game.turn(
            senderId === room.game.playerO,
            parseInt(text) - 1
        );

        if (!ok) {
            return await sock.sendMessage(chatId, {
                text: '❌ Invalid move! That cell is already taken.'
            });
        }

        let winner = room.game.winner;
        let isTie = room.game.turns === 9;

        const arr = room.game.render().map(v => ({
            'X': '❎', 'O': '⭕',
            '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
            '4': '4️⃣', '5': '5️⃣', '6': '6️⃣',
            '7': '7️⃣', '8': '8️⃣', '9': '9️⃣'
        }[v]));

        if (isSurrender) {
            winner = senderId === room.game.playerX ? room.game.playerO : room.game.playerX;
            await sock.sendMessage(chatId, {
                text: `🏳️ @${senderId.split('@')[0]} has surrendered the game!\n🎉 Victory goes to @${winner.split('@')[0]}! 🏆`,
                mentions: [senderId, winner]
            });
            delete games[room.id];
            return;
        }

        let gameStatus;
        if (winner) {
            gameStatus = `🎉 @${winner.split('@')[0]} wins the game! 🏆`;
        } else if (isTie) {
            gameStatus = `🤝 It's a draw!`;
        } else {
            gameStatus = `🎲 Turn: @${room.game.currentTurn.split('@')[0]}`;
        }

        const str = `
🎯 *TicTacToe Update*
🤖 DarkSadistic-MD Game Engine

${gameStatus}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

👤 *Player ❎:* @${room.game.playerX.split('@')[0]}
👤 *Player ⭕:* @${room.game.playerO.split('@')[0]}

${!winner && !isTie ? '💬 *Your Move:* Type a number (1-9) or *surrender* to quit' : ''}
`;

        const mentions = [room.game.playerX, room.game.playerO, ...(winner ? [winner] : [room.game.currentTurn])];

        await sock.sendMessage(room.x, { text: str, mentions });

        if (room.o && room.x !== room.o) {
            await sock.sendMessage(room.o, { text: str, mentions });
        }

        if (winner || isTie) delete games[room.id];

    } catch (error) {
        console.error('Error in handleTicTacToeMove:', error);
    }
}

module.exports = {
    tictactoeCommand,
    handleTicTacToeMove
};
