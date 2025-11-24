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

// function menu(){
//   if(gameStatus === false && death === false){
    
//   }
// }

// Get references to the HTML elements
const startMenu = document.getElementById('startMenu');
const gameContainer = document.getElementById('game');
const startButton = document.getElementById('startButton');

// Function to start the game
function startGame() {
    // Hide the start menu
    startMenu.style.display = 'none';
    // Show the game container
    gameContainer.style.display = 'block';

    // Initialize and start your game logic here
    // For example:
    // initGame();
    // gameLoop();
}

// Add an event listener to the start button
startButton.addEventListener('click', startGame);

// (Optional) If you have a function to initialize the game,
// you might call it within startGame()
// function initGame() {
//     // Setup game variables, create canvas, etc.
// }

// (Optional) If you have a game loop, you might call it within startGame()
// function gameLoop() {
//     // Update game state, render elements, etc.
//     // requestAnimationFrame(gameLoop);
// }
