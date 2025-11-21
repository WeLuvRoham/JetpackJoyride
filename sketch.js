// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Matter.js module aliases
const Engine = Matter.Engine;
const World = Matter.World;

// Game variables
let engine;
let world;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let gameStatus = false;
  
  // Create Matter.js engine and world with gravity
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;
}

function preload(){
  character = image()
  backdrop = image()
}

function draw() {
  background(220);
  
  // Update physics engine
  Engine.update(engine);
}

class Player { 
  constructor(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }

}

function menu(){
  if(gameStatus === false && death === false){
    
  }
}
