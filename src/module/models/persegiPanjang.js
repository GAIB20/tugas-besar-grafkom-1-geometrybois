"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";

class Rectangle extends Shape{
    static counter = 0;
    constructor() {
        let idName = "rectangle#" + Rectangle.counter;
        super(idName, idName, ShapeTypes.RECTANGLE);
    }

    drawArraysMode(gl) {
        return gl.TRIANGLES;
    }

    drawArraysCount() {
        return 6;
    }

    getPositionBuffer() {
        return new Float32Array([
            150,150,
            150,350,
            550,150,
            550,150,
            150,350,
            550,350
        ]);
    }

    getColorBuffer() {
        return new Float32Array([
            1, 0, 0.5, 1,
            1, 0, 0.5, 1,
            0, 1, 0.5, 1,
            1, 0, 0.5, 1,
            0, 1, 0.5, 1,
            0, 1, 0.5, 1
        ]);
    }

}

export default Rectangle;