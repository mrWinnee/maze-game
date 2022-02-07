////////////// self explinator variables //////////////
let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

let enter = document.querySelector('#enter');
let exit = document.querySelector('#exit');
let wall = document.querySelector('#wall');
let start = document.querySelector('#start');


//////////// the dimensions of the canvas ////////////////
canvas.width = 400;
canvas.height = 400;


/////////  just an oop to make rects  ////////////
function Rect(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.drawBorder = function() {
        c.beginPath();
        c.lineWidth = "1";
        c.strokeStyle = "black";
        c.rect(this.x, this.y, canvas.width / 8, canvas.height / 8);
        c.stroke();
    }
    this.drawRect = function() {
        c.fillStyle = color;
        c.fillRect(this.x, this.y, canvas.width / 8, canvas.height / 8);
    }
    this.update = function() {
        if (this.color == undefined) {
            this.drawBorder();
        } else if (this.color != undefined) {
            this.drawRect();
        }
    }

}


////////// global variables /////////
let rects = [];
let ways = [];
let walls = [];

////////// a self invoked function to draw the border of the rects and adding them to rects array and ways array  /////////////
(function init() {
    let X = 0;
    let Y = 0;
    for (let i = 0; i < 64; i++) {
        if (X != 0 && X % 8 == 0) {
            Y++;
            X = 0;
        }
        rects.push(new Rect(X * canvas.width / 8, Y * canvas.height / 8, undefined));
        ways.push(new Rect(X * canvas.width / 8, Y * canvas.height / 8, undefined));
        X++;
    }

})();



///////////// to disable the button on click ////////
enter.addEventListener('click', () => {
    enter.disabled = true;
});
exit.addEventListener('click', () => {
    exit.disabled = true;
});
wall.addEventListener('click', () => {
    wall.disabled = true;
});

////////////// on click draw the entry point or the exit point or the walls /////////////////
canvas.addEventListener('click', function(e) {

    for (let i = rects.length - 1; i >= 0; i--) {
        if (e.clientX - rects[i].x >= 0 && e.clientX - rects[i].x <= canvas.width / 8 && e.clientY - rects[i].y >= 0 && e.clientY - rects[i].y <= canvas.height / 8) {
            if (wall.disabled) {
                rects[i] = new Rect(rects[i].x, rects[i].y, "black");
                start.style.display = "block";
                break;
            } else if (exit.disabled) {
                rects[i] = new Rect(rects[i].x, rects[i].y, "red");
                wall.style.display = "block";
                break;
            } else if (enter.disabled) {
                rects[i] = new Rect(rects[i].x, rects[i].y, "green");
                exit.style.display = "block";
                break;
            } else {
                rects[i] = new Rect(rects[i].x, rects[i].y, "black");
                walls.push(rects[i]);
                ways.splice(i, 1);
            }
        };
    }
});

////////////// function to track the changes and drawing them ///////////////// 

(function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rects.length; i++) {
        rects[i].update();
    }
})();