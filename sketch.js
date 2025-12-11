// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



// Matter JS
// Define variables globally, but without assigning p5/Matter values yet
let characterRunning;
let characterImg; // Renamed from 'character' to avoid conflict with potential character object
let backdropImg;  // Renamed from 'backdrop'


let secondBackdropImg; // For seamless transitions as 'character' moves
let player;       // Renamed from 'box' to avoid conflict with p5.js 'box()' function
let scrollX = 0;  // Background scroll position
let scrollSpeed = 10; // Speed of background scroll (pixels per frame)
let forceMagnitude = 5; // Magnitude of force applied to the player

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
  backdropImg = loadImage('images/city.jpg');
  secondBackdropImg = loadImage('images/secondCity.jpg');
  characterRunning = loadImage('images/Run.png');
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
  let groundHeight = 100;
  ground = Bodies.rectangle(width / 2, height - groundHeight / 2, width, groundHeight, { 
    isStatic: true,
    label: 'ground'
  });

  player = Bodies.rectangle(startX, startY, 160, 280, {
    isStatic: false, // Allow the body to move
    density: 0.002, // give mass for gravity effect
    frictionAir: 0.02, // Simulate some air resistance
    inertia: Infinity, // Prevent rotation
    label: 'player'
  });
  
  
  World.add(world, [player, ground]);
  console.log("Matter.js player body created and added to world.");
}

function draw() {
  // Draw infinite scrolling background
  drawInfiniteBackground();
  
  // Update physics
  Engine.update(engine);

  // Use p5 to draw the player based on its Matter.js physics position
  let pos = player.position;
  let angle = player.angle;
  
  push(); // Start p5 transform context
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  fill(255, 0, 100); 
  rect(0, 0, 160, 280);
  
  
  // If you loaded an image in preload():
  // image(characterImg, -40, -40, 80, 80); 
  
  pop(); // Restore p5 transform context
}

// Function for infinite scrolling background using two images
function drawInfiniteBackground() {
  // Update scroll position each frame
  scrollX -= scrollSpeed;
  
  // Reset scroll when it goes too far (seamless loop)
  if (scrollX <= -width) {
    scrollX = 0;
  }
  
  // Draw first image at current position
  image(backdropImg, scrollX, 0, width, height);
  
  // Draw second image to the right outside visible screen
  image(secondBackdropImg, scrollX + width, 0, width, height);

  // third image to ensure nothing funny happens
  image(backdropImg, scrollX + width * 2, 0, width, height);
}

function keyPressed() {
  if (keyIsDown(32) === true) {
    console.log("TEST.")
    // Apply an upward force to the player body
    Matter.Body.applyForce(
    player, // The body to apply force to
    { x: player.position.x, y: player.position.y }, // The point to apply force from (center of mass)
    { x: 0, y: -forceMagnitude } // The force vector (negative y is up)
);
  }
  
}





