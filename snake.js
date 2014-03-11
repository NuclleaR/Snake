var timer;
var direct = 0;
var fieldSizeX = 20;
var fieldSizeY = 20;
var KEY = {
    'left' : 37,
    'up' : 38,
    'right' : 39,
    'down' : 40
};
var direction = [
    [0,1],
    [1,0],
    [0,-1],
    [-1,0]];
var snake = {
    length : 3,
    body : [[1,1],[1,2],[1,3]],
    initialisationSnake : function (){
        for ( var i = 0; i < this.length; i++){
            var currentBodyPart = this.body[i];
            document.getElementById(currentBodyPart.join()).className = 'cell snake';
        }
    },
    move : function (){
        var body = this.body
        var head = this.body[this.length-1];
        var headCell = head.map(function(value, index){ return value + direction[direct][index] });
        compareEatOrGameOver(headCell, body);
        return headCell;
    }
};
window.addEventListener('keydown', keyHandler, false);
prepareGamePane(fieldSizeX, fieldSizeY);
//------------------------------------------------------------------------
function prepareGamePane (fieldSizeX, fieldSizeY){
    for ( var x = 0; x < fieldSizeX; x++){
        var coordinateX = document.createElement('div');
        document.body.appendChild(coordinateX);
        coordinateX.className = 'field';
        for (var y = 0; y < fieldSizeY; y++){
            var coordinateY = document.createElement('div');
            coordinateX.appendChild(coordinateY);
            coordinateY.className = 'cell';
            coordinateY.id = x+','+y;
        }
    }
    snake.initialisationSnake();
    makeFood(fieldSizeX, fieldSizeY);
}
//------------------------------------------------------------------------
function makeFood (fieldSizeX, fieldSizeY){
    var x = Math.round(Math.random() * (fieldSizeX-1));
    var y = Math.round(Math.random() * (fieldSizeY-1));
    var food = document.getElementById(x+','+y);
    if (food.className == 'cell'){
        food.className = "cell food";
    } else {
        makeFood(fieldSizeX, fieldSizeY);
    }
    return food;
}
//------------------------------------------------------------------------
function keyHandler (event){
    switch (event.keyCode) {
        case KEY.left:
            if (direct != 0){
                direct = 2;
            }
            break;
        case KEY.right:
            if (direct != 2){
                direct = 0;
            }
            break;
        case KEY.up:
            if (direct != 1){
                direct = 3;
            }
            break;
        case KEY.down:
            if (direct != 3){
                direct = 1;
            }
            break;
        default :
            return;
    }
}
//------------------------------------------------------------------------
function compareEatOrGameOver (headCell, body) {
    var tmp = document.getElementById(headCell.join());
    if ( tmp != null && tmp.className == 'cell' ){
        var removeTail = body.shift();
        body.push(headCell);
        document.getElementById(removeTail.join()).className = 'cell';
        document.getElementById(headCell.join()).className = 'cell snake';
    } else {
        if ( tmp != null && tmp.className == 'cell food'){
            snake.length++;
            body.push(headCell);
            document.getElementById(headCell.join()).className = 'cell snake';
            makeFood(fieldSizeX, fieldSizeY);
            var score = snake.length-3;
            document.getElementById('score').innerHTML = 'Your score: '+score;
        } else {
            if ( tmp == null || tmp.className == 'cell snake'){
                clearInterval(timer);
                alert('Game Over! Your score: ' + (snake.length-3) + '. Press Reload for new game');
            }
        }
    }
}
function startEasy () {
    timer = setInterval(function(){
        snake.move();
    },400);
}
function startMedium () {
    timer = setInterval(function(){
        snake.move();
    },200);
}
function startHard () {
    timer = setInterval(function(){
        snake.move();
    },100);
}
function reload () {
    window.location.reload();
}