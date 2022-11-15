// Add Sides and color variables
function setup() {
  createCanvas(400, 400);
  sides = 5;
  rgb = [random(255), random(255), random(255)];
}

function draw() {
  background(220);
  polygon(sides, color(...rgb));
}

function polygon(n_points, color) {
  fill(color);
  beginShape();
  for (let i = 0; i < n_points; i++) {
    const angle = (TWO_PI / n_points) * i;
    const x = 200 + 100 * cos(angle);
    const y = 200 + 100 * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function mousePressed() {
  if (sides < 12) {
    sides++;
  } else {
    sides = 5;
  }
  rgb = [random(255), random(255), random(255)];
}
