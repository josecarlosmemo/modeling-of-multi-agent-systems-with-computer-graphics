function setup() {
  createCanvas(800, 800);
}

const myTranslate = (x, y, tx, ty) => [x + tx, y + ty];

const myRotate = (x, y, angle) => [
  x * cos(radians(angle)) - y * sin(radians(angle)),
  x * sin(radians(angle)) + y * cos(radians(angle)),
];

const myRotatePiv = (x, y, pivX, pivY, angle) => [
  (x - pivX) * cos(radians(angle)) - (y - pivY) * sin(radians(angle)) + pivX,
  (x - pivX) * sin(radians(angle)) + (y - pivY) * cos(radians(angle)) + pivY,
];

const myScale = (x, y, sx, sy) => [x * sx, y * sy];

const myReflection = (x, y) => [width - x, height - y];

const myShearX = (x, y, shx) => [x + shx * y, y];

const myShearY = (x, y, shy) => [x, y + shy * x];

function draw() {
  // Middle Coords
  const x = width / 2;
  const y = height / 2;

  background(100);
  // Base Polygon
  fill(color(255, 0, 0));
  polygon(x, y, 100, 5, null);
  fill(color(255, 255, 255));
  text("Base Polygon", x, y);
  // Translated Polygon
  fill(color(0, 255, 0));
  polygon(x, y, 100, 5, myTranslate, 100, 100);
  fill(color(255, 255, 255));
  text("Translated Polygon", x + 100, y + 100);
  // Rotated Polygon
  fill(color(0, 0, 255));
  polygon(x, y, 100, 5, myRotate, 45);
  fill(color(255, 255, 255));
  text("Rotated Polygon", x - 200, y + 100);
  // Rotated Polygon
  fill(color(255, 255, 0));
  polygon(x + 200, y, 100, 5, myRotatePiv, x + 200, y, x + 200, y, 45);
  fill(color(0, 0, 0));
  text("Rotated Polygon\nPivot:\nOriginal Coords", x + 150, y);
  // Scaled Polygon
  fill(color(0, 255, 255));
  polygon(x - 200, y - 200, 100, 5, myScale, 1.2, 1.2);
  fill(color(0, 0, 0));
  text("Scaled Polygon", x - 200, y - 200);
  // Reflected Polygon
  fill(color(255, 0, 255));
  polygon(x + 10, y - 200, 100, 5, myReflection, x + 10, y - 200, "x");
  fill(color(0, 0, 0));
  text("Reflected Polygon\nBoth x & y axis", x - 40, y + 200);
  // Sheared Polygon
  fill(color(255, 255, 255));
  polygon(x, y - 200, 100, 5, myShearX, 0.5);
  fill(color(0, 0, 0));
  text("Sheared Polygon\nShear X", x, y - 200);
  // Sheared Polygon
  fill(color(255, 255, 255));
  polygon(x + 200, y, 100, 5, myShearY, 0.5);
  fill(color(0, 0, 0));
  text("Sheared Polygon\nShear Y", x + 200, y + 250);
}

function polygon(x, y, radius, npoints, transform, ...params) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    if (transform != null) {
      [sx, sy] = transform(sx, sy, ...params);
    }
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
