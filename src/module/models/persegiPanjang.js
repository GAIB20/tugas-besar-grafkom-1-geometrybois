"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";

class Rectangle extends Shape{
    /**
     * @type {Point2D} p1
     */
    p1;
    /**
     * @type {Point2D} p2
     */
    p2;
    /**
     * @type {Point2D} p3
     */
    p3;
    /**
     * @type {Point2D} p4
     */
    p4;
    static counter = 0;
    constructor(point) {
        let idName = "rectangle#" + Rectangle.counter;
        super(idName, idName, ShapeTypes.RECTANGLE);
        this.p1 = point;
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