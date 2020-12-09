const socket = io.connect('https://infinite-depths-39706.herokuapp.com/');
// const socket = io.connect('http://localhost:3000');

socket.on('init', handleInit);
socket.on('gameCode', handleGameCode);
socket.on('waitingScreen', handleWaitingScreen); 
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('unknownGame', handleUnknownGame);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('notEnoughPlayers', handleNotEnoughPlayers);
socket.on('potentialPartners', handlePotentialPartners);
socket.on('clearPotentialPartners', clearClientPotentialPartners);
socket.on('roundWinner', handleRoundWinner);
socket.on('updateScoreBoard', handleUpdateScoreBoard);

const initialScreen = document.getElementById('initialScreen');
const gameScreen = document.getElementById('gameScreen');
const newGameBtn = document.getElementById('newGameBtn');
const joinGameBtn = document.getElementById('joinGameBtn');
const playerName = document.getElementById('playerName');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const waitingScreen = document.getElementById('waitingScreen');
const startGameBtn = document.getElementById('startGameBtn');
const scoreBoard = document.getElementById('scoreBoard');
const playerSubmit = document.getElementById('playerSubmit')
const daterChoosing = document.getElementById('daterChoosing');
const daterSubmit = document.getElementById('daterSubmit');
const daterName = document.getElementById('daterName');
const inGameWaitingScreen = document.getElementById('inGameWaitingScreen');

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);
startGameBtn.addEventListener('click', startGame);
playerSubmit.addEventListener('click', handlePlayerSubmit);
daterSubmit.addEventListener('click', handleDaterSubmit);

// Creates a new game on the server
function newGame() { 
    const pName = playerName.value.trim();
    if (!pName) {
        alert("Please enter your name.");
        return;
    }
    socket.emit('newGame', pName);
    startGameBtn.style.display = "block";
}

// Allows users with correct room code to join a game on the server
function joinGame() { 
    const code = gameCodeInput.value; 
    const pName = playerName.value.trim();
    if (!pName) {
        alert("Please enter your name.");
        return;
    }
    socket.emit('joinGame', { roomName: code, playerName: pName });
}

// Starts the game that this client is in
function startGame() { 
    socket.emit('startGame')
}

// ------------------------------------------------------------------
let playerNumber;

// Displays initial game screen 
function init() { 
    waitingScreen.style.display = "none";
    gameScreen.style.display = "block";
    scoreBoard.style.display = "block";
}

// Assigns player number to client
function handleInit(number) { 
    playerNumber = number;
}

// Displays room code to client (so they can share with others)
function handleGameCode(gameCode) { 
    gameCodeDisplay.innerText = gameCode;
}

// Displays waiting screen which shows all players in current room on server
function handleWaitingScreen(players) { 
    initialScreen.style.display = "none";
    waitingScreen.style.display = "block";

    players = JSON.parse(players);
    let listOfPlayers = players[0].name;
    for (let i = 1; i < players.length; i++) { 
        listOfPlayers = listOfPlayers + ", " + players[i].name;
    }
    playersWaiting.innerText = listOfPlayers;
}

// Updates client side with server game state
function handleGameState(gameState) { 
    init();
    gameState = JSON.parse(gameState);
    daterName.innerText = gameState.currentDater.name;
    daterName2.innerText = gameState.currentDater.name;

    whiteOne.innerText = gameState.players[playerNumber - 1].cards[0];
    whiteTwo.innerText = gameState.players[playerNumber - 1].cards[1];
    whiteThree.innerText = gameState.players[playerNumber - 1].cards[2];
    whiteFour.innerText = gameState.players[playerNumber - 1].cards[3];

    redOne.innerText = gameState.players[playerNumber - 1].cards[4];
    redTwo.innerText = gameState.players[playerNumber - 1].cards[5];

    if (gameState.currentDater.id === playerNumber) { 
        gameScreen.style.display = "none";
        daterChoosing.style.display = "block";
        daterSubmit.style.display = "block";
        inGameWaitingScreen.style.display = "block";
    } else { 
        daterSubmit.style.display = "none"
    }

}

// Handles submission of "perfect-partner"
function handlePlayerSubmit() { 
    var whiteCheckedBoxes = getCheckedBoxes("whiteCardOption", 2);
    if (whiteCheckedBoxes === null) { 
        alert("Please select 2 white cards");
        return;
    }
    var redCheckedBoxes = getCheckedBoxes("redCardOption", 1);
    if (redCheckedBoxes === null) { 
        alert("Please select 1 red card");
        return;
    }
    var white1 = whiteCheckedBoxes[0].id;
    var white2 = whiteCheckedBoxes[1].id;
    var red1 = redCheckedBoxes[0].id;

    white1 = parseInt(white1.charAt(white1.length - 1));
    white2 = parseInt(white2.charAt(white2.length - 1)); 
    red1 = parseInt(red1.charAt(red1.length - 1));

    socket.emit('playerSubmit', { white1: white1, white2: white2, red1: red1 });

    gameScreen.style.display = "none";
    daterChoosing.style.display = "block";
    inGameWaitingScreen.style.display = "block";
}

// Helper function to get which cards were selected by client
function getCheckedBoxes(checkBoxName, desiredCardCount) {
  var checkboxes = document.getElementsByName(checkBoxName);
  var checkboxesChecked = [];
  for (var i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i]);
     }
  }
  if (checkboxesChecked.length !== desiredCardCount) return null 
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

