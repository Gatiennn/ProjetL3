// Sélectionner les éléments HTML
let container = document.querySelector('.container');
let btn = document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');
let difficultyButtons = document.querySelectorAll('.difficulty_btn');
let jeu = 'score_shoot';

let difficulty = 'facile'; // Niveau de difficulté par défaut

// Fonction pour déterminer la durée de disparition des cibles en fonction du niveau de difficulté
function getDisappearTime(difficulty) {
    switch (difficulty) {
        case 'facile':
            return 1200; // Disparition au bout de 1200ms (1.2s)
        case 'moyen':
            return 700; // Disparition au bout de 700ms (0.7s)
        case 'difficile':
            return 400; // Disparition au bout de 400ms (0.4s)
        default:
            return 1200; // Par défaut, niveau facile
    }
}

// Gestionnaire d'événements pour les boutons de difficulté
difficultyButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Mettre à jour la variable de difficulté en fonction de l'attribut data-difficulty du bouton
        difficulty = button.getAttribute('data-difficulty');
    });
});

function sendScore(score) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "stocker_score.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    const data = "score=" + score + "&jeu=" + jeu;
    xhr.send(data);
}

btn.onclick = function(){
    let score = 0;
    let time = 30;
    container.innerHTML = "";

    let interval = setInterval(function showTarget(){
        // Création de la cible
        let target = document.createElement('img');
        target.id = "target";
        target.src = "cible.png";
        container.appendChild(target);
        target.style.top = Math.random() * (500 - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (600 - target.offsetWidth) + 'px';

        // Faire disparaître la cible après un temps déterminé par le niveau de difficulté
        let disappearTime = getDisappearTime(difficulty);
        setTimeout(function(){
            target.remove();
        }, disappearTime);

        // Quand on clique sur la cible
        target.onclick = function(){
            score+=1;
            target.style.display = 'none';
        }
        time -= 1;

        // Afficher les infos
        scoreContainer.innerHTML = `Score : ${score} `;
        timeContainer.innerHTML = `Temps : ${time}`;

        // Fin du jeu quand le temps est écoulé
        if(time == 0){
            clearInterval(interval);
            container.innerHTML = "Le jeu est terminé";
            sendScore(score);
        }

    }, 1000);
}