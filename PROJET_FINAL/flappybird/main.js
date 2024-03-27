document.getElementById("startgame").addEventListener("click", ()=> {

    var gameDisplay = document.getElementById("game-container");

    var bird = document.getElementById("bird");
    let birdLeft = 80;
    let birdBottom = 250;
    let velocityY = 35;
    let gravity = 1.5;
    var flySound = new Audio('flap.wav');
    var fail = new Audio('fail.wav');
    var succs = new Audio('succs.wav');

    var startButton = document.getElementById("startgame");
    var restart = document.getElementById("restart-container");
    
    var isGameOver = false;
    var score = 0;
    let jeu = 'score_flappy';
    
    function startGame(){
        startButton.style.display = "none";
        
        bird.style.display = "block";
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + "px"; 
        bird.style.left = birdLeft + "px";
        //console.log(document.getElementById('bird').style.bottom);
            
    }  let gameTimerId = setInterval(startGame, 20);
    
    document.addEventListener("keyup", control);
    function control(e) {
        if (e.keyCode === 32) {
            fly();
        }
    }

    function sendScore(score) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../stocker_score.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        const data = "score=" + score + "&jeu=" + jeu;
        xhr.send(data);
    }
    
    function fly() {
        if (birdBottom < 450) {
            flySound.play();
            birdBottom += velocityY;
            bird.style.bottom = birdBottom + "px";
            var direction = 0;
            bird.style.transform = "rotate(" + (direction - 45) + "deg)";
            setTimeout(() => {
                bird.style.transform = "rotate(" + (direction += 0.5) + "deg)";
            }, 200);
            
        } 

    }
    
    function generateObstacles() {
        let pipeLeft = 900;
        let randomHeight = Math.random() * 150;
        let pipeBottom = randomHeight;
        var gap = 400;
        var pipe = document.createElement('div');
        var topPipe = document.createElement('div');
        if (!isGameOver) {
            pipe.classList.add('pipe');
            topPipe.classList.add('topPipe');
        }
        gameDisplay.appendChild(topPipe);
        topPipe.style.bottom = pipeBottom + gap + "px";
        topPipe.style.left = pipeLeft + "px";
        gameDisplay.appendChild(pipe);
        pipe.style.bottom = pipeBottom + "px";
        pipe.style.left = pipeLeft + "px";

        function moveObstacle() {
            pipeLeft -= 2;
            pipe.style.left = pipeLeft + "px";
            topPipe.style.left = pipeLeft + "px";

            if (pipeLeft === -80) {
                gameDisplay.removeChild(pipe);
                gameDisplay.removeChild(topPipe);
            }

            var pipeCollisionDetectLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue("left"));
            var pipeCollisionDetectBottom = parseInt(window.getComputedStyle(pipe).getPropertyValue("bottom"));
            var topPipeCollisionDetectLeft = parseInt(window.getComputedStyle(topPipe).getPropertyValue("left"));
            var topPipeCollisionDetectBottom = parseInt(window.getComputedStyle(topPipe).getPropertyValue("bottom"));
            var birdBottomDetection = parseInt(window.getComputedStyle(bird).getPropertyValue("bottom"));
            
            if (pipeLeft < 115 && pipeLeft > 50 && birdLeft === 80 &&
                (birdBottom < pipeBottom + 138 || birdBottom > pipeBottom + gap - 200)||
                birdBottom === -12) {
                fail.play();
                clearInterval(gameTimerId);
                gameDisplay.removeChild(pipe);
                gameDisplay.removeChild(topPipe);
                pipe.style.display = "none";
                topPipe.style.display = "none";
                gameOver();
            }

            if (birdBottomDetection > pipeCollisionDetectBottom && birdBottom < topPipeCollisionDetectBottom && birdLeft == pipeCollisionDetectLeft && birdLeft == topPipeCollisionDetectLeft){
                score += 1;
                document.querySelector(".score").innerHTML = "Score: " + score;
                succs.play();
            }

        }
        let gameTimerId = setInterval(moveObstacle, 20); 
        if (!isGameOver) setTimeout(generateObstacles, 3000);

    }
    generateObstacles();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        sendScore(score);
        document.removeEventListener('keyup', control);
        restart.style.display = "block";
        document.getElementById("endscore").innerHTML = "Score: " + score;
    }
    document.getElementById("restartgame").addEventListener("click", reset);

    function reset(){
        score = 0;
        location.reload();
    }
    
})