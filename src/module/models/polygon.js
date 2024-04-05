"use strict";
import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";
import Point from "../utils/point.js";
import Color from "../utils/color.js";

class Polygon extends Shape{
    /**
     * @type {number} drawArraysCount 
     */
    count = 1;

    static counter = 0;
    static generateShapeFromObject(object){
        var polygon = new Polygon();
        polygon.angle = object.angle;
        polygon.count = object.count;
        polygon.formed = object.formed;
        polygon.originTranslation = object.originTranslation;
        polygon.position  =object.position;
        polygon.rotation = object.rotation;
        polygon.rotationDegree = object.rotationDegree;
        polygon.scale = object.scale;
        polygon.shapeType = object.shapeType;
        polygon.shear = object.shear;

        // Copy vertices
        for (let vertex of object.vertices){
            let point = new Point(vertex.x, vertex.y);
            point.setColor(new Color(vertex.color.r, vertex.color.g, vertex.color.b, vertex.color.a));
            polygon.vertices.push(point);
        }

        return polygon;
    }

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

    removePoint(idx){
        this.vertices.splice(idx,1);
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
            buffer[i*4] = this.vertices[i].color.r;
            buffer[i*4+1] = this.vertices[i].color.g;
            buffer[i*4+2] = this.vertices[i].color.b;
            buffer[i*4+3] = this.vertices[i].color.a;
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