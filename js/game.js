function generateGrid() {
    const grid = document.getElementById("game");
    const difficulty = document.getElementById("difficulty").value;

    document.getElementById("options").style.display = "none";
    document.getElementById("game-content").style.visibility = "visible";

    const timer = startTimer();
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
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");

                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
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
        const minutes = Math.floor(seconds / 60);
        time.textContent = `${minutes}:${(seconds % 60)
            .toString()
            .padStart(2, "0")}`;
        seconds++;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById("timer").textContent = "0:00";
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

let firstCard = null;
let secondCard = null;

document.getElementById("start-button").addEventListener("click", generateGrid);
