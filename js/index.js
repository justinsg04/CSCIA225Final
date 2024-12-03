document.getElementById("play-button").addEventListener("click", function () {
    window.location.href = "game.html";
});

// how to play popup
const instructionsButton = document.getElementById('instructions-button');
const popup = document.getElementById('how-to-play-popup');
const closeButton = document.querySelector('.popupCloseButton');

instructionsButton.addEventListener('click', () => {
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

