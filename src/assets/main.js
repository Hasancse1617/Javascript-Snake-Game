let blockSize = 25;
let rows = 17;
let cols = 25;
let board;
let context;

//initialize velocity variable
let velocityX = 0;
let velocityY = 0;

//initialize snake position
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// initialize food position
let foodX;
let foodY;

let snakeBody = [];
let timeInterval;


function initial(){
    board = document.getElementById("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    context = board.getContext("2d");
    placeFoodRandom();
    timeInterval = setInterval(drawGame, 300);
    document.addEventListener("keyup", changeDirection);
}
function changeDirection(e){
    // console.log(e);
    if(e.code == "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
}

function drawGame(){
    // console.log("draw")
    //draw full board
    context.fillStyle = "#9bba5a";
    context.fillRect(0, 0, board.width, board.height);

    //draw random food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //Increase snake body
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFoodRandom();
        // console.log(snakeBody);
    }
    //move snake body
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
    //draw snake
    context.fillStyle = "black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize; 
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //game over
    if(snakeX < 0 || snakeX > cols*blockSize-1 || snakeY < 0 || snakeY > rows*blockSize-1){
        // alert("Game over");
        clearInterval(timeInterval);
    }
}
initial();
function placeFoodRandom(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//counter area 3 2 1 Ready
let counter = document.getElementById("counter");
let h = 4;
let counterInterval = setInterval(counterStart, 1000);
function counterStart(){
    counter.innerHTML = --h;
    if(h < 1){
        counter.innerHTML = "Go!";
        clearInterval(counterInterval);
    }
}