// Handles displaying of all submitted potential partners to client
function handlePotentialPartners(data) { 
    let state = JSON.parse(data);
    let potentialPartners = state.potentialPartners;
    let currDater = state.currentDater.id;

    inGameWaitingScreen.style.display = "none";

    for (let i = 0; i < potentialPartners.length; i++) { 
        let partner = potentialPartners[i];
        let id = partner.id;

        if (playerNumber === currDater) {
            let optionString = "option" + id;
            document.getElementById(optionString).disabled = false;
            daterSubmit.disabled = false; // change this does it work?
        }

        let nameString = "player-name-" + id;
        var name = document.getElementById(nameString);
        name.innerText = partner.name;

        let card1 = "white-card-" + id + "-1";
        var w1 = document.getElementById(card1);
        w1.innerText = partner.cardsPlayed[0];

        let card2 = "white-card-" + id + "-2";
        var w2 = document.getElementById(card2);
        w2.innerText = partner.cardsPlayed[1];

        let card3 = "red-card-" + id + "-1";
        var r1 = document.getElementById(card3);
        r1.innerText = partner.cardsPlayed[2];
    }
}

// Clears all submitted potential partners for new round
function clearClientPotentialPartners() { 
    for (let i = 1; i <= 6; i++) { 
        let nameString = "player-name-" + i;
        var name = document.getElementById(nameString);
        name.innerText = "-"

        let card1 = "white-card-" + i + "-1";
        var w1 = document.getElementById(card1);
        w1.innerText = "-";

        let card2 = "white-card-" + i + "-2";
        var w2 = document.getElementById(card2);
        w2.innerText = "-";

        let card3 = "red-card-" + i + "-1";
        var r1 = document.getElementById(card3);
        r1.innerText = "-";

        let optionString = "option" + i;
        document.getElementById(optionString).disabled = true;
    }
    document.getElementById("daterSubmit").disabled = true; 
}

// Handles submission of which parfect-partner was selected
function handleDaterSubmit() { 
    var daterChoice = getCheckedBoxes("daterOption", 1);
    if (daterChoice === null) { 
        alert("Please select 1 option");
        return;
    }
    var optionPicked = daterChoice[0].id;
    optionPicked = parseInt(optionPicked.charAt(optionPicked.length - 1));
    socket.emit('daterSubmit', optionPicked);

    daterChoosing.style.display = "none";
    gameScreen.style.display = "block";
}

// Displays an alert reflecting if your submission was chosen or not
function handleRoundWinner(data) { 
    let obj = JSON.parse(data);
    let state = obj.state;
    let winner = obj.winner;

    let numOfPlayers = state.players.length;
    let pastDaterID = numOfPlayers;
    let currDaterID = state.currentDater.id;
    if (currDaterID !== 1) pastDaterID = currDaterID - 1;

    if (playerNumber === winner) { 
        alert("Your perfect-partner was chosen! +100 points")
    } else if (playerNumber != pastDaterID) { 
        alert("Your perfect-partner was not chosen :(")
    }
}

// Handles updating the score board
function handleUpdateScoreBoard(scoresArray) { 
    var scores = JSON.parse(scoresArray);
    for (let i = 0; i < scores.length; i++) { 
        let position = i + 1;
        let sbPosition = "sb-player-" + position;
        let sbScore = "sb-score-" + position;

        var playerPosition = document.getElementById(sbPosition);
        var playerScore = document.getElementById(sbScore);
        
        playerPosition.innerText = scores[i][1];
        playerScore.innerText = scores[i][2];
    }
}

// Handles case where client submits wrong/invalid game code
function handleUnknownGame() { 
    reset();
    alert("Unknown Game Code");
}

// Handles case where game room is at max capacity
function handleTooManyPlayers() { 
    reset();
    alert("This game is at max capacity.");
}

// Handles case where there are not enough players in a room to start a game
function handleNotEnoughPlayers() { 
    alert("3 or more players required to start game.");
}

// Displays an alert reflecting who won the game and takes client back to waiting screen
function handleGameOver(data) { 
    let winners = JSON.parse(data);
    if (winners.length === 1) { 
        let winnerName = winners[0][1];
        let winnerScore = winners[0][2];

        let winnerStr = "Game Over! You won with " + winnerScore + " points!";
        let loserStr = "Game Over! " + winnerName + " won. Your perfect partners were sub-par /:"
        
        if (winners[0][0] === playerNumber) { 
            alert(winnerStr);
        } else { 
            alert (loserStr);
        }
    } else { 
        let multipleWinnerStr = "Game Over! " + winners[0][1];
        for (let i = 1; i < winners.length; i++) { 
            multipleWinnerStr += " and " + winners[i][1];
        }
        multipleWinnerStr += " won with " + winners[0][2] + " points each!"
        alert(multipleWinnerStr);
    }

    initialScreen.style.display = "none";
    gameScreen.style.display = "none";
    waitingScreen.style.display = "block";
    daterChoosing.style.display = "none";
    scoreBoard.style.display = "none";
}

// Resets client 
function reset() { 
    playerNumber = null;
    gameCodeInput.val = '';
    gameCodeDisplay.innerText = "";
    initialScreen.style.display = "block";
}