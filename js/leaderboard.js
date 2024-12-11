const leaderboard = document.getElementById("leaderboard");

// sorted by gameTime and difficulty
const snapshot = games.orderBy("time").orderBy("difficulty").get();

snapshot
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const game = document.createElement("tr");

            game.classList.add("game");
            game.innerHTML = `
                <td></td>
                <td>${data.username}</td>
                <td>${formatTime(data.time)}</td>
                <td>${data.difficulty}</td>
                <td>${data.createdAt.toDate()}</td>
            `;
            leaderboard.appendChild(game);
        });
    })
    .catch((error) => {
        console.error("Error fetching leaderboard data: ", error);
    });

// Format the time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
