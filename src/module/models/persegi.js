"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";

class Square extends Shape{
    static counter = 0;
    constructor() {
        let idName = "square#" + Square.counter;
        super(idName, idName, ShapeTypes.SQUARE);
    }

    drawArraysMode(gl) {
        return gl.TRIANGLES;
    }

    drawArraysCount() {
        return 6;
    }

    getPositionBuffer() {
        return new Float32Array([
            200,200,
            200,400,
            500,200,
            500,200,
            200,400,
            500,400
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