var karakter = document.getElementById("karakter"); 
var block = document.getElementById("block");
var resultat = document.getElementById("resultat");
var score = document.getElementById("score");
var spill = document.getElementById("spill");
var count = 0;  //tellingen
var dead = document.getElementById("dead");


// Her definerer jeg hoppefunksjonen
function hopp(){
    karakter.style.top = "250px";
    setTimeout(function(){
        karakter.style.top = "365px"
    },400) 
    count++;
}
//her gjør jeg det slik at når man trykker på en knapp "hopper funksjonen"
window.addEventListener("keydown",hopp)


//her lager jeg funksjonen som avgjør hva som skjer om man kommer nær blokken
//med setIntervall vil funksjonen bli kjørt hvert 10 ms
setInterval(function gameover(){
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left")); //denne linjen her omgjør en string til en integer
    var karakterTop = parseInt(window.getComputedStyle(karakter).getPropertyValue("top"));
    if ((blockLeft<20) && (karakterTop>300)){ //setter vilkårene for hva som vil skje når man dør under if statementen. 
        resultat.style.display = "block";
        spill.style.display = "show";
        score.innerHTML = `Score : ${count}`;
        block.style.animationPlayState = 'paused'; //stopper blokken når man dør
        karakter.style.display= "none"; //personen forsvinner når man dør
        dead.style.display = "show"; 

        

     
}
},10)
    
