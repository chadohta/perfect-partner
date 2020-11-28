const { getWhiteCard, getRedCard } = require('./cards');

module.exports = { 
    initGame, 
    createNewPlayer, 
    createNewPotentialPartner,
    setCurrentDater,
    updateCurrentlyWinning,
    updateTotalRounds,
    clearPotentialPartners,
    assignRedCards,
    resetServerGameRoom,
};

// Inits a game
function initGame() { 
    const state = createGameState(); 
    return state;
}

// Creates game state
function createGameState() { 
    return { 
        players: [
            // {
            // id: 1,
            // name: "player1",
            // cards: ["w1", "w2", "w3", "w4", "r1", "r2"],
            // score: 0,
            // }
        ],
        currentDater: {
            id: 0,
            name: "Current Dater",
        },
        potentialPartners: [
            // {
            // id: 1,
            // name: "player1",
            // cardsPlayed: ["w1", "w4", "r1"],
            // }
        ],
        redCardsPlayed: [
            // "r1",
            // "r2",
        ],
        currentlyWinning: { id: 0, player: "Current Winner", score: 0},
        totalRounds: 0,
        whiteCardsDrawn: new Set(),
        redCardsDrawn: new Set(),
    }
}

// Handles players joining game
function createNewPlayer(state, id, name) { 
    let newPlayer = {
        id: id,
        name: name,
        cards: [getWhiteCard(state.whiteCardsDrawn), 
            getWhiteCard(state.whiteCardsDrawn), 
            getWhiteCard(state.whiteCardsDrawn), 
            getWhiteCard(state.whiteCardsDrawn), 
            getRedCard(state.redCardsDrawn), 
            getRedCard(state.redCardsDrawn)
        ],
        score: 0,
    }
    state.players.push(newPlayer)
}

// Updates current dater to next player
function setCurrentDater(state) { 
    let numOfPlayers = state.players.length;
    let pastDaterID = state.currentDater.id;
    let newDaterID = 1;
    if (pastDaterID !== numOfPlayers) newDaterID = pastDaterID + 1;
    
    state.currentDater.id = newDaterID;
    state.currentDater.name = state.players[newDaterID - 1].name;
}

// Handles submission of potential-partner; adds to state
function createNewPotentialPartner(state, id, w1, w2, r1) { 
    let newPotentialPartner = { 
        id: id,
        name: state.players[id - 1].name,
        cardsPlayed: [
            state.players[id - 1].cards[w1 - 1], 
            state.players[id - 1].cards[w2 - 1],
        ],
    }
    state.potentialPartners.push(newPotentialPartner);
    state.redCardsPlayed.push(state.players[id - 1].cards[r1 + 3])
    dealCards(state, id, w1, w2, r1);
}

// "Randomly" assigns red cards to players
function assignRedCards(state) { 
    if (state.potentialPartners.length === state.players.length - 1) { // everyone submitted
        let idx = state.redCardsPlayed.length - 1;
        for (let i = 0; i < state.potentialPartners.length; i++) { 
            state.potentialPartners[i].cardsPlayed[2] = state.redCardsPlayed[idx--];
        }
        return true;
    }
    return false;
}

// Deals new cards to players
function dealCards(state, id, w1, w2, r1) { 
    state.players[id - 1].cards[w1 - 1] = getWhiteCard(state.whiteCardsDrawn);
    state.players[id - 1].cards[w2 - 1] = getWhiteCard(state.whiteCardsDrawn);
    state.players[id - 1].cards[r1 + 3] = getRedCard(state.redCardsDrawn);
}

// Updates current winner based on highest score
function updateCurrentlyWinning(state) { 
    let players = state.players;
    for (let i = 0; i < players.length; i++) { 
        if (players[i].score > state.currentlyWinning.score) { 
            state.currentlyWinning.id = players[i].id;
            state.currentlyWinning.player = players[i].name;
            state.currentlyWinning.score = players[i].score;
        }
    }
}

// Updates number of rounds played
function updateTotalRounds(state) { 
    state.totalRounds += 1;
    if (state.totalRounds === state.players.length) return false;
    return true;
}

// Clears potential-partners and red cards played
function clearPotentialPartners(state) { 
    state.potentialPartners = [];
    state.redCardsPlayed = [];
}

// Resets game state so players can play a new game
function resetServerGameRoom(state) { 
    state.whiteCardsDrawn.clear();
    state.redCardsDrawn.clear(); 
    let players = state.players;
    for (let i = 0; i < players.length; i++) { 
        players[i].cards = [
            getWhiteCard(state.whiteCardsDrawn), 
            getWhiteCard(state.whiteCardsDrawn), 
            getWhiteCard(state.whiteCardsDrawn), 
            getWhiteCard(state.whiteCardsDrawn), 
            getRedCard(state.redCardsDrawn), 
            getRedCard(state.redCardsDrawn)
        ];
        players[i].score = 0;
    }
    state.currentDater.id = 0;
    state.currentDater.name = "Current Dater";
    state.currentlyWinning.id = 0;
    state.currentlyWinning.player = "Current Winner";
    state.currentlyWinning.score = 0;
    state.totalRounds = 0;
}