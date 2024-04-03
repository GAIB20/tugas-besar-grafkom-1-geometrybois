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

    getCount(){
        return this.count;
    }

    drawArraysMode(gl) {
        return gl.LINE_LOOP;
    }

    drawArraysCount() {
        return this.count;
    }

    getPositionBuffer() {
        var buffer = new Float32Array(this.count*2);
        
        for (let i =0; i<(this.count); i++){
            console.log("vertices: ", this.vertices[i]);
            buffer[i*2] = this.vertices[i].x;
            buffer[i*2+1] = this.vertices[i].x;
        }

        return buffer;
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

}

export default Polygon;