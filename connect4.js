var playRed = "R";
var playYellow = "Y";
var currentPlayer = playRed;
var gameOver = false;
var board;
var rows = 6;
var columns = 7;
var currentCoul;

var moveSound = document.getElementById("moveSound");
var winSound = document.getElementById("winSound");

window.onload = function () {
    setGame();
};

function setGame() {
    board = [];
    currentCoul = [5, 5, 5, 5, 5, 5, 5];
    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < columns; c++) {
            row.push(' ');
            var tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }
    var coords = this.id.split("-");
    var r = parseInt(coords[0]);
    var c = parseInt(coords[1]);
    r = currentCoul[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currentPlayer;
    var tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playRed) {
        tile.classList.add("red-piece");
        currentPlayer = playYellow;
        playSound(moveSound);
    } else {
        tile.classList.add("yellow-piece");
        currentPlayer = playRed;
        playSound(moveSound);
    }
    r -= 1;
    currentCoul[c] = r;
    checkWinner();
}

function checkWinner() {
    //Horizentally
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }


     // anti diagonal
     for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    var winner = document.getElementById("winner");
    if (board[r][c] == playRed) {
        winner.innerText = "Red win";
    } else {
        winner.innerText = "Yellow win";
    }
    playSound(winSound);
    gameOver = true;
}

// Function to play a sound
function playSound(audioElement) {
    audioElement.currentTime = 0; // Rewind to the beginning to allow rapid replay
    audioElement.play();
}
