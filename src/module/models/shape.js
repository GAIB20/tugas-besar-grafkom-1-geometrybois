import Node2 from "./node2.js";
import Vector2 from "../utils/Vector2.js";
import Transform2 from "../utils/transform2.js";

import ShapeTypes from "../type/shapeTypes.js";
import BufferType from "../type/bufferType.js";

/**
 * @class Shape
 * @extends Node2
 * @property {ShapeTypes} #shapeType The type of the shape
 * @property {Vector2} position The position of the shape in (x, y) coordinate
 * @property {Vector2} scale The scale of the shape in (x, y) coordinate
 * @property {number} rotation The rotation of the shape in radian unit (0 - 2 * PI)
 * @property {number} rotationDegree The rotation of the shape in degree unit (0 - 360)
 * @property {number} shear The shear of the shape in degree unit (0 - 360)
 * @property {Transform2} transform The transformation matrix of the shape
 */
class Shape extends Node2 {
    /**
     * @type {ShapeTypes}
     */
    shapeType;

    /**
     * @type {Vector2}
     * @description The position of the shape in (x, y) coordinate
     * @default (0,0)
     * @example new Vector2(0, 0)
     */
    position;

    /**
     * @type {Vector2}
     * @description 
     * The origin vector represent the center of the shape for translation.
     * relative to the position of the shape in canvas 
     * @default (0,0)
     */
    originTranslation;

    /**
     * @type {Vector2}
     * @description The scale of the shape in (x, y) coordinate
     * @default (1,1)
     */
    scale;

    /**
     * @type {number}
     * @default 0
     * @description The rotation of the shape in radian unit (0 - 2 * PI)
     */
    rotation;

    /**
     * @type {number}
     * @default 0
     * @description The rotation of the shape in degree unit (0 - 360)
     */
    rotationDegree;

    /**
     * @type {number}
     * @default 0
     * @description The shear X axis of the shape in degree unit (0 - 360)
     */
    shear;

    /**
     * @type {formed}
     * @default 0
     * @description Determine if the shape is fully formed or not
     */
    formed;

    constructor(id, name, shapeType) {
        super(id, name);
        this.shapeType = shapeType;
        this.position = new Vector2(0, 0);
        this.originTranslation = new Vector2(0, 0);
        this.scale = new Vector2(1, 1);
        this.rotation = 0;
        this.rotationDegree = 0;
        this.shear = 0;
        this.formed = false;
    }

    /* Must be implemented in the derived class */
    // TODO: implement this method in the derived class
    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @returns {GLenum} WebGL draw arrays mode
     * @description The type of the prmitive shape to be drawn
     */
    drawArraysMode(gl) { console.error(`drawArraysMode in class Shape is not implemented in class ${this.constructor.name}`); }
    /**
     * 
     * @param {WebGLRenderingContext} gl
     * @returns {GLsizei}  WebGL draw arrays count
     * @description The number of elements to be rendered
     */
    drawArraysCount(gl) { console.error(`drawArraysCount in class Shape is not implemented in class ${this.constructor.name}`); }
    /**
     * @abstract
     * @returns {Float32Array} Position buffer
    */
    getPositionBuffer() { console.error(`getPositionBuffer in class Shape is not implemented in class ${this.constructor.name}`); }
    /**
     * @abstract
     * @returns {Float32Array} Color buffer
    */
    getColorBuffer() { console.error(`getColorBuffer in class Shape is not implemented in class ${this.constructor.name}`); }
    /* ======================================== */

    getTransformationMatrix(width, height) {
        return Transform2.general(
            width, height,
            this.originTranslation.x, this.originTranslation.y,
            this.rotation,
            this.scale.x, this.scale.y,
            this.shear
        );
    }

    /**
     * Setup buffer for the shape
     * @param {WebGLRenderingContext} gl WebGL context
     * @param {WebGLBuffer} buffer WebGL buffer
     * @param {GLuint} AttributeLocation Index attribute location
     * @param {number} size Size of the buffer
     * @param {number} type Type of the buffer
     * @param {boolean} normalize Normalize the buffer
     * @param {number} stride Stride of the buffer
     * @param {number} offset Offset of the buffer
     * @param {BufferType} bufferType Type of the buffer
     */
    setupBuffer(
        gl, buffer, AttributeLocation,
        bufferType,
        size,
        type,
        normalize,
        stride,
        offset
    ) {
        let bufferData = null;
        switch (bufferType) {
            case BufferType.POSITION:
                bufferData = this.getPositionBuffer();
                break;
            case BufferType.COLOR:
                bufferData = this.getColorBuffer();
                break;
            default:
                console.error(`BufferType ${bufferType} is not recognize`);
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            bufferData,
            gl.STATIC_DRAW

        )

        gl.enableVertexAttribArray(AttributeLocation);

        gl.vertexAttribPointer(AttributeLocation, size, type, normalize, stride, offset);

        this.formed = true;
    }


}

export default Shape;