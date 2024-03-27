<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site de jeu</title>
  <link rel="stylesheet" href="styles_index.css">
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
  <header>
<div class="header">
      <h1 id='logo'><a href="index.php">Site de Jeu</h1>
      <nav>
        <ul>
          <li><a href="index.php">Accueil</a></li>
          <li><a href="liste_jeux.php">Jeux</a></li>
          <li><a href="classements.php">Classements</a></li>
          <li><a href="a_propos.html">À propos</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="accueil.php">COMPTE</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <h1 id="titre"><span style="animation: 2s ease 0s infinite normal none running entourer;">Bienvenue</span> <span style="animation: 2s ease 0s infinite normal none running entourer;">sur</span> <span style="animation: 2s ease 0s infinite normal none running entourer;">notre Site</span></h1>
  <hr>
  <div class="bloc-text">
    <p>Bienvenue sur notre site ! </br></br>
      Ce site est réalisé par des étudiants pour un projet universitaire.</br> Vous y trouverez divers jeux.</br> Le site est en constante amélioration. </p>
      </div>
      <hr>
  <main>
    <div class="container">
        <div class="game">
            <h2>Morpion<br/> <br/> <img src=https://static-00.iconduck.com/assets.00/tic-tac-toe-icon-512x512-evpdbsvf.png></h2>
            <a href="jeu1.html" class="play-button">Jouer</a>
        </div>
        <div class="game">
            <h2>Flappy Bird<br/><br/><img src=https://store-images.s-microsoft.com/image/apps.3343.9007199266251606.f9459c88-609f-40df-aa7c-f864f4965cd0.c82e9c30-5a81-4eec-a4a9-290f8c3f31c2?mode=scale&q=90&h=200&w=200&background=%23464646></h2>
            <a href="flappybird/index.php" class="play-button">Jouer</a>
        </div>
        <div class="game">
            <h2>Jeu de Tir <br/> <br/> <img src=https://cdn-icons-png.flaticon.com/512/1620/1620460.png></h2>
            <a href="jeu3.php" class="play-button">Jouer</a>
        </div>
        <div class="game">
            <h2>Snake <br/> <br/> <img src=https://cdn-icons-png.freepik.com/512/616/616653.png></h2>
            <a href="jeu4.php" class="play-button">Jouer</a>
        </div>
        <div class="game">
            <h2>Pong <br/> <br/> <img src=https://pjvtt.fr/wp-content/uploads/2022/11/429-4291136_table-tennis-png-download-ping-pong-icon-png.png></h2>
            <a href="jeu5.html" class="play-button">Jouer</a>
        </div>
    </div>
</main>
<hr>
  <div class="bloc-text">
    <p>Classements</br>
      </div>
      <hr>
  <main>
    <div class="container">
        <div class="game">
            <h2>Classement Flappy Bird<br/><br/><img src=https://store-images.s-microsoft.com/image/apps.3343.9007199266251606.f9459c88-609f-40df-aa7c-f864f4965cd0.c82e9c30-5a81-4eec-a4a9-290f8c3f31c2?mode=scale&q=90&h=200&w=200&background=%23464646></h2>
            <a href="classement_flappy.php" class="play-button">Jouer</a>
        </div>
        <div class="game">
            <h2>Classement Jeu de Tir <br/> <br/> <img src=https://cdn-icons-png.flaticon.com/512/1620/1620460.png></h2>
            <a href="classement_tir.php" class="play-button">Jouer</a>
        </div>
        <div class="game">
            <h2>Classement Snake <br/> <br/><br/> <img src=https://cdn-icons-png.freepik.com/512/616/616653.png></h2>
            <a href="classement_snake.php" class="play-button">Jouer</a>
        </div>
    </div>
</main>
<footer>
    <p>&copy; 2024 Site de Jeux. Tous droits réservés.</p>
</footer>
</body>
</html>
