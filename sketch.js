// Jetpack Joyride Game
// Enhanced with particle effects and sprite animation

// Matter JS
let ranHeight = Math.floor(Math.random() * 300) + 100;
let ranWidth = Math.floor(Math.random() * 500) + 800;
let obstacles = [];
let characterRunning;
let backdropImg;
let secondBackdropImg;
let player;
let scrollX = 0;
let scrollSpeed = 5;
let forceMagnitude = 0.4;
let jetpackActive = false;

// Animation variables
let runningFrames = [];
let currentFrame = 0;
let frameCounter = 0;
let frameDelay = 5; // Frames between animation updates

// Particle system variables
let fireParticles = [];
let maxParticles = 20000;

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;

function preload(){
  backdropImg = loadImage('images/city.jpg');
  secondBackdropImg = loadImage('images/secondCity.jpg');
  characterRunning = loadImage('images/Run.png');
  console.log("Assets preloaded");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize Matter.js
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  
  // Setup running animation frames from spritesheet
  let spriteWidth = characterRunning.width / 10;
  let spriteHeight = characterRunning.height;
  
  for (let i = 0; i < 10; i++) {
    let frameImg = createImage(spriteWidth, spriteHeight);
    frameImg.copy(
      characterRunning,
      i * spriteWidth, 0, spriteWidth, spriteHeight,
      0, 0, spriteWidth, spriteHeight
    );
    runningFrames.push(frameImg);
  }
  
  // Create player
  let groundHeight = 100;
  let startX = 200;
  let startY = height-groundHeight;
  
  ground = Bodies.rectangle(width / 2, height - groundHeight / 2, width, groundHeight, { 
    isStatic: true,
    label: 'ground'
  });

  ceiling = Bodies.rectangle(width / 2, 0, width, 1, { 
    isStatic: true,
    label: 'ceiling'
  });

  player = Bodies.rectangle(startX, startY, 160, 280, {
    isStatic: false,
    density: 0.002,
    frictionAir: 0.02,
    inertia: Infinity,
    label: 'player'
  });

  obstacle = Bodies.rectangle(width + ranWidth, height - ranHeight, 50, 150, {
    isStatic: true,
    label: 'obstacle'
  });

  World.add(world, [player, ground, ceiling, obstacle]);
}

function draw() {
  // values for obstacle(s)
  randomValues();

  background(200); // Clear background
  drawInfiniteBackground();
  
  // Update physics
  Engine.update(engine);
  
  // Handle input
  updateJetpack();
  
  // Update and draw particles
  updateAndDrawParticles();
  
  // Draw player
  drawPlayer();

  // Draw obstacle
  drawObstacle(obstacle);
  
  // Debug info
  fill(0);
  textSize(12);
  text(`Jetpack: ${jetpackActive ? 'ON' : 'OFF'} (SPACE)`, 10, 20);
}

function randomValues() {
  ranHeight = Math.floor(Math.random() * 300) + 100;
  ranWidth = Math.floor(Math.random() * 500) + 800;
}

function drawInfiniteBackground() {
  scrollX -= scrollSpeed;
  if (player.position.y > 100 + 280) {
    let fasterScroll = scrollSpeed + forceMagnitude * 10;
    scrollX -= fasterScroll;
  }
  if (scrollX <= -width) {
    scrollX = 0;
  }
  
  image(backdropImg, scrollX, 0, width, height);
  image(secondBackdropImg, scrollX + width, 0, width, height);//another background for smooth trans
  image(backdropImg, scrollX + width * 2, 0, width, height);//third for safe measure
}

function drawObstacle(obstacle) {
  let pos = obstacle.position;
  obstacles.push(obstacle);
  push();
  translate(pos.x, pos.y);
  fill(150, 0, 0);
  rectMode(CENTER);
  rect(0, 0, ranWidth, ranHeight);
  pop();
}

function removeObstacle(obstacle) {
  if (obstacle.position.x < -100) {
    obstacles.shift();
    World.remove(world, obstacle);
  }
  
}

function drawPlayer() {
  let pos = player.position;
  
  push();
  translate(pos.x, pos.y);
  
  // draw running animation
  let frameWidth = runningFrames[0].width;
  let frameHeight = runningFrames[0].height;
  
  // Update Animation frame
  frameCounter++;
  if (frameCounter > frameDelay) {
    currentFrame = (currentFrame + 1) % runningFrames.length;
    frameCounter = 0;
  }
  
  // draw the current frame
  imageMode(CENTER);
  image(runningFrames[currentFrame], 0, 0, frameWidth, frameHeight);
  
  pop();
}

function updateJetpack() {
  jetpackActive = keyIsDown(32);
  
  if (jetpackActive) {
    let fasterScroll = scrollSpeed + forceMagnitude * 10;
    scrollX -= fasterScroll;
    
    // Apply upward force
    Matter.Body.applyForce(
      player,
      { x: player.position.x, y: player.position.y },
      { x: 0, y: -forceMagnitude }
    );
    
    // Create fire particles
    createFireParticles(player.position.x - 20, player.position.y + 50);
  }
}

// ============ PARTICLE SYSTEM ============ (refered to fireworks project but made it way better haha)

function createFireParticles(x, y) {
  // Create multiple particles per frame for better effect
  for (let i = 0; i < 3; i++) {
    if (fireParticles.length < maxParticles) {
      fireParticles.push({
        x: x + random(-15, 15),
        y: y + random(-10, 10),
        vx: random(-2, 2),
        vy: random(-4, -1),
        life: 255,
        size: random(15, 35),
        color: random([
          { r: 255, g: 100, b: 0 },    // orange
          { r: 255, g: 150, b: 0 },    // light orange
          { r: 255, g: 200, b: 0 }     // yellow
        ])
      });
    }
  }
}

function updateAndDrawParticles() {
  for (let i = fireParticles.length - 1; i >= 0; i--) {
    let p = fireParticles[i];
    
    // Update physics
    p.x += p.vx;
    p.y += p.vy;
    p.vy -= -0.15; // gravity down(might change this later)
    p.life -= 8;
    p.size *= 0.97; // Shrink over time
    
    // Draw particle
    noStroke();
    let c = p.color;
    fill(c.r, c.g, c.b, p.life);
    
    // draw glowing circle with blur effect
    ellipse(p.x, p.y, p.size);
    
    // Draw inner bright core
    fill(255, 255, 200, p.life * 0.7);
    ellipse(p.x, p.y, p.size * 0.4);
    
    // Remove dead particles
    if (p.life <= 0) {
      fireParticles.splice(i, 1);
    }
  }
}

// for resizing the window(makes life easier)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}