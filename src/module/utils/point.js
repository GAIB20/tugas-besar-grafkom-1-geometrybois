"use strict";

import Coordinate2D from "./coordinate2D.js";

class Point extends Coordinate2D {
    red = 0;
    green = 0;
    blue = 0;
    alpha = 1;
    constructor(x, y) {
        super(x, y);
    }

    get getColor() {
        return [this.red, this.green, this.blue, this.alpha];
    }
}

export default Point;