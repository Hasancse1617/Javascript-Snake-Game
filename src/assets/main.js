
//Choose game level area
let game_level_area = document.getElementsByClassName("game_start_content");
let select_levels = document.getElementsByClassName("select_level");
let game_type;

//counter area 3 2 1 Ready
let counter = document.getElementById("counter");
let counterContent = 4;
let counterInterval;
let counterArea = document.getElementsByClassName("game_counter_content");

//score board
let score_board = document.getElementById("score_board");
let score_id = document.getElementById("score_id");
let score_board_game_type = document.getElementById("score_board_game_type");
let high_score_board = document.getElementById("high_score");
let score = 0;
let high_score = 0;

//Music area
let music_sound = true;
let tik_tik_audio = new Audio("/assets/audios/tik.mp3");
let snake_eat_audio = new Audio("/assets/audios/snake_hiss.mp3");
let game_over_audio = new Audio("/assets/audios/game_over.wav");
let game_music_area = document.getElementById("game_music_area");
let music_open = document.getElementById("music_open");
let music_close = document.getElementById("music_close");


//game over
let game_over = document.getElementById("game_over");

//board element
let blockSize = 25;
let rows = 17;
let cols = 25;
let board;
let context;

//initialize velocity variable
let velocityX = 1;
let velocityY = 0;
let speed = 100;

//initialize snake position
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// initialize food position
let foodX;
let foodY;

let snakeBody = [];
let bigSnakeCreate = true;
let timeInterval;
console.log(snakeX,snakeY);

//control game Sound function
game_music_area.addEventListener("click", control_music);
function control_music(){
    if(music_sound){
        music_sound = false;
        music_open.style.display = "none";
        music_close.style.display = "block";
    }else{
        music_sound = true;
        music_close.style.display = "none";
        music_open.style.display = "block";
    }
}

//Game select level area function
for (var i = 0; i < select_levels.length; i++) {
    select_levels[i].addEventListener('click', game_level, false, true);
}
function game_level(){
    console.log("Hasan")
    game_type = this.innerHTML;
    if(game_type == "Easy"){
        speed = 300;
    }
    else if(game_type == "Medium"){
        speed = 200;
    }
    else if(game_type == "Hard"){
        speed = 100;
    }
    
    // hide game level area
    game_level_area[0].style.display = "none";
    //show counter area
    counterArea[0].style.display = "block";
    counterStart();//enable first time
    counterInterval = setInterval(counterStart, 1000); //anable after 1sec
}

//Counter area function
function counterStart(){
    // console.log("counter")
    counter.innerHTML = --counterContent;

    if(music_sound && counterContent >= 0){ tik_tik_audio.play(); }//counter audio
    
    if(counterContent == 0){
        counter.innerHTML = "Go!";
    }
    else if(counterContent < 0){
        clearInterval(counterInterval);
        counterArea[0].style.display = "none";
        //Initialize game for start
        initial();
        //show score board
        score_board.style.display = "block";
        //show score board game type
        score_board_game_type.innerHTML = game_type;
        
        //show high score
        if(game_type == "Easy"){ high_score = localStorage.getItem("easy_high_score")||0; }
        else if(game_type == "Medium"){ high_score = localStorage.getItem("medium_high_score")||0; }
        else if(game_type == "Hard"){ high_score = localStorage.getItem("hard_high_score")||0; }
        
        high_score_board.innerHTML = high_score;

        update_score_board(score);
    }
}
//Update score board
function update_score_board(score_game){
    score_id.innerHTML = score_game;
    if(score_game > high_score){

        high_score_board.innerHTML = score_game;
        //save easy, medium, hard high score
        if(game_type == "Easy"){localStorage.setItem("easy_high_score", score_game)}
        else if(game_type == "Medium"){localStorage.setItem("medium_high_score", score_game)}
        else if(game_type == "Hard"){localStorage.setItem("hard_high_score", score_game)}
    }
}

function initial(){
    board = document.getElementById("board");
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    context = board.getContext("2d");
    placeFoodRandom();
    // console.log('speed',speed)
    timeInterval = setInterval(drawGame, speed);
    document.addEventListener("keydown", changeDirection);
}
function changeDirection(e){
    // console.log('speed',speed)
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
    roundRect(context, foodX, foodY, blockSize, blockSize, 8);
    //create big snake
    if(bigSnakeCreate){
        snakeBody.push([snakeX-25, snakeY]);
        snakeBody.push([snakeX-50, snakeY]);
        bigSnakeCreate = false;
    }
    //Increase snake body
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        if(music_sound){snake_eat_audio.play()}//eat audio effect
        //increase score
        if(game_type == "Easy"){
            score += 5;
        }
        else if(game_type == "Medium"){
            score += 10;
        }
        else if(game_type == "Hard"){
            score += 15;
        }
        update_score_board(score);//Update score board
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
    // snakeBody.push([snakeX + 25,snakeY]);
    // snakeBody.push([snakeX + 50,snakeY]);
    //draw snake
    context.fillStyle = "black";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    roundRect(context, snakeX, snakeY, blockSize, blockSize, 8); 
    for(let i = 0; i < snakeBody.length; i++){
        roundRect(context, snakeBody[i][0], snakeBody[i][1], blockSize, blockSize, 8); 
    }
    //game over
    if(snakeX < 0 || snakeX > cols*blockSize-1 || snakeY < 0 || snakeY > rows*blockSize-1){
        // alert("Game over");
        clearInterval(timeInterval);
        gameOver();
    }
    for(let i=0; i<snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            clearInterval(timeInterval);
            gameOver();
        }
    }
}

function placeFoodRandom(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function gameOver(){
    //game over audio
    if(music_sound){
        game_over_audio.play();
    }
    //check high score or not
    if(score > high_score){
        document.getElementById("game_over_con").innerHTML = "High <br> Score";
    }
    game_over.style.display = "block";
    game_over.addEventListener("click", function(){
        game_over.style.display = "none";
        game_level_area[0].style.display = "block";

        //initialize after game over to restart
        counterContent = 4;
        snakeX = blockSize * 5;
        snakeY = blockSize * 5;
        snakeBody = [];
        velocityX = 1;
        velocityY = 0;
        score = 0;
    });
}

///Round shape rectangle
function roundRect(
    ctx,
    x,
    y,
    width,
    height,
    radius = 5,
  ) {
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    ctx.fill();
  }