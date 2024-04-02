"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";
import Point from "../utils/point.js";
import Main from ""

class Rectangle extends Shape{
    /**
     * @type {Point} p1
     */
    p1;
    /**
     * @type {Point} p2
     */
    p2;
    /**
     * @type {Point} p3
     */
    p3;
    /**
     * @type {Point} p4
     */
    p4;
    /**
     * @type {Object} vertices
     */
    /**
     * @type {Point[]}
     * @description List of vertices
     * @default []
     */
    vertices;
    static counter = 0;
    constructor() {
        let idName = "rectangle#" + Rectangle.counter;
        super(idName, idName, ShapeTypes.RECTANGLE);
        this.p1 = new Point(0, 0);
        this.p2 = new Point(0, 0);
        this.p3 = new Point(0, 0);
        this.p4 = new Point(0, 0);
        this.vertices = [this.p1, this.p2, this.p3, this.p4];
    }

    drawArraysMode(gl) {
        return gl.TRIANGLES;
    }

    drawArraysCount() {
        return 6;
    }

    setPoints(p1, p2, p3, p4) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.vertices = [this.p1, this.p2, this.p3, this.p4];
    }

    // getPositionBuffer() {
    //     return new Float32Array([
    //         150,150, // p1
    //         150,350, // p2
    //         550,150, // p3
    //         550,150, // p3
    //         150,350, // p2
    //         550,350 // p4
    //     ]);
    // }

    getPositionBuffer() {
        return new Float32Array([
            this.p1.x,this.p1.y, // p1
            this.p2.x,this.p2.y, // p2
            this.p3.x,this.p3.y, // p3
            this.p3.x,this.p3.y, // p3
            this.p2.x,this.p2.y, // p2
            this.p4.x,this.p4.y // p4
        ]);
    }

    getColorBuffer() {
        return new Float32Array([
            1, 0, 0.5, 1,
            1, 0, 0.5, 1,
            1, 0, 0.5, 1,
            1, 0, 0.5, 1,
            1, 0, 0.5, 1,
            1, 0, 0.5, 1,
        ]);
    }

    // Move to shape later

    isVertexClicked(x, y) {
        let index = 0;
        this.vertices.forEach((vertex) => {
            var point = getPoints(vertex.x, vertex.y);
            let topRightX = point[2]
            let topRightY = point[3];
            let bottomLeftX = point[6];
            let bottomLeftY = point[7];

            let left = Math.min(topRightX, bottomLeftX);
            let right = Math.max(topRightX, bottomLeftX);
            let bottom = Math.min(topRightY, bottomLeftY);
            let top = Math.max(topRightY, bottomLeftY);

            if (x >= left && x <= right && y >= bottom && y <= top) {
                return index;
            }
            index++;
        })
        return -1;
    }

}

export default Rectangle;