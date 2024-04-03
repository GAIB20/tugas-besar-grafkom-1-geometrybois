"use strict"

// import Garis from "../models/garis3.js"
import GLSLProgram from "../utils/GLSLProgram.js"
import GLDrawing from "./GLDrawing.js"

import ShapeTypes from "../type/shapeTypes.js"

import Shape from "../models/shape.js"
import Garis from "../models/garis.js"
import Polygon from "../models/polygon.js"
import Square from "../models/persegi.js"
import Rectangle from "../models/persegiPanjang.js"
import Point from "../utils/point.js"

/**
 * @class Drawer2
 * @description Drawer class for list of shapes
 */
class Drawer {
    /**
     * @type {GLDrawing}
     */
    glDrawing;

    /**
     * @type {Shape[]}
     * @description List of shapes
     * @default []
     */
    Shapes;

    /**
     * @type {Shape}
     * @description Shape being drawn
     * @default null
     */
    shapeCandidate;

    constructor() {
        const [canvas, gl] = GLSLProgram.getCanvasAndGLFromidCanvas("glcanvas");
        const program = GLSLProgram.createProgram(gl);
        const undetectedOffset = 15;
        this.glDrawing = new GLDrawing(gl, program);

        var leftPanelWidth = (document.querySelector('.left-panel')).offsetWidth;
        var rightPanelWidth = (document.querySelector('.right-panel')).offsetWidth;

        console.log(`window: ${window.innerWidth}, ${window.innerHeight}`);
        gl.canvas.width = gl.canvas.clientWidth - leftPanelWidth - rightPanelWidth;
        gl.canvas.height = gl.canvas.clientHeight;
        gl.viewport(leftPanelWidth-undetectedOffset, 0, gl.canvas.width, gl.canvas.height);

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);

        var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

       this.Shapes = [];
       this.shapeCandidate = null;       
    }

    drawAllShapes() {
        this.Shapes.forEach(shape => {
            this.glDrawing.drawShape(shape);
        });
    }

    drawPoints(shape){
        shape.vertices.forEach((vertex) => {
            const point = shape.getPoints(vertex.x, vertex.y);
            const square = this.pointToSquare(point);
            this.glDrawing.drawShape(square);
        })
    }

    drawOneShape(shape) {
        this.glDrawing.drawShape(shape);
        this.drawPoints(shape);
    }

    addShape(shape) {
        this.Shapes.push(shape);
    }

    #removeShape(shape) {
        this.Shapes = this.Shapes.filter(s => s !== shape);
    }

    clearShapes() {
        this.Shapes = [];
        this.glDrawing.clear();
    }

    startFormShape(shapeType, mousePosition){
        let shape = null;
        switch (shapeType) {
            case ShapeTypes.LINES:
                shape = new Garis(0, "Garis1", mousePosition);
                break;
            case ShapeTypes.POLYGON:
                shape = new Polygon();
                shape.addPoint(mousePosition);
                break;
            case ShapeTypes.RECTANGLE:
                shape = new Rectangle(mousePosition);
                break;
            default:
                console.error(`ShapeType ${shapeType} is not recognized`);
                return;
        }
        
        this.shapeCandidate = shape;
    }

    drawShapeCandidate(){
        this.drawAllShapes();
        this.drawOneShape(this.shapeCandidate);
    }

    clearShapeCandidate(){
        this.shapeCandidate = null
    }

    moveCandidatetoShape(){
        this.addShape(this.shapeCandidate);
        this.clearShapeCandidate();
    }

    getShapeAndVertexClicked(){
        let idx = this.Shapes.length-1;
        while (idx >= 0 ){
            let vertexIdx = this.Shapes[idx].getVertexClicked();
            if (vertexIdx != -1){
                return {shapeClicked: this.Shapes[idx], vertexIdx: vertexIdx}
            }
            idx--;
        }
        return {shapeClicked: null, vertexIdx: -1}
    }

    pointToSquare(point) {
        const square = new Square();
        let p1 = new Point(point[0], point[1]);
        let p2 = new Point(point[2], point[3]);
        let p3 = new Point(point[4], point[5]);
        let p4 = new Point(point[6], point[7]);
        // console.log("square p1: ", p1);
        square.setPoints(p1, p2, p3, p4);
        return square;
    }
        
}

export default Drawer;