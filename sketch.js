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
  backdropImg = loadImage('images/newBackground.png');
  secondBackdropImg = loadImage('images/newBackground copy.png');
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
  let groundHeight = 6;
  let startX = 200;
  let startY = height-groundHeight;
  
  ground = Bodies.rectangle(width / 2, height - groundHeight / 2, width, groundHeight, { 
    isStatic: true,
    label: 'ground'
  });

  ceiling = Bodies.rectangle(width/2, -100, width, 20, { 
    isStatic: true,
    label: 'ceiling'
  });

  player = Bodies.rectangle(startX, startY, 160, 280, {
    isStatic: false,
    density: 0.002,
    frictionAir: 0.002,
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
  if (!(player.position.y > height - 200)) {
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
  for (let i = 0; i < 5; i++) { // density of particles
    if (fireParticles.length < maxParticles) {
      fireParticles.push({
        x: x + random(-10, 10),
        y: y,
        vx: random(-1, 1),
        vy: random(1,1),
        life: 255,
        maxLife: 255,
        size: random(20, 40)
      });
    }
  }
}


function updateAndDrawParticles() {
  // Use additive blending for a glowing "heat" effect
  blendMode(ADD); 
  
  for (let i = fireParticles.length - 1; i >= 0; i--) {
    let p = fireParticles[i];
    
    // 1. Update Physics
    p.x += p.vx + sin(frameCount * 0.1) * 0.5; // Add a slight flicker/wind
    p.y += p.vy;
    p.vy *= 1.02; // Accelerate upward (buoyancy)
    p.life -= 7;
    p.size *= 0.96; // Shrink as it cools
    
    // 2. Calculate Dynamic Fire Color
    let lifePct = p.life / p.maxLife;
    let r = 255;
    let g = pow(lifePct, 1.5) * 200; // Green fades faster than red
    let b = pow(lifePct, 3) * 50;    // Blue disappears almost immediately
    
    // 3. draw Particle
    noStroke();
    fill(r, g, b, p.life);
    circle(p.x, p.y, p.size);
    
    // Draw a small bright core
    if (lifePct > 0.6) {
      fill(255, 255, 200, p.life * 0.5);
      circle(p.x, p.y, p.size * 0.5);
    }
    
    if (p.life <= 0) fireParticles.splice(i, 1);
  }
  
  blendMode(BLEND); // Reset blend mode for other UI elements
}


// for resizing the window(makes life easier)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}