document.getElementById("start-button").addEventListener("click", startGame);

function startGame() {
    resetTimer();
    startTimer();
    generateGrid();
}

let firstCard = null;
let secondCard = null;
let matchedPairs = 0;

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
    "dot-net-plain-wordmark.svg",
    "git.svg",
    "github.svg",
    "haskell.svg",
    "linux.svg",
    "opengl.svg",
    "google.svg",
];

const difficultySettings = {
    easy: { numOfTotalCards: 16, columns: 4 },
    medium: { numOfTotalCards: 36, columns: 6 },
    hard: { numOfTotalCards: 64, columns: 8 },
};

function generateGrid() {
    const grid = document.getElementById("game");
    const difficulty = document.getElementById("difficulty").value;

    document.getElementById("options").style.display = "none";
    document.getElementById("game-content").style.visibility = "visible";

    const { numOfTotalCards, columns } = difficultySettings[difficulty];
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    const shuffledCards = shuffleArray(availableCards);
    const cards = shuffleArray(
        shuffledCards
            .slice(0, numOfTotalCards / 2)
            .concat(shuffledCards.slice(0, numOfTotalCards / 2))
    );

    grid.style.display = "grid";
    grid.innerHTML = "";
    matchedPairs = 0;

    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.card = card;
        cardElement.innerHTML = `<img src="img/cards/${card}" alt="${card}">`;
        cardElement.addEventListener("click", handleCardClick);
        grid.appendChild(cardElement);
    });
}

function handleCardClick() {
    if (secondCard != null) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;
    if (
        matchedPairs ===
        difficultySettings[document.getElementById("difficulty").value]
            .numOfTotalCards /
            2
    ) {
        stopTimer();

        document.getElementById("options").style.display = "none";
        document.getElementById("submit").style.display = "block";

        document
            .getElementById("submit")
            .addEventListener("click", function () {
                const provider = new firebase.auth.GoogleAuthProvider();

                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        const username = result.user.displayName; // User's Google account name
                        const difficulty =
                            document.getElementById("difficulty").value; // Selected difficulty

                        // Send data to Firebase Firestore
                        games
                            .add({
                                username: username,
                                difficulty: difficulty,
                                time: elapsedSeconds,
                                timestamp:
                                    firebase.firestore.FieldValue.serverTimestamp(), // Automatically adds timestamp
                            })
                            .then(() => {
                                console.log("Game data saved successfully!");
                                alert("Sucessfully submitted game data!");
                                window.location.href = "leaderboard.html"; // Redirect to the leaderboard page after submitting
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                                alert("Error saving game data.");
                            });
                    })
                    .catch((error) => {
                        var errorMessage = error.message;
                        console.log("Error: ", errorMessage);
                    });
            });
    }

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
}

let timerInterval;
let elapsedSeconds = 0;

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
        elapsedSeconds = 0;

        timerInterval = setInterval(() => {
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;

            elapsedSeconds++;

            time.textContent = `${minutes}:${seconds
                .toString()
                .padStart(2, "0")}`;

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
            elapsedSeconds++;
            const minutes = Math.floor(elapsedSeconds / 60);
            time.textContent = `${minutes}:${(elapsedSeconds % 60)
                .toString()
                .padStart(2, "0")}`;
        }, 1000);
    }
}

// Reset the game to its initial state
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
    document.getElementById("time").textContent = "0:00";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
