"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";

class Polygon extends Shape{
    /**
     * @type {number} drawArraysCount 
     */
    count = 1;

    static counter = 0;
    constructor() {
        let idName = "polygon#" + Polygon.counter;
        super(idName, idName, ShapeTypes.POLYGON);
        Polygon.counter++
    }

    addPoint(point){
        this.vertices.push(point)
    }

    removePoint(){
        point = this.vertices.pop()
        return point
    }

    setPoints(points){
        this.vertices = points
    }

    setCount(count){
        this.count = count;
    }

    drawArraysMode(gl) {
        return (this.count < 3) ? gl.LINES : gl.TRIANGLE_FAN;
    }

    drawArraysCount() {
        return this.count;
    }

    getPositionBuffer() {
        var buffer = new Float32Array(this.count*2);
        
        for (let i =0; i<(this.count); i++){
            buffer[i*2] = this.vertices[i].x;
            buffer[i*2+1] = this.vertices[i].y;
        }
        return buffer;
    }

    getColorBuffer() {
        var buffer = new Float32Array(this.count*4);
        
        for (let i =0; i<(this.count); i++){
            buffer[i*4] = 1;
            buffer[i*4+1] = 0;
            buffer[i*4+2] = 0.5;
            buffer[i*4+3] = 1;
        }

        return buffer;
    }

}

export default Polygon;