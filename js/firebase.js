const firebaseConfig = {
    apiKey: "AIzaSyCXl7vDK2Gxm-wmUF95W6x327zn7QiC3pA",
    authDomain: "nj-matching-game.firebaseapp.com",
    projectId: "nj-matching-game",
    storageBucket: "nj-matching-game.firebasestorage.app",
    messagingSenderId: "728134671364",
    appId: "1:728134671364:web:795a8b4f1e36a989baa951",
    measurementId: "G-RNQFHBF3QZ",
};

firebase.initializeApp(firebaseConfig);

console.log("Firebase initialized");

// Get Firestore instance
const db = firebase.firestore();

// Add data to the "games" collection
globalThis.games = db.collection("games");
