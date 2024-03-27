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
  <h1 id="titre"><span >Classements</span></h1>
  <hr>
  <div class="bloc-text">
    <p>Bienvenue sur la page classement </br></br>
    Vous y trouverez les classement de certains jeux.</br>
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
