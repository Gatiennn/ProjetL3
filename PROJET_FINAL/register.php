<?php
session_start();

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bdd_projet";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];
$mail= $_POST['mail'];

// Vérifier si l'utilisateur existe déjà
$sql_check = "SELECT * FROM user WHERE username='$username'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    echo json_encode(array("success" => false, "message" => "L'utilisateur existe déjà"));
} else {
    // Insérer le nouvel utilisateur
    $sql_insert = "INSERT INTO user (username, mdp, mail) VALUES ('$username', '$password', '$mail')";
    if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(array("success" => true, "message" => "Inscription réussie"));
    } else {
        echo json_encode(array("success" => false, "message" => "Erreur lors de l'inscription"));
    }
}

$conn->close();
?>
