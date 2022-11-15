function setup() {
  createCanvas(400, 400);
}

function draw() {
  lines = [
    [1, 2, 100, 20],
    [10, 200, 50, 10],
    [300, 300, 10, 10],
    [350, 350, 100, 300],
  ];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0] < lines[i][2]) {
      const m = (lines[i][3] - lines[i][1]) / (lines[i][2] - lines[i][0]);
      const b = lines[i][1] - m * lines[i][0];
      for (let x = lines[i][0]; x < lines[i][2]; x++) {
        const y = m * x + b;
        point(x, y);
      }
    } else if (lines[i][0] > lines[i][2]) {
      const m = (lines[i][3] - lines[i][1]) / (lines[i][2] - lines[i][0]);
      const b = lines[i][1] - m * lines[i][0];
      for (let x = lines[i][0]; x > lines[i][2]; x--) {
        const y = m * x + b;
        point(x, y);
      }
    } else {
      if (lines[i][1] < lines[i][3]) {
        for (let y = lines[i][1]; y < lines[i][3]; y++) {
          point(lines[i][0], y);
        }
      } else {
        for (let y = lines[i][1]; y > lines[i][3]; y--) {
          point(lines[i][0], y);
        }
      }
    }
  }
}
