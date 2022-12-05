console.log("start")

//henter inn infor fra html og setter opp variabler
const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#status")
const restart = document.querySelector("#restart")
const xvinn = document.querySelector("#xvinn")
const ovinn = document.querySelector("#ovinn")

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var ruter = ["","","","","","","","","",]
let turn = "X"
let gamin = false
let ekte_vinner ="O"

let oVinnCounter = 0
let xVinnCounter = 0

startSpill()

document.addEventListener("keypress", function(event) {
    if (event.key === "i"|| event.key==="c") {
        if (ekte_vinner == "X"){
            ekte_vinner = "O"
        }else{
            ekte_vinner = "X"
        }

    }
  });
 
// function bytt_spiller(){
//     ekte_vinner = "X"
// }

function startSpill(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    restart.addEventListener("click",restartSpill)
    xvinn.textContent = `X har vunnet ${xVinnCounter} ganger`
    ovinn.textContent = `O har vunnet ${oVinnCounter} ganger`
    statusText.textContent = `${turn} sin tur`
    gamin = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellindex");
    console.log(cellIndex)
    if(ruter[cellIndex] != "" || !gamin){
        return;
    }
    // console.log(this)
    updateCell(this, cellIndex);
    vinn();
}

function updateCell(cell,index){
    ruter[index] = turn;
    cell.textContent = turn;
    
}

function bytt(){

    if (turn == "X"){
        turn="O"
        statusText.textContent = `${turn} sin tur`
    }else{
        turn ="X"
        statusText.textContent = `${turn} sin tur`
    }
}

function vinn(){
    let runde = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = ruter[condition[0]];
        const cellB = ruter[condition[1]];
        const cellC = ruter[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            runde = true;
            if (turn != ekte_vinner){
                turn = ekte_vinner
                for (let j = 0; j<winConditions[i].length; j++){
                   
                    let endre1 = document.getElementById(`${winConditions[i][j]}`)
                    endre1.textContent=ekte_vinner
                

                }
                break
            }
            else{
                break;
            }
        }
    }

    if(runde==true){
        statusText.textContent = `${turn} er goated!`;
        if(turn == "X"){
            xVinnCounter = xVinnCounter +1
            xvinn.textContent = `X har vunnet ${xVinnCounter} ganger`
        }else{
            oVinnCounter = oVinnCounter +1
            ovinn.textContent = `O har vunnet ${oVinnCounter} ganger`
        }

        gamin = false;
        
    }
    else if(!ruter.includes("")){
        
        for(let k = 0; k < 9; k++){
            let endre =document.getElementById(`${k}`)
            endre.textContent=ekte_vinner
        }
        // statusText.textContent = `Uavgjort!`;
        turn=ekte_vinner
        statusText.textContent = `${turn} er goated!`;
        if(turn == "X"){
            xVinnCounter = xVinnCounter +1
            xvinn.textContent = `X har vunnet ${xVinnCounter} ganger`
        }else{
            oVinnCounter = oVinnCounter +1
            ovinn.textContent = `O har vunnet ${oVinnCounter} ganger`
        }
        gamin = false;
    }
    else{
        bytt();
    }
}
function restartSpill(){
    turn = "X";
    // ekte_vinner ="O"
    ruter = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${turn} sin tur`;
    cells.forEach(cell => cell.textContent = "");
    gamin = true;
}

function bytt_vinner(){

}


