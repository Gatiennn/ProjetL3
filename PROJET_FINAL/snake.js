document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const restartBtn = document.getElementById('restartBtn');
    const scoreValue = document.getElementById('scoreValue');

    const gridSize = 20;
    const tileCount = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 10 };
    let dx = 0;
    let dy = 0;
    let jeu = 'score_snake';
    let score = 0;

    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = '#2ecc71';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        // Draw food
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Draw score
        scoreValue.textContent = score;
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        // Check collision with food
        if (head.x === food.x && head.y === food.y) {
            score++;
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);

        // Avoid spawning food on snake
        if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            generateFood();
        }
    }

    function checkGameOver() {
        if (
            snake[0].x < 0 || snake[0].x >= tileCount ||
            snake[0].y < 0 || snake[0].y >= tileCount ||
            snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
        ) {
            return true;
        }
        return false;
    }

    function sendScore(score) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "stocker_score.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        const data = "score=" + score + "&jeu=" + jeu;
        xhr.send(data);
    }

    function gameLoop() {
        if (checkGameOver()) {
            sendScore(score);
            alert('Game Over! Score: ' + score);
            resetGame();
            return;
        }

        moveSnake();
        draw();
        setTimeout(gameLoop, 100);
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = { x: 15, y: 10 };
        dx = 0;
        dy = 0;
        score = 0;
    }

    // Keyboard controls
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key === 'ArrowUp' && dy === 0) {
            dx = 0;
            dy = -1;
        } else if (key === 'ArrowDown' && dy === 0) {
            dx = 0;
            dy = 1;
        } else if (key === 'ArrowLeft' && dx === 0) {
            dx = -1;
            dy = 0;
        } else if (key === 'ArrowRight' && dx === 0) {
            dx = 1;
            dy = 0;
        }
    });

    // Restart game button
    restartBtn.addEventListener('click', function() {
        resetGame();
        gameLoop();
    });
    
    generateFood();
    gameLoop();
});