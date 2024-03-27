document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            document.getElementById('message').innerHTML = "Connexion réussie";
            document.getElementById('logoutBtn').style.display = 'block';
        } else {
            document.getElementById('message').innerHTML = "Identifiants invalides";
        }
    });
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    fetch('logout.php', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            document.getElementById('message').innerHTML = "Déconnexion réussie";
            document.getElementById('logoutBtn').style.display = 'none';
        }
    });
});

var homeBtn = document.getElementById("HomeBtn");
    homeBtn.addEventListener("click", function() {
        window.location.href = "index.php";
    });
