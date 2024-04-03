"use strict"

// import Garis from "../models/garis3.js"
import GLSLProgram from "../utils/GLSLProgram.js"
import GLDrawing from "./GLDrawing.js"

import ShapeTypes from "../type/shapeTypes.js"

import Shape from "../models/shape.js"
import Garis from "../models/garis.js"
import Polygon from "../models/polygon.js"
import Rectangle from "../models/persegiPanjang.js"


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

    drawOneShape(shape) {
        this.glDrawing.drawShape(shape);
        console.log(shape);
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

    startDrawShape(shapeType, mousePosition) {
        let shape = null;
        switch (shapeType) {
            case ShapeTypes.GARIS:
                shape = new Garis();
                break;
            case ShapeTypes.POLYGON:
                shape = new Polygon()
                break;
            case ShapeTypes.RECTANGLE:
                shape = new Rectangle();
                break;
            default:
                console.error(`ShapeType ${shapeType} is not recognized`);
                return;
        }

        this.addShape(shape);
        this.glDrawing.drawShape(shape);
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
                shape = new Rectangle();
                break;
            default:
                console.error(`ShapeType ${shapeType} is not recognized`);
                return;
        }
        
        this.shapeCandidate = shape;
    }

    drawShapeCandidate(){
        this.drawOneShape(this.shapeCandidate);
    }

    clearShapeCandidate(){
        this.shapeCandidate = null
    }
        
}

export default Drawer;