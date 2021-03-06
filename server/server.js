const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { 
    cors: { 
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const { makeID } = require('./utils');
const { 
    initGame, 
    createNewPlayer, 
    createNewPotentialPartner,
    setCurrentDater,
    getPlayersSortedByScore,
    updateTotalRounds,
    clearPotentialPartners,
    assignRedCards,
    getWinner,
    resetServerGameRoom,
} = require('./game');

const state = {};
const clientRooms = {};

io.on('connection', client => { 
    client.on('newGame', handleNewGame);
    client.on('joinGame', handleJoinGame);
    client.on('startGame', handleStartGame);
    client.on('playerSubmit', handlePlayerSubmit);
    client.on('daterSubmit', handleDaterSubmit);

    function handleNewGame(playerName) { 
        let roomName = makeID(5);
        clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);
        
        state[roomName] = initGame();
        client.join(roomName);
        client.number = 1;
        client.emit('init', 1);
        createNewPlayer(state[roomName], 1, playerName);

        client.emit('waitingScreen', JSON.stringify(state[roomName].players));
    }

    function handleJoinGame(data) { 
        const setOfUsers = io.sockets.adapter.rooms.get(data.roomName);
        client.emit('gameCode', data.roomName);

        let numClients = 0;
        if (setOfUsers) numClients = setOfUsers.size;
        if (numClients === 0) {
            client.emit('unknownGame');
            return;
        } else if (numClients >= 6) { 
            client.emit('tooManyPlayers');
            return;
        }

        clientRooms[client.id] = data.roomName;
        client.join(data.roomName);
        client.number = numClients + 1; 
        client.emit('init', numClients + 1);
        createNewPlayer(state[data.roomName], numClients + 1, data.playerName);

        emitWaitingScreen(data.roomName, state[data.roomName].players);
    }

    function handleStartGame() { 
        let roomName = clientRooms[client.id];
        let playerCount = state[roomName].players.length
        if (playerCount >= 3) { 
            setCurrentDater(state[roomName]);
            emitGameState(roomName, state[roomName]);
            let scores = getPlayersSortedByScore(state[roomName]);
            emitScoreBoard(roomName, scores);
        } else { 
            client.emit('notEnoughPlayers');
        }
    }

    function handlePlayerSubmit(data) { 
        let roomName = clientRooms[client.id];
        createNewPotentialPartner(state[roomName], client.number, data.white1, data.white2, data.red1);
        let allSubmitted = assignRedCards(state[roomName]);
        if (allSubmitted){ 
            emitPartnerChoices(roomName, state[roomName]);
        }
    }

    function handleDaterSubmit(optionID) { 
        let roomName = clientRooms[client.id];
        state[roomName].players[optionID - 1].score += 100;
        let continueGame = updateTotalRounds(state[roomName]);
        setCurrentDater(state[roomName]);
        clearPotentialPartners(state[roomName]);
        emitClearPotentialPartners(roomName);
        emitGameState(roomName, state[roomName]);
        let scores = getPlayersSortedByScore(state[roomName]);
        emitScoreBoard(roomName, scores);
        emitRoundWinner(roomName, { state: state[roomName], winner: optionID }); 
        setTimeout(function() {
            if (!continueGame) { // end of game
                getWinner(state[roomName]);
                emitGameOver(roomName, state[roomName].winners);
                resetServerGameRoom(state[roomName]);
                return;
            }
        }, 1500);
    }
});

function emitGameState(roomName, gameState) { 
    io.sockets.in(roomName).emit('gameState', JSON.stringify(gameState));
}

function emitWaitingScreen(roomName, players) { 
    io.sockets.in(roomName).emit('waitingScreen', JSON.stringify(players));
}

function emitPartnerChoices(roomName, state) { 
    io.sockets.in(roomName).emit('potentialPartners', JSON.stringify(state));
}

function emitClearPotentialPartners(roomName) { 
    io.sockets.in(roomName).emit('clearPotentialPartners');
}

function emitRoundWinner(roomName, data) { 
    io.sockets.in(roomName).emit('roundWinner', JSON.stringify(data));
}

function emitScoreBoard(roomName, scores) { 
    io.sockets.in(roomName).emit('updateScoreBoard', JSON.stringify(scores))
}

function emitGameOver(roomName, winners) { 
    io.sockets.in(roomName).emit('gameOver', JSON.stringify(winners));
}

http.listen(process.env.PORT || 3000);