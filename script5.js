
let gameBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";
let gameOver = false;

document.addEventListener("DOMContentLoaded", function() {
    renderGameBoard();
    document.getElementById("current-player").innerText = `Current Player: ${currentPlayer}`;
});

function handleCellClick(cellIndex) {
    if (gameOver) return;
    if (gameBoard[cellIndex] !== "") return;

    gameBoard[cellIndex] = currentPlayer;
    renderGameBoard();

    checkForWin();
    checkForDraw();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("current-player").innerText = `Current Player: ${currentPlayer}`;
}

function renderGameBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.innerText = gameBoard[i];
    }
}

function checkForWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            document.getElementById("game-result").innerText = `Player ${gameBoard[a]} wins!`;
            return;
        }
    }
}

function checkForDraw() {
    if (!gameBoard.includes("")) {
        gameOver = true;
        document.getElementById("game-result").innerText = "It's a draw!";
    }
}

function resetGame() {
    gameBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
    currentPlayer = "X";
    gameOver = false;
    renderGameBoard();
    document.getElementById("game-result").innerText = "";
    document.getElementById("current-player").innerText = `Current Player: ${currentPlayer}`;
}

// Add event listeners to cells
for (let i = 0; i < gameBoard.length; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.addEventListener("click", () => handleCellClick(i));
}