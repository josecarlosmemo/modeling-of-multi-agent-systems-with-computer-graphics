const draw_line = (x1, y1, x2, y2) => {
  line(x1, y1, x2, y2);
};

let line_points = {};
let control_points = [];

let is_line_drawn = false;
let are_control_points_drawn = false;
const extra_control_point_area = 30;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255);

  if (!are_control_points_drawn) {
    draw_line(line_points.x1, line_points.y1, line_points.x2, line_points.y2);
    for (let i = 0; i < control_points.length; i++) {
      circle(control_points[i][0], control_points[i][1], 10);
    }
  } else {
    for (let i = 0; i < control_points.length; i++) {
      circle(control_points[i][0], control_points[i][1], 10);
      bezier(
        line_points.x1,
        line_points.y1,
        control_points[0][0],
        control_points[0][1],
        control_points[1][0],
        control_points[1][1],
        line_points.x2,
        line_points.y2
      );
    }
  }

  // if (is_line_drawn === false) {
  // } else {
  //   draw_line(line_points.x1, line_points.y1, line_points.x2, line_points.y2);
  //   for (let i = 0; i < control_points.length; i++) {
  //     circle(control_points[i].x, control_points[i].y, extra_control_point_area);
  //   }
  // }

  // if (are_control_points_drawn === true) {
  //   // Draw the bezier curve

  // }
}

function mousePressed() {
  if (is_line_drawn === false) {
    line_points.x1 = mouseX;
    line_points.y1 = mouseY;
    line_points.x2 = mouseX;
    line_points.y2 = mouseY;
  } else {
    // Check if there are 2 control points
    if (!are_control_points_drawn) {
      control_points.push([mouseX, mouseY]);
      if (control_points.length === 2) {
        are_control_points_drawn = true;
      }
    } else {
      if (
        mouseX > control_points[0][0] - extra_control_point_area &&
        mouseX < control_points[0][0] + extra_control_point_area &&
        mouseY > control_points[0][1] - extra_control_point_area &&
        mouseY < control_points[0][1] + extra_control_point_area
      ) {
        control_points[0][0] = mouseX;
        control_points[0][1] = mouseY;
      } else if (
        mouseX > control_points[1][0] - extra_control_point_area &&
        mouseX < control_points[1][0] + extra_control_point_area &&
        mouseY > control_points[1][1] - extra_control_point_area &&
        mouseY < control_points[1][1] + extra_control_point_area
      ) {
        control_points[1][0] = mouseX;
        control_points[1][1] = mouseY;
      } else {
        control_points = [];
        are_control_points_drawn = false;
        line_points = {};
        is_line_drawn = false;
      }
    }
  }
}

function mouseDragged() {
  if (is_line_drawn === false) {
    line_points.x2 = mouseX;
    line_points.y2 = mouseY;
  }

  // if control points are drawn, then we can move them
  if (are_control_points_drawn === true) {
    if (
      mouseX > control_points[0][0] - extra_control_point_area &&
      mouseX < control_points[0][0] + extra_control_point_area &&
      mouseY > control_points[0][1] - extra_control_point_area &&
      mouseY < control_points[0][1] + extra_control_point_area
    ) {
      control_points[0][0] = mouseX;
      control_points[0][1] = mouseY;
    } else if (
      mouseX > control_points[1][0] - extra_control_point_area &&
      mouseX < control_points[1][0] + extra_control_point_area &&
      mouseY > control_points[1][1] - extra_control_point_area &&
      mouseY < control_points[1][1] + extra_control_point_area
    ) {
      control_points[1][0] = mouseX;
      control_points[1][1] = mouseY;
    }
  }
}

function mouseReleased() {
  if (is_line_drawn === false) {
    // Check if the line is drawn
    if (
      line_points.x1 !== line_points.x2 &&
      line_points.y1 !== line_points.y2
    ) {
      is_line_drawn = true;
    }
  }
}
