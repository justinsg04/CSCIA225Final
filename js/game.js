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
        "dot-net-plain-wordmark.svg",
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
                //before
                // document

                //     .getElementById("submit")
                //     .addEventListener("click", function () {
                //         var provider = new firebase.auth.GoogleAuthProvider();

                //         firebase
                //             .auth()
                //             .signInWithPopup(provider)
                //             .then((result) => {})
                //             .catch((error) => {
                //                 // Handle Errors here.
                //                 var errorCode = error.code;
                //                 var errorMessage = error.message;
                //                 // The email of the user's account used.
                //                 var email = error.email;
                //                 // The firebase.auth.AuthCredential type that was used.
                //                 var credential = error.credential;
                //                 // ...
                //             });
                //     });
                //before
                document.getElementById("submit").addEventListener("click", function () {
                    var provider = new firebase.auth.GoogleAuthProvider();
                
                    firebase
                        .auth()
                        .signInWithPopup(provider)
                        .then((result) => {
                            const user = result.user; // Firebase user object
                            const username = user.displayName; // User's Google account name
                            const email = user.email; // User's email
                            const difficulty = document.getElementById("difficulty").value; // Selected difficulty
                            const gameTime = document.getElementById("time").textContent; // Current game time
                
                            // Send data to Firebase Firestore
                            saveGameData(username, email, difficulty, gameTime);
                        })
                        .catch((error) => {
                            // Handle Errors here
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            var email = error.email;
                            var credential = error.credential;
                            console.log("Error: ", errorMessage);
                        });

                        function saveGameData(username, email, difficulty, gameTime) {
                            // Get Firestore instance
                            const db = firebase.firestore();
                        
                            // Add data to the "games" collection
                            db.collection("games")
                                .add({
                                    username: username,
                                    //email: email,
                                    difficulty: difficulty,
                                    gameTime: gameTime,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp() // Automatically adds timestamp
                                })
                                .then(() => {
                                    console.log("Game data saved successfully!");
                                    alert("Game data saved!");
                                })
                                .catch((error) => {
                                    console.error("Error adding document: ", error);
                                    alert("Error saving game data.");
                                });
                        }

                        //new
                        // Function to fetch and display leaderboard data
                    function loadLeaderboard() {
                        const gamesRef = firebase.firestore().collection('games');
                        gamesRef.orderBy('gameTime') // Orders by gameTime (you can adjust sorting)
                            .get()
                            .then(snapshot => {
                                const leaderboardTable = document.getElementById("leaderboard").getElementsByTagName('tbody')[0];
                                leaderboardTable.innerHTML = ''; // Clear any existing rows in the table

                                let rank = 1; // Initialize rank counter

                                snapshot.forEach(doc => {
                                    const gameData = doc.data();
                                    const row = document.createElement("tr");

                                    // Create Rank cell
                                    const rankCell = document.createElement("td");
                                    rankCell.textContent = rank; // Show rank
                                    row.appendChild(rankCell);

                                    // Create Name cell
                                    const usernameCell = document.createElement("td");
                                    usernameCell.textContent = gameData.username || "Unknown"; // Default to "Unknown" if no username
                                    row.appendChild(usernameCell);

                                    // Create Time cell
                                    const timeCell = document.createElement("td");
                                    timeCell.textContent = formatTime(gameData.gameTime); // Format the time
                                    row.appendChild(timeCell);

                                    // Create Difficulty cell
                                    const difficultyCell = document.createElement("td");
                                    difficultyCell.textContent = gameData.difficulty || "N/A"; // Default to "N/A" if no difficulty
                                    row.appendChild(difficultyCell);

                                    // Append the row to the table body
                                    leaderboardTable.appendChild(row);

                                    rank++; // Increment rank for the next entry
                                });
                            })
                            .catch(error => {
                                console.error("Error fetching leaderboard data: ", error);
                            });
                    }

                    // Format the time as MM:SS
                    function formatTime(seconds) {
                        const minutes = Math.floor(seconds / 60);
                        const remainingSeconds = seconds % 60;
                        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
                    }

                    // Call this function when the page loads to display the leaderboard
                    document.addEventListener('DOMContentLoaded', () => {
                        loadLeaderboard(); // Automatically load leaderboard data when page is ready
                    });

                        //new

                        //window.location.href = 'leaderboard.html';  // Redirect to the leaderboard page after submitting

                        
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
            seconds++;
            const minutes = Math.floor(seconds / 60);
            time.textContent = `${minutes}:${(seconds % 60)
                .toString()
                .padStart(2, "0")}`;
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
