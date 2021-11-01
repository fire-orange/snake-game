document.addEventListener('keyup', changeDirection);
var gameScreen = document.getElementById('gameScreen');
var ctx = gameScreen.getContext('2d');

function SnakeComponent(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
}

function Apple(x, y){
    this.x = x;
    this.y = y;
}

var board = [[]];
var head = new SnakeComponent(9, 9, -1);
var snake = [head];
var apple = new Apple(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));

function resetGame() {
    head = new SnakeComponent(9, 9, -1);
    snake = [head];
    apple = new Apple(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));
}

function changeDirection(event) {
    switch(event.code) {
        case 'KeyW':
            if (snake.length > 1) {
                if (snake[1].direction !== 1) {
                    snake[0].direction = 0;
                }
            }else{
                snake[0].direction = 0;
            }
            break;

        case 'KeyA':
            if (snake.length > 1) {
                if (snake[1].direction !== 3) {
                    snake[0].direction = 2;
                }
            }else{
                snake[0].direction = 2;
            }
            break;

        case 'KeyS':
            if (snake.length > 1) {
                if (snake[1].direction !== 0) {
                    snake[0].direction = 1;
                }
            }else{
                snake[0].direction = 1;
            }
            break;

        case 'KeyD':
            if (snake.length > 1) {
                if (snake[1].direction !== 2) {
                    snake[0].direction = 3;
                }
            }else{
                snake[0].direction = 3;
            }
            break;
    }
}

function updateSnake() {
    var forwardDirection = snake[0].direction;
    var previousDirection;
    for (let i = 0; i < snake.length; i++) {
        const element = snake[i];
        switch (element.direction) {
            case 0:
                element.y -= 1;
                break;
        
            case 1:
                element.y += 1;
                break;

            case 2:
                element.x -= 1;
                break;

            case 3:
                element.x += 1;
                break;
        }
        previousDirection = element.direction;
        element.direction = forwardDirection;
        forwardDirection = previousDirection;
    }
}

function updateBoard() {
    for (var i = 0; i < 20; i++) {
        board[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
    for (let i = 0; i < snake.length; i++) {
        board[snake[i].x][snake[i].y] = 1;
    }
    board[apple.x][apple.y] = -1;
}

function drawBoard() {
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 20;
    ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);
    ctx.strokeRect(0, 0, gameScreen.width, gameScreen.height);
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            if (board[i][j] === 1) {
                ctx.fillStyle = "white";
                ctx.fillRect(10 + i*30, 10 + j*30, 30, 30);
            }
            if (board[i][j] === -1) {
                ctx.fillStyle = "green";
                ctx.fillRect(10 + i*30, 10 + j*30, 30, 30);
            }
        }
    }
}

function checkCollision() {
    for (var i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            alert("Game Over!");
            resetGame();
        }
    }
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        apple = new Apple(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));
        var element = snake[snake.length - 1];
        
        switch (element.direction) {
            case 0:
                var snakeComponent = new SnakeComponent(element.x, element.y+1, element.direction);
                snake.push(snakeComponent);
                break;
        
            case 1:
                var snakeComponent = new SnakeComponent(element.x, element.y-1, element.direction);
                snake.push(snakeComponent);
                break;

            case 2:
                var snakeComponent = new SnakeComponent(element.x+1, element.y, element.direction);
                snake.push(snakeComponent);
                break;

            case 3:
                var snakeComponent = new SnakeComponent(element.x-1, element.y, element.direction);
                snake.push(snakeComponent);
                break;
        }
    }
    if (snake[0].x > 19 || snake[0].x < 0 || snake[0].y > 19 || snake[0].y < 0) {
        alert("Game Over!");
        resetGame();
    }
}

function run() {
    updateSnake();
    checkCollision();
    updateBoard();
    drawBoard();
    
}

setInterval(run, 300);