// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let walls = [];
let rect = { x: 100, y: 300, h: 25, w: 25, speed: 4, color: "blue" };
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

walls.push({ x: 500, y: 100, w: 20, h: 150 });
walls.push({ x: 200, y: 100, w: 150, h: 20 });
walls.push({ x: 100, y: 400, w: 20, h: 100 });
walls.push({ x: 400, y: 300, w: 200, h: 20 });
walls.push({ x: 0, y: 0, w: cnv.width, h: 25 });
walls.push({ x: 0, y: 0, w: 25, h: cnv.height });
walls.push({ x: 25, y: 575, w: cnv.width, h: 25 });
walls.push({ x: 775, y: 25, w: 25, h: cnv.height });

// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC
  let rectX2 = rect.x;
  let rectY2 = rect.y;

  if (leftPressed) {
    rectX2 -= rect.speed;
  } else if (rightPressed) {
    rectX2 += rect.speed;
  } else if (upPressed) {
    rectY2 -= rect.speed;
  } else if (downPressed) {
    rectY2 += rect.speed;
  }

  if (!checkCollision(rectX2, rectY2)) {
    rect.x = rectX2;
    rect.y = rectY2;
  }

  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // draw rect
  ctx.fillStyle = rect.color;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

  // Draw walls
  ctx.fillStyle = "grey";
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  }

  // Animation Loop
  requestAnimationFrame(draw);
}

// check collision
function checkCollision(rectX2, rectY2) {
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    if (
      rectX2 + rect.w > wall.x &&
      rectX2 < wall.x + wall.w &&
      rectY2 + rect.h > wall.y &&
      rectY2 < wall.y + wall.h
    ) {
      return true;
    }
  }
  return false;
}

// Event stuff
document.addEventListener("keydown", eventDownHandler);
document.addEventListener("keyup", eventUpHandler);

function eventDownHandler(e) {
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    leftPressed = true;
  } else if (e.code === "ArrowRight" || e.code === "KeyD") {
    rightPressed = true;
  } else if (e.code === "ArrowUp" || e.code === "KeyW") {
    upPressed = true;
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    downPressed = true;
  }
}

function eventUpHandler(e) {
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    leftPressed = false;
  } else if (e.code === "ArrowRight" || e.code === "KeyD") {
    rightPressed = false;
  } else if (e.code === "ArrowUp" || e.code === "KeyW") {
    upPressed = false;
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    downPressed = false;
  }
}
