const mainMenu = document.querySelector(".main-menu");
const clickablArea =document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reaksjonstidstekst = document.querySelector(".end-screen .reaksjonstidtekst");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingforGreen;
let scores;

const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingforGreen = false;
    scores = [];
};

init();

const setGreenColor = () => {
    clickablArea.style.backgroundColor = "#32cd32";
    message.innerHTML = "Klikk Nå!";
    message.style.color = "#111";
    greenDisplayed = true;
    timeNow = Date.now();
};

const startGame = () => {
    clickablArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Vent til skjermen blir grønn";
    message.style.color = "#fff";

    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(setGreenColor, randomNumber);

    waitingForStart = false;
    waitingforGreen = true;

    console.log("Random Number: ", randomNumber);
};

mainMenu.addEventListener("click", () =>{
    mainMenu.classList.remove("active");
    startGame();
});

const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    let total = 0;

    scores.forEach((s) => {
        total += s;
    })

    let averageScore = Math.round(total / scores.length);
    console.log("Total: ", total);
    console.log("Average Score: ", averageScore);

    reaksjonstidstekst.innerHTML = `${averageScore} ms`;
};

const displayReactionTime = (rt) => {
    clickablArea.style.backgroundColor = "#faf0ca";
    message.innerHTML =  `<div class='reaksjonstidstekst'>${rt} ms</div>Klikk for å fortsette`;

    greenDisplayed = false;
    waitingForStart = true;
    scores.push(rt);
    console.log("scores: ", scores);

    if (scores.length >= 3) {
        endGame();
    }
};

const displayTooSoon = () => {
    clickablArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "For tidlig. Prøv igjen";
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
}

clickablArea.addEventListener("click", () => {
    if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        console.log("Reaction Time:", reactionTime);
        displayReactionTime(reactionTime);
        return;
    }

    if (waitingForStart) {
        startGame();
        return;
    }

    if (waitingforGreen) {
        displayTooSoon();
    }
});

playAgainBtn.addEventListener("click", () => {
    endScreen.classList.remove("active");
    init();
    startGame();
});