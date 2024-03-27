document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    const playerVsPlayerBtn = document.getElementById('playerVsPlayerBtn');
    const restartBtn = document.getElementById('restartBtn');
    const scorePlayer1Element = document.getElementById('scorePlayer1');
    const scorePlayer2Element = document.getElementById('scorePlayer2');

    let gameLoopId;

    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;
    const initialBallSpeed = 10;
    const paddleSpeed = 5;
    let paddle1Y = canvas.height / 2 - paddleHeight / 2;
    let paddle2Y = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDX = initialBallSpeed;
    let ballDY = initialBallSpeed;
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let keysPressed = {};

    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw paddles
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

        // Draw ball
        ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

        // Draw score
        scorePlayer1Element.textContent = scorePlayer1;
        scorePlayer2Element.textContent = scorePlayer2;
    }

    function moveBall() {
        ballX += ballDX;
        ballY += ballDY;

        // Collision with top and bottom walls
        if (ballY + ballSize / 2 >= canvas.height || ballY - ballSize / 2 <= 0) {
            ballDY = -ballDY;
        }

        // Collision with paddles
        if (
            (ballX - ballSize / 2 <= paddleWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddleHeight) ||
            (ballX + ballSize / 2 >= canvas.width - paddleWidth && ballY >= paddle2Y && ballY <= paddle2Y + paddleHeight)
        ) {
            ballDX = -ballDX;
        }

        // Collision with left and right walls
        if (ballX + ballSize / 2 >= canvas.width || ballX - ballSize / 2 <= 0) {
            if (ballX - ballSize / 2 <= 0) {
                scorePlayer2++;
            } else {
                scorePlayer1++;
            }
            resetBall();
        }
    }

    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDX = initialBallSpeed;
        ballDY = initialBallSpeed;
    }

    function movePaddles() {
        // Move paddle 1 (Player 1)
        if (keysPressed['z'] && paddle1Y > 0) {
            paddle1Y -= paddleSpeed;
        }
        if (keysPressed['s'] && paddle1Y < canvas.height - paddleHeight) {
            paddle1Y += paddleSpeed;
        }

        // Move paddle 2 (Player 2)
        if (keysPressed['ArrowUp'] && paddle2Y > 0) {
            paddle2Y -= paddleSpeed;
        }
        if (keysPressed['ArrowDown'] && paddle2Y < canvas.height - paddleHeight) {
            paddle2Y += paddleSpeed;
        }
    }

    function gameLoop() {
        moveBall();
        movePaddles();
        draw();

        if (scorePlayer1 < 11 && scorePlayer2 < 11) {
            gameLoopId = requestAnimationFrame(gameLoop);
        } else {
            cancelAnimationFrame(gameLoopId);
            alert('Fin du jeu. Joueur ' + (scorePlayer1 >= 11 ? '1' : '2') + ' gagne!');
        }
    }

    function startGame() {
        if (!gameLoopId) {
            gameLoop();
        }
    }

    playerVsPlayerBtn.addEventListener('click', function() {
        startGame();
    });

    restartBtn.addEventListener('click', function() {
        window.location.reload(); // Actualiser la page
    });

    draw();

    document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true;
    });

    document.addEventListener('keyup', function(event) {
        keysPressed[event.key] = false;
    });
});