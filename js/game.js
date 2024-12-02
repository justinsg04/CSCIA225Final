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

document.getElementById("start-button").addEventListener("click", generateGrid);
