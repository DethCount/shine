class Circle
{
    constructor(r, g, b, a, x, y, R, theta0, theta1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.x = x;
        this.y = y;
        this.R = R;
        this.theta0 = undefined === theta0 ? 0 : theta0;
        this.theta1 = undefined === theta1 ? 2 * Math.PI : theta1;

        this.axes = [
            new Axis(this.x, this.y, R * (255 / this.r), 0, color(this.r)),
            new Axis(this.x, this.y, R * (255 / this.g), -2* Math.PI / 3, color(0, this.g)),
            new Axis(this.x, this.y, R * (255 / this.b), 2* Math.PI / 3, color(0, 0, this.b))
        ];
    }

    render(ctxt, t, dt) {
        ctxt.fillStyle = color(this.r, this.g, this.b, this.a);
        ctxt.beginPath();
        ctxt.arc(this.x, this.y, this.R, this.theta0, this.theta1);
        ctxt.fill();
        return;

        for (let axis of this.axes) {
            axis.render(ctxt, t, dt);
        }
    }
}
