//begynner med å definere noen konstanter, for å hente html elementer
//lage variabler for å sjekke spillets tilstand
const clickArea = document.querySelector(".click-area");
//nytt navn til konstant //query selector, henter først element som macther css-selector //elementet den skal hente (klassen, click-area)
const displayText = document.querySelector(".display-text"); //teksten som sier om spilleren kan spille igjen og som forteller scoren
const scoreElements = document.querySelectorAll(".score"); //querySelectorAll fordi det er flere score elementer

const scoreHistory = []; //en tom array, array kan holde flere verdier undre samme navn, i dette tilfellet; brukerens score history

//tar minst 2 sekunder og maks syv sekunder før skjermen endrer farge etter start-trykk (2000 og 7000 millisekunder )
const MINIMUM_MS_TILL_CHANGE = 2000; //forhindrer umiddelbar endring
const MAXIMUM_MS_TILL_CHANGE = 7000;

let msSinceEpochOnTimeout = 0;  //forteller oss antall sekunder bruker på å trykke på knappen
let waitingForClick = false; //false=default, når variabelen er true, venter vi på at bruker skal reagere (når skjermen har gått fra rød til grønn)


function play() { //mens spillet går
    const msTillChange = Math.floor(Math.random() * (MAXIMUM_MS_TILL_CHANGE - MINIMUM_MS_TILL_CHANGE)) + MINIMUM_MS_TILL_CHANGE; 
    //finner tiden når skjermen skal bytte til grønn

    clickArea.style.backgroundColor = null;
    //bakgrunnsfargen går tilbake til rød som står originalt i css

    displayText.textContent = "";
    //teksten forsvinner mens spillet kjører

    //tillatter oss å kjøre en kode etter et visst antall millisekunder
    setTimeout(() => {
        msSinceEpochOnTimeout = Date.now(); //endrer variabel verdi til antall millisekunder siden 1.jan 1970 

        clickArea.style.backgroundColor = "#009578"; //skjermen blir grønn
        waitingForClick = true;
    }, msTillChange);
}

function addScore(score) { //legger til tiden i listen til høyre
    scoreHistory.unshift(score); //legger nyeste tid øverst  stedet for nedert(push)

    for (let i = 0; i < scoreHistory.length; i++) { //ny verdi for hver runde
        const score = scoreHistory[i]; // legger til i listen

        scoreElements[i].textContent = ` ${score} ms `;    
        //teksen/scoren som vises i listen 
    }
}

//reagere når bruker trykker på hovedboks 
clickArea.addEventListener("click", afterStart);

function afterStart() {
    if (waitingForClick) { //hvis vi venter på at brukeren skal trykke... 
        const score = Date.now() - msSinceEpochOnTimeout;
        //Finner differensen mellom tiden da og tiden nå, for å måle brukerens reaksjonstid. 
        
        waitingForClick = false; //vi venter ikke på at brukeren skal trykke, de har allerede trykket
        displayText.textContent = `Din tid var ${score} ms! Trykk for å spille igjen.`;
        addScore(score);
        if (scoreHistory.length >= 5) {
            clickArea.removeEventListener("click", afterStart)
            //når man har trykket fem ganger, stopper/fjerner event og funksjon: ("click", afterStart)
            const average = scoreHistory.reduce ((a, b) => a + b, 0) / scoreHistory.length; 
            //innlagt funksjon "reduse()" regner gjennomsnittet av elementene i listen scoreHistory
            displayText.textContent = `Gjennomsnittstiden din er på ${average} ms. Woop Woop!`;

        }
    } else {    //hvis bruker har trykket
        play();  //kjør spill
    }
}

function replace() {
    location.replace("../E2/index.html")
  }

  function bekreft() {
    return "";
  }
