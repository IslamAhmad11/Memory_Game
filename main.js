let startGame = document.querySelector(".start-game");
let selectLvl = document.querySelector(".start-game select");
let errorMsg = document.querySelector(".start-game span");
let input = document.querySelector(".start-game input");
let startBtn = document.querySelector(".start-game button");
let restartBtn = document.querySelector(".info-container button");
let nameContainer = document.querySelector(".name");
let userName = document.querySelector(".name span");
let triesContainer = document.querySelector(".tries");
let triesCounter = document.querySelector(".tries span");
let timer = document.querySelector(".time span");
let blocksContainer = document.querySelector(".blocks-container");
let gameBlocks = Array.from(blocksContainer.children);
let front = document.querySelector(".game-block .front");
let gameOver = document.querySelector(".game-over");
let congrats = document.querySelector(".congrats");
let winnerName = document.querySelector(".congrats span");

// username shold be letters only, at least 2 letters
let chars = /^[a-zA-z]+$/;
let tries = 0;
let score = 0;
let duration = 1500;

let levels = {
    "easy" : 120,
    "normal" : 90,
    "hard" : 60,
}

// select level
selectLvl.onchange = () => {
    timer.innerHTML = levels[selectLvl.value]
}

// Get the username and start the game
startBtn.onclick = () => {
    shuffleCards();
    beginGame ();
}

// start game
function beginGame () {
    if(input.value.match(chars) && input.value.length >= 2 && selectLvl.value !== "Select level"){
        document.getElementById("opening").play();
        startGame.remove();
        nameContainer.style.display = "block";
        triesContainer.style.display = "block";
        userName.innerHTML = input.value;
        triesCounter.innerHTML = tries;
        gameOverFun();
    }else{
        errorMsg.innerHTML = "It must contain only letters at least 2 letters and you've to select a level";
        timer.innerHTML = "";
    }
}

// shuffle cards
function shuffleCards () {
    // create empty array to push random numbers in it
    let randomArr = [];

    // push random numbers in empty array
    for(let i = 0; i < gameBlocks.length; i++){
    let randomNum = Math.trunc(Math.random() * gameBlocks.length);
    randomArr.push(randomNum);
}
    gameBlocks.forEach((block, index) => {
        // set block order style randomly
        block.style.order = randomArr[index];
    })
}

// flip card
function flipCard() {
    // if flipped class exists remove it if not add it
    this.classList.toggle('flipped');

    setTimeout(() => {
        this.classList.remove('flipped');
    }, duration);

    // filter flipped cards only
    let allFlipped = gameBlocks.filter((flippedBlock) => flippedBlock.classList.contains("flipped"));

    // if flipped cards are 2, run stopClicking function to flip two cards only
    if(allFlipped.length === 2){
        stopClicking ();
        matchingCards(allFlipped[0], allFlipped[1]);
    }
}

// flip card
gameBlocks.forEach( block => block.addEventListener ("click", flipCard));

// add no-clicking class
function stopClicking () {
    blocksContainer.classList.add("no-clicking");
}

// match similar cards
function matchingCards (card1, card2) {
    if(card1.dataset.tech === card2.dataset.tech){
        // play success sound effect
        document.getElementById("success").play();
        score++;
        // remove flipped class to avoid conflect with other functions using same class
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        // matched class has the same features of flipped class
        card1.classList.add("matched");
        card2.classList.add("matched");
        blocksContainer.classList.remove("no-clicking");
    }else{
        setTimeout(() => {
            triesCounter.innerHTML++;
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            blocksContainer.classList.remove("no-clicking");
        }, duration);
    }
}

// in case you failed and game over
function gameOverFun () {
    let countDown = setInterval(() => {
        timer.innerHTML--;
        if(timer.innerHTML == 0){
            clearInterval(countDown);
            document.getElementById("game-over").play();
            gameOver.style.bottom = "40%";
            blocksContainer.style.opacity = 0.2;
            stopClicking ();
        }
        // in case you flipped all cards correctly
        if(score == gameBlocks.length / 2){
            clearInterval(countDown);
            document.getElementById("congrats").play();
            congrats.style.bottom = "40%";
            document.body.style.backgroundColor = "rgba(95, 79, 54, 0.847)";
            blocksContainer.style.opacity = 0.2;
            winnerName.innerHTML = input.value;
            stopClicking ();
        }
    }, 1000);
}

// reset the game
restartBtn.onclick = () => {
    location.reload();
}