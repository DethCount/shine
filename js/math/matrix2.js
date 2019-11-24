class Matrix2 {
    constructor(vector0, vector1) {
        this[0] = vector0 || new Vector2(); // row vector
        this[1] = vector1 || new Vector2();
    }

    transpose() {
        return new Matrix2(
            new Vector2(this[0].x, this[1].x),
            new Vector2(this[0].y, this[1].y)
        );
    }

    multiply(tensor) {
        return new Vector2(
            tensor.x * this[0].x + tensor.y * this[0].y,
            tensor.x * this[1].x + tensor.y * this[1].y
        );
    }
}
