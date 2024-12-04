import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCXl7vDK2Gxm-wmUF95W6x327zn7QiC3pA",
    authDomain: "nj-matching-game.firebaseapp.com",
    projectId: "nj-matching-game",
    storageBucket: "nj-matching-game.firebasestorage.app",
    messagingSenderId: "728134671364",
    appId: "1:728134671364:web:795a8b4f1e36a989baa951",
    measurementId: "G-RNQFHBF3QZ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase initialized");
