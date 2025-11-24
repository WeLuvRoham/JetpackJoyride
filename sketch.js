// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



// Matter JS
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Render = Matter.Render;

var engine;
var world;
var box;

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  box1 = Bodies.rectangle(400, 200, 80, 80);
  Engine.run(engine);
  console.log(box);
}

function preload(){
  character = image()
  backdrop = image()
}

function draw() {
  
}


// function menu(){
//   if(gameStatus === false && death === false){
    
//   }
// }

// Get references to the HTML elements


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
