"use strict";

import Color from "./color.js";
import Coordinate2D from "./coordinate2D.js";

class Point extends Coordinate2D {
    color = new Color(0,0,0,1);
    
    constructor(x, y) {
        super(x, y);
    }

    setColor(color){
        this.color = color;
    }

    get getColor() {
        return this.color;
    }
}

export default Point;