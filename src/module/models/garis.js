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

    constructor(id, name, point) {
        super(id, name, ShapeTypes.LINES);

    }


    drawArraysMode(gl) {
        return gl.TRIANGLES;
    }

    drawArraysCount() {
        return 6;
    }

    getPositionBuffer() {
        return new Float32Array([
            0, 0,
            400, 0,
            400, 300,
            0, 0,
            400, 300,
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