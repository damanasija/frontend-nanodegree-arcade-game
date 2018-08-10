//Constants for setting initial positions
var PLAYER_INIT_X = 202;
var PLAYER_INIT_Y = 390;

var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 514;

var won = 0;
var lost = 0;

//utility function to generate randomised speeds
var generateSpeed = function() {
    return 100 + Math.floor(Math.random() * 150);
}

//contains y-coordinates of rows where enemy can possibly spawn
var ENEMY_ROW_Y = [58, 141, 224];

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt

    if(this.x > CANVAS_WIDTH) { //if enemy goes out of the canvas
        this.x = -101;
        this.speed = generateSpeed(); //this ensures that the speed of this enemy is random
    }
    checkCollision(this);
};

var checkCollision = function(enemy) {
    if(player.x < enemy.x + 70 && 
        player.x + 70 > enemy.x &&
        enemy.y == player.y){
            player.reset();
            lost++;
            document.getElementById('lose').innerText = lost;
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = PLAYER_INIT_X;
    this.y = PLAYER_INIT_Y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.reset = function () {
    this.x = PLAYER_INIT_X;
    this.y = PLAYER_INIT_Y;
}

Player.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(direction) {
    if(direction === 'right' && this.x < 404) {
        this.x += 101;
    }
    if(direction === 'left' && this.x > 0) {
        this.x -= 101;
    }
    if(direction === 'up' && this.y > 0){
        if(this.y <= 83){
            won++;
            this.reset();
            document.getElementById('win').innerText = won;
        }
        else { 
            this.y -= 83;
        }
    }
    if(direction === 'down' && this.y < PLAYER_INIT_Y) {
        this.y += 83
    }
    console.log('x: ' + this.x + ' y: ' + this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(-101, ENEMY_ROW_Y[0], generateSpeed()),
    new Enemy(-101, ENEMY_ROW_Y[1], generateSpeed()),
    new Enemy(-101, ENEMY_ROW_Y[2], generateSpeed())
];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
