// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



// Matter JS
// Define variables globally, but without assigning p5/Matter values yet
let characterImg; // Renamed from 'character' to avoid conflict with potential character object
let backdropImg;  // Renamed from 'backdrop'
let player;       // Renamed from 'box' to avoid conflict with p5.js 'box()' function

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Render = Matter.Render;

var engine;
var world;
// let x = 200; // x and y should ideally be managed by Matter.js body position
// let y; // y can be set in setup() using 'height'

function preload(){
  // Use 'loadImage' in preload. The 'image()' function is used in draw to display an image.
  // You need to provide actual image file paths here.
  // characterImg = loadImage('path/to/your/character.png');
  // backdropImg = loadImage('path/to/your/background.jpg');
  console.log("Assets preloaded (if paths were provided).");
}

function setup() {
  // createCanvas makes 'width' and 'height' variables available globally
  createCanvas(windowWidth, windowHeight);
  
  // Initialize the Matter.js engine and world
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine); // Starts the physics simulation
  
  // 'height' is now defined. We can create the player body using canvas dimensions.
  // We use the variable 'player' instead of 'box' to avoid conflict with p5.js 'box()' function.
  let startX = 200;
  let startY = height / 4; 
  player = Bodies.rectangle(startX, startY, 80, 80);
  
  World.add(world, player);
  console.log("Matter.js player body created and added to world.");
}

function draw() {
  // Update the background every frame
  background(220); // Or use backdropImg if you loaded one: image(backdropImg, 0, 0, width, height);

  // Use p5 to draw the player based on its Matter.js physics position
  let pos = player.position;
  let angle = player.angle;
  
  push(); // Start p5 transform context
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  fill(255, 0, 100); // Draw a pink rectangle as a placeholder for your character
  rect(0, 0, 80, 80);
  
  // If you loaded an image in preload():
  // image(characterImg, -40, -40, 80, 80); 
  
  pop(); // Restore p5 transform context
}

// Ensure you include all necessary HTML elements in your index.html
// for the startGame function to work if you uncomment the lines below.

// // Get references to the HTML elements (These assume elements exist in index.html)
// const startMenu = document.getElementById('startMenu');
// const gameContainer = document.getElementById('game');

// // Function to start the game
// function startGame() {
//     // Hide the start menu
//     startMenu.style.display = 'none';
//     // Show the game container
//     gameContainer.style.display = 'block';
// }


    // Initialize and start your game logic here
    // For example:
    // initGame();
    // gameLoop();



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
