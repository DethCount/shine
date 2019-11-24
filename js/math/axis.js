class Axis
{
    constructor(x, y, l, theta, c) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.theta = theta;
        this.color = color === undefined ? color(0, 0, 0) : c;
    }

    render(ctxt, t, dt) {
        let cosTheta = Math.cos(this.theta);
        let sinTheta = Math.sin(this.theta);

        ctxt.strokeStyle = this.color;

        let pos = new Vector2(-this.x, -this.y)
            .normalize()
            .multiply(this.l)
            .multiply(new Matrix2(
                new Vector2(cosTheta, sinTheta),
                new Vector2(-sinTheta, cosTheta)
            ))
            .add(new Vector2(this.x, this.y));

        ctxt.beginPath();
        ctxt.moveTo(this.x, this.y);
        ctxt.lineTo(pos.x, pos.y);
        ctxt.stroke();
    }
}
