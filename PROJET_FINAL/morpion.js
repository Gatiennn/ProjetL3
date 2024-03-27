const board = document.getElementById('board');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameMode = '';

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let cells = [];

function startGame(mode) {
    gameMode = mode;
    cells = Array.from({ length: 9 }).fill('');
    currentPlayer = '';
    render();
    message.innerText = `Cliquez sur le bouton pour lancer la pièce`;
}

function coinToss() {
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    message.innerText = `Le joueur ${currentPlayer} commence`;
    if (gameMode.startsWith('pvc') && currentPlayer === 'O') {
        makeAiMove();
    }
}

function render() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => cellClick(index));
        board.appendChild(cellDiv);
    });
}

function cellClick(index) {
    if (cells[index] === '' && !checkWinner()) {
        cells[index] = currentPlayer;
        render();
        if (checkWinner()) {
            message.innerText = `Le joueur ${currentPlayer} a gagné !`;
        } else if (!cells.includes('')) {
            message.innerText = `Match nul !`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `Tour du joueur ${currentPlayer}`;
            if (gameMode.startsWith('pvc') && currentPlayer === 'O') {
                makeAiMove();
            }
        }
    }
}

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    cells = Array.from({ length: 9 }).fill('');
    currentPlayer = 'X';
    render();
    message.innerText = `Tour du joueur ${currentPlayer}`;
}

function makeAiMove() {
    let emptyCells = cells.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let selectedCell;
    if (gameMode === 'pvc_easy') {
        selectedCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else if (gameMode === 'pvc_medium') {
        selectedCell = findWinningMove() || findBlockingMove() || emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else if (gameMode === 'pvc_hard') {
        selectedCell = minimax(cells, currentPlayer).index;
    }

    cells[selectedCell] = currentPlayer;
    render();
    if (checkWinner()) {
        message.innerText = `Le joueur ${currentPlayer} a gagné !`;
    } else if (!cells.includes('')) {
        message.innerText = `Match nul !`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.innerText = `Tour du joueur ${currentPlayer}`;
    }
}

function findWinningMove() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] === currentPlayer && cells[a] === cells[b] && cells[c] === '') {
            return c;
        }
        if (cells[b] === currentPlayer && cells[b] === cells[c] && cells[a] === '') {
            return a;
        }
        if (cells[c] === currentPlayer && cells[c] === cells[a] && cells[b] === '') {
            return b;
        }
    }
    return null;
}

function findBlockingMove() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const blockingMove = findWinningMove();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return blockingMove;
}

function minimax(newBoard, player) {
    let emptyCells = newBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (checkWinner()) {
        return { score: player === 'X' ? -10 : 10 };
    } else if (emptyCells.length === 0) {
        return { score: 0 };
    }

    let moves = [];

    for (let i = 0; i < emptyCells.length; i++) {
        let move = {};
        move.index = emptyCells[i];
        newBoard[emptyCells[i]] = player;

        if (player === 'X') {
            let result = minimax(newBoard, 'O');
            move.score = result.score;
        } else {
            let result = minimax(newBoard, 'X');
            move.score = result.score;
        }

        newBoard[emptyCells[i]] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'X') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}