//c og r i programmet står for column og rows
//definerer variablene
var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerX;
var gameOver = false;

//laster inn funksjon
window.onload = function() {
    setGame();
}

//setter inn brettet 3x3
function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            //<div id"0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            //Hvis raden er 0 eller 1, adder vi en horisontal linje
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            //Hvis kollonnen er 0 eller 1, adder vi en vertikal linje
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            //Setter inn linjene/boksene 9 ganger og gjør det mulig å klikke boksene
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

//definerer funksjonen, når spillet er over blir boksene "unclickable"
function setTile() {
    if (gameOver) {
        return;
    }

    //kordinatene på brettet
    let coords = this.id.split("-");    //eksempel) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //allerede tatt plass (på brettet), gjør det sånn at man ikke kan trykke på plassen hvis den er allerede tatt
        return;
    }
    
    board[r][c] = currPlayer; //oppdaterer brettet
    this.innerText = currPlayer; //oppdaterer bretter i html

    //skifter spiller/endrer spiller
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }

    //sjekker vinner
    checkWinner();
}

//definerer vinner (er det samme på alle, bare horisontalt, diagonalt osv.)
function checkWinner() {
    //horisontalt, sjekker 3 rader
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //hvis vi finner "vinner" raden
            //setter vinner stilen på den raden
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //vertikalt, sjekker 3 kolonner
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //hvis vi finner "vinner" kolonnen
            //setter vinner stilen på den kolonnen
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonalt
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonalt (omvendt diagonalt)
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}


