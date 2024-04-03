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

    updateLastPoint(point){
        this.vertices[this.vertices.length-1] = point;
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

    getVertexClicked(x, y){
        let i = 0;
        while (i < this.vertices.length){
            // Cek apakah termasuk jangkauan vertices
            console.log(`cursor dalam x: ${x} y: ${y}    vertex x: ${this.vertices[i].x}, y: ${this.vertices[i].y}`)
            if (((x >= (this.vertices[i].x - 5)) && (x <= (this.vertices[i].x +5))) && ((y >= (this.vertices[i].y-5)) && (y <= (this.vertices[i].y+5)))){
                return i
            }
            i++;
        }
        return -1;
    }

}

export default Polygon;