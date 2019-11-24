
class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(vector) {
        if (!(vector instanceof Object)) {
            return new Vector2(
                this.x + vector,
                this.y + vector
            );
        }

        return new Vector2(
            this.x + vector.x,
            this.y + vector.y
        );
    }

    sub(vector) {
        if (!(vector instanceof Object)) {
            return new Vector2(
                this.x - vector,
                this.y - vector
            );
        }

        return new Vector2(
            this.x - vector.x,
            this.y - vector.y
        );
    }

    multiply(vector) {
        if (vector instanceof Vector2) {
            return new Vector2(
                this.x * vector.x,
                this.y * vector.y
            );
        }

        if (!(vector instanceof Object)) {
            return new Vector2(
                this.x * vector,
                this.y * vector
            );
        }

        return new Vector2(
            this.x * vector[0].x + this.y * vector[1].x,
            this.x * vector[0].y + this.y * vector[1].y
        );
    }

    divide(vector) {
        if (vector instanceof Vector2) {
            return new Vector2(
                this.x / vector.x,
                this.y / vector.y
            );
        }

        if (!(vector instanceof Object)) {
            return new Vector2(
                this.x / vector,
                this.y / vector
            );
        }

        return new Vector2(
            this.x / vector[0].x + this.y / vector[0].y,
            this.x / vector[1].x + this.y / vector[1].y
        );
    }

    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    normalize() {
        return this.divide(this.length());
    }
}
