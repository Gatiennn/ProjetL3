<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jeu de Tir</title>
    <link rel="stylesheet" href="styles2.css">
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
    <div class="game">
        <div class="difficulty_buttons">
            <button class="difficulty_btn" data-difficulty="facile">Facile</button>
            <button class="difficulty_btn" data-difficulty="moyen">Moyen</button>
            <button class="difficulty_btn" data-difficulty="difficile">Difficile</button>
        </div>
        <button class="start_btn">Commencer / Recommencer</button>
        <div class="game_infos">
            <span class="score">Score : 0</span>
            <span class="time"> Temps : 0</span>
        </div>
        <div class="container">
        </div>
    </div>
    
    <footer class="footer">
        <a href="index.php" class="home_link">Retour à la page d'accueil</a>
    </footer>
    <script src="jeuTir.js"></script>
</body>
</html>