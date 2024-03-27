<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classement des Utilisateurs</title>
    <link rel="stylesheet" href="style_classement.css">
</head>
<body>
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
    <div class="container">
        <h1>Classement Shooter</h1>
        <table>
            <tr>
                <th>Position</th>
                <th>Nom d'Utilisateur</th>
                <th>Score</th>
            </tr>
    <?php
        // Connexion à la base de données
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "bdd_projet";

        $conn = new mysqli($servername, $username, $password, $dbname);

        // Vérification de la connexion
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Récupération et tri des données
        $sql = "SELECT username, score_shoot FROM user ORDER BY score_shoot DESC";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Affichage des données sous forme de tableau
            $position = 1;
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>".$position."</td>";
                echo "<td>".$row["username"]."</td>";
                echo "<td>".$row["score_shoot"]."</td>";
                echo "</tr>";
                $position++;
            }
        } else {
            echo "<tr><td colspan='3'>Aucun utilisateur trouvé.</td></tr>";
        }
        $conn->close();
        ?>
        </table>
    </div>
</body>
</html>
