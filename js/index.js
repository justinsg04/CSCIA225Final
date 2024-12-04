document.getElementById("play-button").addEventListener("click", function () {
    window.location.href = "game.html";
});

document.getElementById("leaderboard-btn").addEventListener("click", function () {
    window.location.href = "leaderboard.html";
});

// how to play popup
const instructionsButton = document.getElementById('instructions-button');
const howtoButton = document.getElementById('howto')
const popup = document.getElementById('how-to-play-popup');
const closeButton = document.querySelector('.popupCloseButton');

instructionsButton.addEventListener('click', () => {
    popup.style.display = 'block';
});

howtoButton.addEventListener('click', () => {
    popup.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

popup.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

