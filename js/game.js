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
                document.getElementById("options").style.display = "block";
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

    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        time.textContent = `${minutes}:${(seconds % 60)
            .toString()
            .padStart(2, "0")}`;
    }, 1000);
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
