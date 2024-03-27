const container = document.getElementById('container');
const scoreValue = document.getElementById('scoreValue');
let score = 0;
let grid = [];
const rows = 20;
const cols = 10;
let currentPiece = null;
let currentPieceX = 3; // Position initiale en x de la pièce
let currentPieceY = 0; // Position initiale en y de la pièce
let intervalId = null;
let lastMoveTime = 0;
const moveInterval = 500; // Intervalle de temps entre les mouvements automatiques de la pièce (en millisecondes)

// Initialise la grille
function initGrid() {
    grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(new Array(cols).fill(0));
    }
}

// Crée une nouvelle pièce
function createPiece() {
    const pieces = [
        [[1, 1], [1, 1]], // Carré
        [[0, 1, 0], [1, 1, 1]], // L
        [[0, 1, 1], [1, 1, 0]], // L inversé
        [[1, 1, 0], [0, 1, 1]], // S
        [[0, 1, 1], [1, 1, 0]], // Z
        [[1, 1, 1, 1]] // Ligne
    ];
    const randomIndex = Math.floor(Math.random() * pieces.length);
    currentPiece = pieces[randomIndex];
}

// Vérifie si la partie est terminée
function isGameOver() {
    for (let i = 0; i < currentPiece.length; i++) {
        for (let j = 0; j < currentPiece[i].length; j++) {
            if (currentPiece[i][j] === 1 && grid[currentPieceY + i][currentPieceX + j] === 1) {
                return true;
            }
        }
    }
    return false;
}

// Vérifie si la pièce peut se déplacer vers le bas
function canMoveDown() {
    for (let i = 0; i < currentPiece.length; i++) {
        for (let j = 0; j < currentPiece[i].length; j++) {
            if (currentPiece[i][j] === 1) {
                const nextRow = currentPieceY + i + 1;
                if (nextRow === rows || grid[nextRow][currentPieceX + j] === 1) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Déplace la pièce vers le bas
function moveDown() {
    if (canMoveDown()) {
        currentPieceY++;
    } else {
        clearInterval(intervalId);
        checkLines();
        createPiece();
        currentPieceX = 3;
        currentPieceY = 0;
        if (isGameOver()) {
            clearInterval(intervalId);
            alert('Game Over! Your score: ' + score);
            return;
        }
    }
    drawGrid();
    drawPiece();
}

// Vérifie si la pièce peut se déplacer vers la droite
function canMoveRight() {
    for (let i = 0; i < currentPiece.length; i++) {
        for (let j = 0; j < currentPiece[i].length; j++) {
            if (currentPiece[i][j] === 1) {
                const nextCol = currentPieceX + j + 1;
                if (nextCol >= cols || grid[currentPieceY + i][nextCol] === 1) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Déplace la pièce vers la droite
function moveRight() {
    if (canMoveRight()) {
        currentPieceX++;
        drawGrid();
        drawPiece();
    }
}

// Vérifie si la pièce peut se déplacer vers la gauche
function canMoveLeft() {
    for (let i = 0; i < currentPiece.length; i++) {
        for (let j = 0; j < currentPiece[i].length; j++) {
            if (currentPiece[i][j] === 1) {
                const prevCol = currentPieceX + j - 1;
                if (prevCol < 0 || grid[currentPieceY + i][prevCol] === 1) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Déplace la pièce vers la gauche
function moveLeft() {
    if (canMoveLeft()) {
        currentPieceX--;
        drawGrid();
        drawPiece();
    }
}

// Vérifie si la pièce peut tourner dans le sens horaire
function canRotateClockwise() {
    const rotatedPiece = rotatePiece(currentPiece);
    return isValidMove(rotatedPiece, currentPieceX, currentPieceY);
}

// Tourne la pièce dans le sens horaire
function rotateClockwise() {
    if (canRotateClockwise()) {
        currentPiece = rotatePiece(currentPiece);
        drawGrid();
        drawPiece();
    }
}

// Tourne une pièce de 90 degrés dans le sens horaire
function rotatePiece(piece) {
    const rotatedPiece = [];
    const pieceSize = piece.length;
    for (let i = 0; i < pieceSize; i++) {
        rotatedPiece.push(new Array(pieceSize).fill(0));
    }
    for (let i = 0; i < pieceSize; i++) {
        for (let j = 0; j < pieceSize; j++) {
            rotatedPiece[j][pieceSize - 1 - i] = piece[i][j];
        }
    }
    return rotatedPiece;
}

// Vérifie si le mouvement d'une pièce est valide
function isValidMove(piece, x, y) {
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j] === 1) {
                const row = y + i;
                const col = x + j;
                if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] === 1) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Met à jour le score
function updateScore(lines) {
    score += lines * 100;
    scoreValue.textContent = score;
}

// Vérifie s'il y a des lignes complétées
function checkLines() {
    let linesCleared = 0;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].every(cell => cell === 1)) {
            grid.splice(i, 1);
            grid.unshift(new Array(cols).fill(0));
            linesCleared++;
        }
    }
    if (linesCleared > 0) {
        updateScore(linesCleared);
    }
}

// Dessine la grille
function drawGrid() {
    container.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = grid[i][j] === 1 ? 'cell active' : 'cell';
            container.appendChild(cell);
        }
    }
}

// Dessine la pièce sur la grille
function drawPiece() {
    for (let i = 0; i < currentPiece.length; i++) {
        for (let j = 0; j < currentPiece[i].length; j++) {
            if (currentPiece[i][j] === 1) {
                grid[currentPieceY + i][currentPieceX + j] = 1;
            }
        }
    }
}

// Boucle de jeu
function gameLoop() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastMoveTime;

    if (elapsedTime > moveInterval) {
        lastMoveTime = currentTime;

        // Déplace automatiquement la pièce vers le bas
        if (canMoveDown()) {
            moveDown();
        } else {
            checkLines();
            createPiece();
            currentPieceX = 3;
            currentPieceY = 0;
            if (isGameOver()) {
                clearInterval(intervalId);
                alert('Game Over! Your score: ' + score);
                return;
            }
        }
    }

    drawGrid();
    drawPiece();
}

// Initialise le jeu
function startGame() {
    initGrid();
    createPiece();
    drawGrid();
    drawPiece();
    intervalId = setInterval(gameLoop, 1000 / 60); // Appel de la boucle de jeu environ 60 fois par seconde
}

// Gère les événements clavier
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowUp':
            rotateClockwise();
            break;
    }
});

startGame();
