"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";
import Point from "../utils/point.js";

class Square extends Shape{
    /**
     * @type {Point} vertices
     * @description titik tengah persegi
     */
    center;

    static counter = 0;
    constructor() {
        let idName = "square#" + Square.counter;
        super(idName, idName, ShapeTypes.SQUARE);
        Square.counter++;
    }

    drawArraysMode(gl) {
        return gl.TRIANGLES;
    }

    drawArraysCount() {
        return 6;
    }

    setPoints(p1, p2, p3, p4) {
        this.vertices = [p1, p2, p3, p4];
    }

    getPositionBuffer() {
        return new Float32Array([
            this.vertices[0].x, this.vertices[0].y,
            this.vertices[3].x, this.vertices[3].y,
            this.vertices[1].x, this.vertices[1].y,
            this.vertices[3].x, this.vertices[3].y,
            this.vertices[2].x, this.vertices[2].y,
            this.vertices[1].x, this.vertices[1].y
        ]);
    }

    getColorBuffer() {
        
        return new Float32Array([
            this.vertices[0].color.r, this.vertices[0].color.g, this.vertices[0].color.b, this.vertices[0].color.a,
            this.vertices[3].color.r, this.vertices[3].color.g, this.vertices[3].color.b, this.vertices[3].color.a,
            this.vertices[1].color.r, this.vertices[1].color.g, this.vertices[1].color.b, this.vertices[1].color.a,
            this.vertices[3].color.r, this.vertices[3].color.g, this.vertices[3].color.b, this.vertices[3].color.a,
            this.vertices[2].color.r, this.vertices[2].color.g, this.vertices[2].color.b, this.vertices[2].color.a,
            this.vertices[1].color.r, this.vertices[1].color.g, this.vertices[1].color.b, this.vertices[1].color.a
         ]);
    }

    

    addStartPoint(point) {
        this.vertices[0] = point;
        this.vertices[1] = point;
        this.vertices[2] = point;
        this.vertices[3] = point;
        this.center = point;
    }

    updateLastPoint(point) {
        // Harus tetap persegi sama sisi, gunakan center
        let dx = Math.abs(point.x - this.center.x);
        let dy = Math.abs(point.y - this.center.y);
        let d = Math.min(dx, dy);
        this.vertices[0] = new Point(this.center.x - d, this.center.y - d);
        this.vertices[1] = new Point(this.center.x + d, this.center.y - d);
        this.vertices[2] = new Point(this.center.x + d, this.center.y + d);
        this.vertices[3] = new Point(this.center.x - d, this.center.y + d);
    }

    setPoint(idx, point) {
        // Tetap persegi sama sisi, gunakan center
        let dx = Math.abs(point.x - this.center.x);
        let dy = Math.abs(point.y - this.center.y);
        let d = Math.min(dx, dy);
        this.vertices[0] = new Point(this.center.x - d, this.center.y - d);
        this.vertices[1] = new Point(this.center.x + d, this.center.y - d);
        this.vertices[2] = new Point(this.center.x + d, this.center.y + d);
        this.vertices[3] = new Point(this.center.x - d, this.center.y + d);
    }

    

    static generateShapeFromObject(object) {
        let square = new Square();
        square.angle = object.angle;
        square.formed = object.formed;
        square.originTranslation = object.originTranslation;
        square.position = object.position;
        square.rotation = object.rotation;
        square.rotationDegree = object.rotationDegree;
        square.scale = object.scale;
        square.shapeType = object.shapeType;
        square.shear = object.shear;

        square.setPoints(new Point(object.vertices[0].x, object.vertices[0].y), new Point(object.vertices[1].x, object.vertices[1].y), new Point(object.vertices[2].x, object.vertices[2].y), new Point(object.vertices[3].x, object.vertices[3].y));
        return square;
    }

}

export default Square;