#include <GL/glut.h>
#include <GL/gl.h>
#include <iostream>
#include <cmath>
#include <vector>

struct Point
{
    int x;
    int y;
};

using namespace std;

void drawLine(Point p1, Point p2)
{
    double dx = abs(p2.x - p1.x);
    double dy = abs(p2.y - p1.y);

    double length = (dx > dy) ? dx : dy;

    double xInc = dx / length;
    double yInc = dy / length;

    double x = p1.x;
    double y = p1.y;

    for (int i = 0; i <= length; i++)
    {

        glColor3f(1.0, 1.0, 1.0);
        glBegin(GL_POINTS);
        glVertex2i(ceil(x), ceil(y));
        glEnd();
        glFlush();

        if (x < p2.x)
            x += xInc;
        else
            x -= xInc;

        if (y < p2.y)
            y += yInc;
        else
            y -= yInc;
    }
}

void runTestCases(void)
{
    vector<pair<Point, Point>> lines{
        {{1, 2}, {100, 20}},
        {{10, 200}, {50, 10}},
        {{300, 300}, {10, 10}},
        {{200, 300}, {250, 50}},
        {{350, 350}, {100, 300}}};

    for (auto line : lines)
    {
        drawLine(line.first, line.second);
    }
}

int main(int argc, char **argv)
{

    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowPosition(0, 0);
    glutInitWindowSize(600, 600);
    glutCreateWindow("Challenge 3: Lines Drawing algorithm with OpenGL");

    glClearColor(0.0, 0.0, 0.0, 0.0);
    glMatrixMode(GL_PROJECTION);
    gluOrtho2D(0.0, 600.0, 0.0, 600.0);

    glutDisplayFunc(runTestCases);
    glutMainLoop();

    return 0;
}
