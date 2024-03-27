<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil</title>
    <link rel="stylesheet" href="styles_php.css">
</head>
<body>
    <div class="container">
        <h1>Bienvenue sur notre site</h1>
        <p>Connectez vous ou créez un compte pour enregistrer vos meilleurs scores !</p>

        <!-- Affichage du message de connexion -->
        <?php
        session_start();
        if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
            $username = $_SESSION['username'];
            echo "<p>Connecté en tant que $username</p>";
        } else {
            echo "<p>Non connecté</p>";
        }
        ?>

        <!-- Liens de navigation -->
        <ul>
            <li><a href="index.php">Accueil</a></li>
            <?php
            if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
                echo "<li><a href='logout.php'>Déconnexion</a></li>";
            } else {
                echo "<li><a href='login.html'>Connexion</a></li>";
                echo "<li><a href='register.html'>Inscription</a></li>";
            }
            ?>
        </ul>
    </div>
</body>
<footer>
    <p>&copy; 2024 Site de Jeux. Tous droits réservés.</p>
</footer>
</html>
