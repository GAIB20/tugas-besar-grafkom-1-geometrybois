import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";
import Point2D from "../utils/point.js";

class Garis extends Shape {
    /**
     * @type {Point2D} p1
     */
    p1;
    /**
     * @type {Point2D} p2
     */
    p2;

    static counter = 0;
    constructor() {
        let idName = "line#" + Garis.counter;
        super(0, idName, ShapeTypes.LINES);
        Garis.counter++;
    }


    drawArraysMode(gl) {
        return gl.POINTS;
    }

    drawArraysCount() {
        return 3;
    }

    getPositionBuffer() {
        return new Float32Array([
            205, 144,
            453, 211,
            720, 326,
            696, 134,
            400, 500,
            0, 300
        ]);
    }

    getColorBuffer() {
        var r1 = Math.random();
        var b1 = Math.random();
        var g1 = Math.random();
        return new Float32Array([
            r1, b1, g1, 1,
            r1, b1, g1, 1,
            r1, b1, g1, 1,
            b1, r1, g1, 1,
            b1, r1, g1, 1,
            b1, r1, g1, 1
        ]);
    }

}

export default Garis;