document.getElementById("start-button").addEventListener("click", startGame);

function startGame() {
    resetTimer();
    startTimer();
    generateGrid();
}

let firstCard = null;
let secondCard = null;

function generateGrid() {
    const grid = document.getElementById("game");
    const difficulty = document.getElementById("difficulty").value;

    document.getElementById("options").style.display = "none";
    document.getElementById("game-content").style.visibility = "visible";

    let numOfTotalCards = 0;

    switch (difficulty) {
        case "easy":
            numOfTotalCards = 16;
            break;
        case "medium":
            numOfTotalCards = 36;
            grid.style.gridTemplateColumns = "repeat(6, 1fr)";
            break;
        case "hard":
            numOfTotalCards = 64;
            grid.style.gridTemplateColumns = "repeat(8, 1fr)";
            break;
    }

    const availableCards = [
        "c.svg",
        "cpp.svg",
        "cs.svg",
        "css.svg",
        "html.svg",
        "java.svg",
        "js.svg",
        "ts.svg",
        "python.svg",
        "php.svg",
        "rust.svg",
        "android-original.svg", 
        "babel-original.svg",
        "apache-plain-wordmark.svg",
        "chrome-original.svg",
        "moodle-original-wordmark.svg",
        "mocha-original.svg",
        "minitab-original.svg",
        "xd-original.svg",
        "nimble-original.svg",
        "nixos-original-wordmark.svg",
        "nodejs-original-wordmark.svg",
        "nuget-original-wordmark.svg",
        "oracle-original.svg",
        "consul-original.svg",
        "pyscript-original-wordmark.svg",
        "rstudio-original.svg",
        "envoy-plain-wordmark.svg",
        "webflow-original.svg",
        "xcode-original.svg",
        "facebook-plain.svg",
        "dot-net-plain-wordmark.svg"
    ];

    shuffle(availableCards);

    const cards = availableCards
        .slice(0, numOfTotalCards / 2)
        .concat(availableCards.slice(0, numOfTotalCards / 2));
    shuffle(cards);

    for (let i = 0; i < numOfTotalCards; i++) {
        const card = document.createElement("div");
        card.value = cards[i];
        card.innerHTML = `<img src="img/cards/${cards[i]}" />`;
        card.classList.add("card");
        card.addEventListener("click", function () {
            if (
                card.classList.contains("flipped") ||
                card.classList.contains("matched")
            ) {
                return;
            }

            if (firstCard === null) {
                firstCard = card;
                firstCard.classList.add("flipped");
            } else if (secondCard === null) {
                secondCard = card;
                secondCard.classList.add("flipped");
            }

            if (firstCard !== null && secondCard !== null) {
                if (firstCard.value === secondCard.value) {
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");

                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");

                    firstCard = null;
                    secondCard = null;

                    numOfTotalCards -= 2;
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");

                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }

            if (numOfTotalCards == 0) {
                stopTimer();
                document.getElementById("options").style.display = "none";
                document.getElementById("submit").style.display = "block";

                document
                
                    .getElementById("submit")
                    .addEventListener("click", function () {
                        var provider = new firebase.auth.GoogleAuthProvider();

                        firebase
                            .auth()
                            .signInWithPopup(provider)
                            .then((result) => {})
                            .catch((error) => {
                                // Handle Errors here.
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                // The email of the user's account used.
                                var email = error.email;
                                // The firebase.auth.AuthCredential type that was used.
                                var credential = error.credential;
                                // ...
                            });
                    });
            }
        });

        grid.appendChild(card);
    }
}

let timerInterval;
let seconds = 0;

function startTimer() {
    const time = document.getElementById("time");
    const difficulty = document.getElementById("difficulty").value;

    let timeLimit = 0; // Time limit in seconds
    switch (difficulty) {
        case "medium":
            timeLimit = 5 * 60; // 5 minutes
            break;
        case "hard":
            timeLimit = 7 * 60; // 7 minutes
            break;
        default:
            timeLimit = 0; // No countdown for easy
    }

    if (timeLimit > 0) {
        let remainingSeconds = timeLimit;

        timerInterval = setInterval(() => {
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;

            time.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

            remainingSeconds--;

            if (remainingSeconds < 0) {
                clearInterval(timerInterval); // Stop the timer
                alert("Time's up! Game over.");
                resetGame(); // Reset the game state
            }
        }, 1000);
    } else {
        // Default timer logic for "easy" mode (count up)
        seconds = 0;
        timerInterval = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            time.textContent = `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
        }, 1000);
    }
}

function resetGame() {
    const grid = document.getElementById("game");
    grid.innerHTML = ""; // Clear the game grid

    document.getElementById("options").style.display = "block";
    document.getElementById("game-content").style.visibility = "hidden";

    resetTimer();

    alert("Please try again!");
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById("time").textContent = "0:00";
}

function shuffle(array) {
    // Fisher-Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// how to play popup
const howtoButton = document.getElementById('howto')
const popup1 = document.getElementById('how-to-play-popup');
const closeButton = document.querySelector('.popupCloseButton');

const aboutUsButton = document.getElementById('aboutus');
const popup2 = document.getElementById('aboutus_popup');
const closeButton2 = document.querySelector('.close-about-us');
//-------------
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

document.getElementById("submitbutton").addEventListener("click", function () {
    window.location.href = "leaderboard.html";
});
