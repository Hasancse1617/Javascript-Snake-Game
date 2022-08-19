let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//initialize velocity variable
let velocityX = 1;
let velocityY = 0;

//initialize snake position
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// initialize food position
let foodX;
let foodY;

let snakeBody = [];

function initial(){
    board = document.getElementById("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    context = board.getContext("2d");
    placeFoodRandom();
    setInterval(draw, 500);
    document.addEventListener("keyup", changeDirection);
}
function changeDirection(e){
    // console.log(e);
    if(e.code == "ArrowUp" && velocityY != 1){
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

function draw(){
    // console.log("draw")
    //draw full board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //draw random food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //Increase snake body
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFoodRandom();
    }
    
    //draw snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize; 
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //move snake body
    for(i = 0; i < snakeBody.length; i++){
        snakeBody[i][0]+=10;
        snakeBody[i][1]+=10;
        // console.log(x,y);
    }
}
initial();
function placeFoodRandom(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}