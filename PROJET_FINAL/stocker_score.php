<?php
// Démarrez la session PHP si ce n'est pas déjà fait
session_start();

// Vérifiez si l'utilisateur est connecté
if (!isset($_SESSION['username'])) {
    die("Utilisateur non connecté.");
}

// Récupérer le nombre d'essais depuis la requête AJAX
$score_snake = $_POST['score'];
$jeu = $_POST['jeu'];
$username = $_SESSION['username']; // Récupérer le nom d'utilisateur depuis la session

// Connexion à la base de données
$serveur = "localhost"; // Adresse du serveur MySQL
$utilisateur = "root"; // Nom d'utilisateur MySQL
$mdp = ""; // Mot de passe MySQL
$base_de_donnees = "bdd_projet"; // Nom de la base de données

// Connexion
$connexion = new mysqli($serveur, $utilisateur, $mdp, $base_de_donnees);

// Vérifier la connexion
if ($connexion->connect_error) {
    die("La connexion a échoué : " . $connexion->connect_error);
}

// Mettre à jour le score dans la base de données
$requete = "UPDATE user SET $jeu = $score_snake WHERE username = '$username' AND $jeu< $score_snake";

if ($connexion->query($requete) === TRUE) {
    echo "Score mis à jour avec succès pour l'utilisateur $username.";
} else {
    echo "Erreur lors de la mise à jour du score pour l'utilisateur $username score $score_snake: " . $connexion->error;
}

// Fermer la connexion
$connexion->close();
?>
