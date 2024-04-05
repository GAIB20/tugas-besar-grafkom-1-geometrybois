import Shape from "./shape.js";
import ShapeTypes from "../type/shapeTypes.js";
import Point from "../utils/point.js";
import Color from "../utils/color.js";

class Garis extends Shape {

    static counter = 0;
    constructor() {
        let idName = "line#" + Garis.counter;
        super(idName, idName, ShapeTypes.LINES);
        Garis.counter++;
    }

    /**
     * @override
     * @param {WebGLRenderingContext} gl 
     * @returns {GLenum} WebGL draw arrays mode
     * @description The type of the prmitive shape to be drawn
     */
    drawArraysMode(gl) {
        return gl.LINES;
    }

    drawArraysCount() {
        return 2;
    }

    getPositionBuffer() {
        return new Float32Array([
            this.vertices[0].x, this.vertices[0].y,
            this.vertices[1].x, this.vertices[1].y
        ]);
    }

    getColorBuffer() {
        
        return new Float32Array([
            this.vertices[0].color.r, this.vertices[0].color.g, this.vertices[0].color.b, this.vertices[0].color.a,
            this.vertices[1].color.r, this.vertices[1].color.g, this.vertices[1].color.b, this.vertices[1].color.a
        ]);
    }

    getVertexClicked(x, y) {
        for (let i = 0; i < this.vertices.length; i++) {
            if (((x >= (this.vertices[i].x - 5)) && (x <= (this.vertices[i].x +5))) && ((y >= (this.vertices[i].y-5)) && (y <= (this.vertices[i].y+5)))) {
                return i;
            }
        }
        return -1;
    }

    addStartPoint(point) {
        this.vertices[0] = point;
        this.vertices[1] = point;
    }

    updateLastPoint(point) {
        this.vertices[1] = point;
    }

    static generateShapeFromObject(object) {
        let garis = new Garis();
        garis.angle = object.angle;
        garis.formed = object.formed;
        garis.originTranslation = object.originTranslation;
        garis.position = object.position;
        garis.rotation = object.rotation;
        garis.rotationDegree = object.rotationDegree;
        garis.scale = object.scale;
        garis.shapeType = object.shapeType;
        garis.shear = object.shear;

        garis.setPoints([new Point(object.vertices[0].x, object.vertices[0].y), new Point(object.vertices[1].x, object.vertices[1].y)]);
        return garis;
    }

}

export default Garis;