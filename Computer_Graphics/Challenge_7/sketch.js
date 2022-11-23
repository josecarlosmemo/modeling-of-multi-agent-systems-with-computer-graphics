document.addEventListener("contextmenu", (event) => event.preventDefault()); // Prevents default Right-Click menu from appearing

let state = -1;

let ball = {
  down: {
    x1: 120,
    y1: 40,
    x2: 320,
    y2: 20,
    x3: 320,
    y3: 300,
    x4: 330,
    y4: 300,
  },
  up: {
    x1: 330,
    y1: 300,
    x2: 330,
    y2: 94,
    x3: 380,
    y3: 58,
    x4: 600,
    y4: 40,
  },
};

function setup() {
  createCanvas(800, 400);
  frameRate(1);
}

function draw() {
  background(220);
  noFill();

  if (state === 0) {
    route(ball.down);
    route(ball.up);
  } else if (state === 1) {
    storyboard(ball);
  } else if (state === 2) {
    animation_down(ball.down);
  } else if (state === 3) {
    animation_up(ball.up);
  } else if (state === -1) {
    // Add Text
    fill(0);
    textSize(20);
    text("Click the Right Mouse Button to Start", 200, 200);
  }
}

function storyboard(ball) {
  fill(255);
  let steps = 30;
  let increment = 10;
  let decrement = 40;
  for (let i = 0; i <= steps; i++) {
    let t = i / float(steps);
    let x_down = bezierPoint(
      ball.down.x1,
      ball.down.x2,
      ball.down.x3,
      ball.down.x4,
      t
    );
    let y_down = bezierPoint(
      ball.down.y1,
      ball.down.y2,
      ball.down.y3,
      ball.down.y4,
      t
    );

    let x_up = bezierPoint(ball.up.x1, ball.up.x2, ball.up.x3, ball.up.x4, t);
    let y_up = bezierPoint(ball.up.y1, ball.up.y2, ball.up.y3, ball.up.y4, t);

    ellipse(x_down, y_down, increment, 10);
    ellipse(x_up, y_up, decrement, 10);

    increment = 10 + i * 0.5;
    decrement = 40 + i * 0.5;
  }
}

async function animation_down({ x1, y1, x2, y2, x3, y3, x4, y4 }) {
  let increment = 10;
  let steps = 60;
  for (let i = 0; i <= steps; i++) {
    await sleep(10);
    let t = i / float(steps);
    clear();
    background(220);
    let x_down = bezierPoint(x1, x2, x3, x4, t);
    let y_down = bezierPoint(y1, y2, y3, y4, t);

    ellipse(x_down, y_down, increment, 10);
    increment = 10 + i * 0.5;
  }
  state += 1;
}

async function animation_up({ x1, y1, x2, y2, x3, y3, x4, y4 }) {
  let decrement = 40;
  let steps = 60;
  for (let i = 0; i <= steps; i++) {
    await sleep(10);
    let t = i / float(steps);
    clear();
    background(220);
    let x_up = bezierPoint(x1, x2, x3, x4, t);
    let y_up = bezierPoint(y1, y2, y3, y4, t);

    ellipse(x_up, y_up, decrement, 10);
    decrement = 40 + i * 0.5;
  }
  state = -1;
}

function route({ x1, y1, x2, y2, x3, y3, x4, y4 }) {
  noFill();
  strokeWeight(5);
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mousePressed() {
  if (mouseButton === RIGHT && state < 3) {
    state++;
  } else if (state === 3) {
    state = -1;
  }
}
