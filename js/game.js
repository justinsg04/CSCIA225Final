function generateGrid() {
    const grid = document.getElementById("game");
    const difficulty = document.getElementById("difficulty").value;

    document.getElementById("options").style.display = "none";

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

    switch (difficulty) {
        case "easy":
            const cards = availableCards
                .slice(0, 8)
                .concat(availableCards.slice(0, 8));
            shuffle(cards);

            for (let i = 0; i < 16; i++) {
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
            break;
        case "medium":
            break;
        case "hard":
            break;
    }
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
