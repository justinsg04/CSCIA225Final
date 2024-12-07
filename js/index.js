document.getElementById("play-button").addEventListener("click", function () {
    window.location.href = "game.html";
});

document.getElementById("leaderboard-btn").addEventListener("click", function () {
    window.location.href = "leaderboard.html";
});

// how to play popup
const instructionsButton = document.getElementById('instructions-button');
const howtoButton = document.getElementById('howto')
const popup1 = document.getElementById('how-to-play-popup');
const closeButton = document.querySelector('.popupCloseButton');

const aboutUsButton = document.getElementById('aboutus');
const popup2 = document.getElementById('aboutus_popup');
const closeButton2 = document.querySelector('.close-about-us');
//--------------
instructionsButton.addEventListener('click', () => {
    popup1.style.display = 'block';
});

howtoButton.addEventListener('click', () => {
    popup1.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    popup1.style.display = 'none';
});

popup1.addEventListener('click', (event) => {
    if (event.target === popup1) {
        popup1.style.display = 'none';
    }
});

//------------
aboutUsButton.addEventListener('click', () => {
    popup2.style.display = 'block';
});

closeButton2.addEventListener('click', () => {
    popup2.style.display = 'none';
});

popup2.addEventListener('click', (event) => {
    if (event.target === popup2) {
        popup2.style.display = 'none';
    }
});


