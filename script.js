/* =========================================================
   SLIDE SYSTEM
========================================================= */

const slides = document.querySelectorAll(".slide");
const currentSlideElement = document.getElementById("currentSlide");
const progressBar = document.getElementById("progressBar");

let currentSlide = 0;

function showSlide(index) {

    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    currentSlide = index;

    currentSlideElement.textContent =
        String(currentSlide + 1).padStart(2, "0");

    const progress =
        ((currentSlide + 1) / slides.length) * 100;

    progressBar.style.width = progress + "%";

    // Stop challenge when leaving slide 7
    if (currentSlide !== 6) {
        resetChallenge();
    }
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}


/* =========================================================
   KEYBOARD
   SPACE DOES NOT CHANGE SLIDE
========================================================= */

document.addEventListener("keydown", function(e) {

    if (e.key === "ArrowRight") {
        nextSlide();
    }

    if (e.key === "ArrowLeft") {
        previousSlide();
    }

});


/* =========================================================
   TOUCH / SWIPE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", function(e) {

    touchEndX = e.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
        nextSlide();
    } else {
        previousSlide();
    }

});


/* =========================================================
   MINI AI CHAT
========================================================= */

function sendMessage() {

    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    const text = input.value.trim();

    if (!text) return;

    const userMessage = document.createElement("div");

    userMessage.className = "message user";
    userMessage.textContent = text;

    messages.appendChild(userMessage);

    input.value = "";

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        const lower = text.toLowerCase();

        let response =
            "I can help you improve grammar, vocabulary, structure or clarity.";

        if (
            lower.includes("grammar") ||
            lower.includes("mistake") ||
            lower.includes("correct")
        ) {

            response =
                "Sure! I can identify grammar mistakes and explain why the corrections are necessary.";

        } else if (
            lower.includes("vocabulary") ||
            lower.includes("word")
        ) {

            response =
                "I can suggest stronger, more precise and natural vocabulary while keeping your original meaning.";

        } else if (
            lower.includes("essay") ||
            lower.includes("writing")
        ) {

            response =
                "I can help you organize your ideas, improve your sentences and make your writing clearer.";

        }

        aiMessage.textContent = response;

        messages.appendChild(aiMessage);

        messages.scrollTop = messages.scrollHeight;

    }, 600);
}


function quickChat(text) {

    const input = document.getElementById("chatInput");

    input.value = text;

    sendMessage();
}


document
    .getElementById("chatInput")
    .addEventListener("keydown", function(e) {

        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }

    });


/* =========================================================
   LEVEL ADAPTATION
========================================================= */

const levelData = {

    B1: {
        tag: "B1 LEVEL",
        text:
            "I like learning English because it helps me communicate with people from other countries."
    },

    B2: {
        tag: "B2 LEVEL",
        text:
            "I enjoy learning English because it allows me to communicate with people from different countries and learn about other cultures."
    },

    C1: {
        tag: "C1 LEVEL",
        text:
            "I find learning English particularly rewarding, as it enables me to communicate across cultures and broaden my understanding of the world."
    }

};


function changeLevel(level, button) {

    const levelTag = document.getElementById("levelTag");
    const levelText = document.getElementById("levelText");

    document
        .querySelectorAll(".level-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    levelText.style.opacity = "0";
    levelText.style.transform = "translateY(10px)";

    setTimeout(() => {

        levelTag.textContent = levelData[level].tag;
        levelText.textContent = levelData[level].text;

        levelText.style.opacity = "1";
        levelText.style.transform = "translateY(0)";

    }, 220);
}


/* =========================================================
   AI CHALLENGE
========================================================= */

let challengeTimer = null;

function startChallenge() {

    const countdown = document.getElementById("countdown");
    const status = document.getElementById("challengeStatus");
    const answer = document.getElementById("challengeAnswer");
    const button = document.getElementById("challengeButton");

    clearInterval(challengeTimer);

    answer.classList.remove("show");

    button.disabled = true;
    button.textContent = "THINK...";

    let seconds = 5;

    countdown.textContent = seconds;
    status.textContent = "AI SCANNING...";

    challengeTimer = setInterval(() => {

        seconds--;

        if (seconds > 0) {

            countdown.textContent = seconds;

        } else {

            clearInterval(challengeTimer);

            countdown.textContent = "✓";

            status.textContent = "ANSWER REVEALED";

            answer.classList.add("show");

            button.disabled = false;
            button.textContent = "TRY AGAIN";

        }

    }, 1000);
}


function resetChallenge() {

    clearInterval(challengeTimer);

    const countdown = document.getElementById("countdown");
    const status = document.getElementById("challengeStatus");
    const answer = document.getElementById("challengeAnswer");
    const button = document.getElementById("challengeButton");

    if (!countdown) return;

    countdown.textContent = "";

    status.textContent = "READY?";

    answer.classList.remove("show");

    button.disabled = false;

    button.textContent = "START CHALLENGE";
}


/* =========================================================
   START
========================================================= */

showSlide(0);