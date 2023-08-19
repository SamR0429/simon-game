//declaring variables
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

//const for event listeners
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topLeft");
const topRight = document.querySelector("#topRight");
const bottomLeft = document.querySelector("#bottomLeft");
const bottomRight = document.querySelector("#bottomRight");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

//ALL FUNCTIONS FOR GAME

//initializing game start up, game has 20 rounds, and the patterns are random with the math.random
function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

//function is working when its the games turn to make a pattern so user cant click colors as they are being shown, NO CHEATING
function gameTurn() {
    on = false;

    if (flash === turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] === 1) one();
            if (order[flash] === 2) two();
            if (order[flash] === 3) three();
            if (order[flash] === 4) four();
            flash++;
        }, 200);
    }
}

// the following 4 functions control the noise each section makes, and controls the color when showing the pattern
function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}

//setting color default for when not showing a pattern to user
function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

//setting color for when pattern is flashing
function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

//function is checking ig what user clicked back is what the game showed them, seeing is arrays are matching, if they dont game ends
function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length === 10 && good) {
        winGame();
    }

    if (good === false) {
        flashColor();
        turnCounter.innerHTML = "NOPE";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    if (turn === playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }

}

//function that kicks in when you have completed all levels of the game
function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}


// ALL EVENT-LISTENERS FOR GAME
(() => { // main method
    onButton.checked = false;
    // this is for the on button, setting display for when turned on
    onButton.addEventListener('click', (e) => {
        if (onButton.checked === true) {
            on = true;
            turnCounter.innerHTML = "-";
        } else {
            on = false;
            turnCounter.innerHTML = "";
            clearColor();
            clearInterval(intervalId);
        }
    });
    //next 4 are for each color section, listening for the click, changing color , and feeding into check to see if clicks match

    topLeft.addEventListener('click', (e) => {
        if (on) {
            playerOrder.push(1);
            check();
            one();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 100);
            }
        }
    });
    topRight.addEventListener('click', (e) => {
        if (on) {
            playerOrder.push(2);
            check();
            two();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 100);
            }
        }
    });
    bottomLeft.addEventListener('click', (e) => {
        if (on) {
            playerOrder.push(3);
            check();
            three();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 100);
            }
        }
    });
    bottomRight.addEventListener('click', (e) => {
        if (on) {
            playerOrder.push(4);
            check();
            four();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 100);
            }
        }
    });
    strictButton.addEventListener('click', (e) => {
        strict = strictButton.checked === true;
    });
    //this is for the start button , starting the game
    startButton.addEventListener('click', (e) => {
        if (on || win) {
            play();
        }
    });

})();

