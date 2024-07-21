document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restart');
    const winnerMessageElement = document.getElementById('winner-message');
    const introMessage = document.getElementById("intro-message");
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let gameActive = true;

    function initializeGame() {
        introMessage.style.display = "flex";
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleClick(cell, index), { once: true });
        });
    }

    function handleClick(cell, index) {
        if (!gameActive || boardState[index]) return;
        introMessage.style.display = "none";

        cell.textContent = currentPlayer;
        cell.style.fontSize = "100px";
        cell.style.textAlign = "center";
        cell.style.lineHeight = "100px";

        if (currentPlayer === 'X') {
            cell.style.color = 'blue';
        } else {
            cell.style.color = 'red';
        }

        boardState[index] = currentPlayer;

        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (boardState.every(cell => cell)) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    function swapTurns() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            if (combination.every(index => boardState[index] === player)) {
                highlightCells(combination);
                return true;
            }
            return false;
        });
    }

    function highlightCells(combination) {
        combination.forEach(index => {
            cells[index].style.border = "5px solid green";
        });
    }

    function endGame(draw) {
        gameActive = false;
        if (draw) {
            winnerMessageElement.textContent = `It's a tie!`;
        } else {
            winnerMessageElement.textContent = `${currentPlayer} won!`;
        }
        winnerMessageElement.style.display = "flex";
        restartButton.innerText = "Restart";
        restartButton.style.display = "flex";
    }

    function restartGame() {
        currentPlayer = 'X';
        boardState = Array(9).fill(null);
        gameActive = true;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '';
            cell.style.boxShadow = '';
            cell.style.border = '';
        });
        winnerMessageElement.style.display = "none";
        restartButton.style.display = "none";
        initializeGame();
    }

    restartButton.addEventListener('click', restartGame);

    initializeGame();
});