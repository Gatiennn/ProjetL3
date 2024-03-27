<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake</title>
    <link rel="stylesheet" href="styles3.css">
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
        <div id="game">
            <canvas id="gameCanvas" width="400" height="400"></canvas>
            <div id="score">Score: <span id="scoreValue">0</span></div>
        </div>
        <button id="restartBtn">Recommencer</button>
    </div>
    <script src="snake.js"></script>
</body>
<footer>
    <a href="index.php">Retour à la page d'accueil</a>
</footer>
</html>