"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";

class Polygon extends Shape{
    static counter = 0;
    constructor() {
        let idName = "polygon#" + Polygon.counter;
        super(idName, idName, ShapeTypes.POLYGON);
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

export default Polygon;