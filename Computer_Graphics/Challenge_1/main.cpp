#include <iostream>
#include <cmath>

using namespace std;

struct Point
{
    double x, y;
};

int main(int argc, char const *argv[])
{
    // Line Drawing Algorithm
    Point p1, p2;
    cout << "Enter the coordinates of the first point: ";

    cin >> p1.x >> p1.y;

    cout << "Enter the coordinates of the second point: ";

    cin >> p2.x >> p2.y;

    double dx = abs(p2.x - p1.x);
    double dy = abs(p2.y - p1.y);

    double length = (dx > dy) ? dx : dy;

    double xInc = dx / length;
    double yInc = dy / length;

    double x = p1.x;
    double y = p1.y;

    for (int i = 0; i <= length; i++)
    {
        cout << "x: " << ceil(x) << "\t\t\ty: " << ceil(y) << endl;

        if (x < p2.x)
            x += xInc;
        else
            x -= xInc;

        if (y < p2.y)
            y += yInc;
        else
            y -= yInc;
    }

    return 0;
}
