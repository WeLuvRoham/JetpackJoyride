// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  let gameStatus = false;
}

function preload(){
  character = image()
  backdrop = image()
}

function draw() {
  background(220);
}

class Player { 
  constructor(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }

}
