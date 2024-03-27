<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link href = "flappybird.png" rel="icon" type="image/gif">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Flappy Bird</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <?php
        session_start();
        if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
            $username = $_SESSION['username'];
            echo "<p>Connecté en tant que $username</p>";
        } else {
            echo "<p>Non connecté</p>";
        }
        ?>
        <div id="game-container">
                <div id="backdrop">
                    <button id="startgame">
                        START
                    </button> <!-- START GAME -->
                    
                    <p class="score">
                        Score: 0
                    </p> <!-- SCORE IN-GAME -->
        
                    <div id="restart-container">
                        <p class="score" id="endscore">
                            Score: 0
                        </p>
                        <button id="restartgame">
                            RESTART
                        </button>
                    </div> <!-- GAME OVER RESTART -->

                    <div id="bird"></div> <!-- PLAYER -->
                </div> <!-- GAME BACKGROUND SKY-->
            
            <div id="ground-moving">
                <div id="ground"></div>
            </div> <!-- GROUND -->
        </div> <!-- GAME CONTAINER -->
        <footer>
            <a href="../index.php" class="link">Retour à la page d'accueil</a>
        </footer>
    </body>
    <script src="main.js"></script>
</html>