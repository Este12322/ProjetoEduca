var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function () {
    setGame();

    // Event listener for restart button
    document.getElementById("restartBtn").addEventListener("click", restartGame);
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    gameOver = false;

    // Clear board HTML
    document.getElementById("board").innerHTML = '';

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").appendChild(tile);
        }
        board.push(row);
    }

    // Clear winner message and hide it initially
    let winner = document.getElementById("winner");
    winner.innerText = "";  // Clear any previous winner text
    winner.style.display = "none";  // Hide the winner message
}

function setPiece() {
    if (gameOver) {
        return; // Do nothing if the game is over
    }

    let coords = this.id.split("-");
    let r = currColumns[parseInt(coords[1])];
    let c = parseInt(coords[1]);

    if (r < 0) {
        return; // If the column is full, do nothing
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    currColumns[c]--;
    checkWinner();
}

function checkWinner() {
    // Check for horizontal wins
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] &&
                    board[r][c + 1] == board[r][c + 2] &&
                    board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check for vertical wins
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] &&
                    board[r + 1][c] == board[r + 2][c] &&
                    board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check for diagonal wins (down-right)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] &&
                    board[r + 1][c + 1] == board[r + 2][c + 2] &&
                    board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check for diagonal wins (up-right)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] &&
                    board[r - 1][c + 1] == board[r - 2][c + 2] &&
                    board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");

    // Display the winner's message
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }

    // Show the winner message
    winner.style.display = "block";  // Make the winner message visible

    gameOver = true;  // End the game
}

function restartGame() {
    // Clear the board array and reset game variables
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    gameOver = false;

    // Clear the board HTML
    document.getElementById("board").innerHTML = '';

    // Clear winner message and hide it
    let winner = document.getElementById("winner");
    winner.innerText = "";  // Clear the text
    winner.style.display = "none";  // Hide the winner message

    // Initialize the game again
    setGame();
}
