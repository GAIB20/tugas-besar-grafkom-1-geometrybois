"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";
import Point from "../utils/point.js";

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
    
    static counter = 0;
    constructor() {
        let idName = "rectangle#" + Rectangle.counter;
        super(idName, idName, ShapeTypes.RECTANGLE);
        Rectangle.counter++;
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

    resize(idx, x, y) {
        let two = (idx + 2) % 4;
        let one = 0;
        let three = 0;

        if (idx % 2 == 0) {
            one = (idx + 3) % 4;
            three = (idx + 1) % 4;
        } else {
            one = (idx + 1) % 4;
            three = (idx + 3) % 4;
        }
        let theta = (this.angle * Math.PI) / 180;
        let sin = Math.sin(theta);
        let cos = Math.cos(theta);

        let length = (y - this.vertices[two].y) * sin - (x - this.vertices[two].x) * cos;
        let width = (y - this.vertices[two].y) * cos + (x - this.vertices[two].x) * sin;

        let projectionLengthX = length * Math.cos(theta);
        let projectionLengthY = length * Math.sin(theta);
        let projectionWidthX = width * Math.cos(theta);
        let projectionWidthY = width * Math.sin(theta);

        this.vertices[idx].x = this.vertices[two].x - projectionLengthX + projectionWidthY;
        this.vertices[idx].y = this.vertices[two].y + projectionLengthY + projectionWidthX;

        this.vertices[one].x = this.vertices[two].x + projectionWidthY;
        this.vertices[one].y = this.vertices[two].y + projectionWidthX;

        this.vertices[three].x = this.vertices[two].x - projectionLengthX;
        this.vertices[three].y = this.vertices[two].y + projectionLengthY;
    }

}

export default Rectangle;