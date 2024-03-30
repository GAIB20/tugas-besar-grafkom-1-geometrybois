"use strict";
import Shape from "../models/shape.js";
import BufferType from "../type/bufferType.js";


class GLDrawing {
    /**
     * @type {WebGLRenderingContext}
     * @private
     */
    #gl;
    /**
     * @type {WebGLProgram}
     * @private
     */
    #program;
    /**
     * @type {WebGLat}
     */
    #positionAttributeLocation;
    #colorAttributeLocation;
    #matrixUniformLocation;

    constructor(gl, program) {
        this.#gl = gl;
        this.#program = program;
        this.#positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        this.#colorAttributeLocation = gl.getAttribLocation(program, "a_color");
        this.#matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");

        this.positionBuffer = gl.createBuffer();
        this.colorBuffer = gl.createBuffer();
    }

    /**
     * Draw a shape on the canvas
     * @param {WebGLRenderingContext} gl WebGL context
     * @param {WebGLProgram} program WebGL program
     * @param {WebGLBuffer} positionBuffer WebGL buffer for position
     * @param {WebGLBuffer} colorBuffer WebGL buffer for color
     * @param {Shape} Shape Shape to draw
     */
    drawShape(Shape) {

        this.#gl.useProgram(this.#program);

        /* Setup Position Attribute */
        Shape.setupBuffer(
            this.#gl, this.positionBuffer, this.#positionAttributeLocation,
            BufferType.POSITION,
            2,
            this.#gl.FLOAT,
            false,
            0,
            0
        );

        /* Setup Color Attribute */
        Shape.setupBuffer(
            this.#gl, this.colorBuffer, this.#colorAttributeLocation,
            BufferType.COLOR,
            4,
            this.#gl.FLOAT,
            false,
            0,
            0
        );

        /* Setup Matrix Uniform */
        const matrix = Shape.getTransformationMatrix(this.#gl.canvas.width, this.#gl.canvas.height);
        
        console.log("matrix: ", matrix)

        this.#gl.uniformMatrix3fv(this.#matrixUniformLocation, false, matrix);

        /* Draw Scene */
        const primitiveType = Shape.drawArraysMode(this.#gl)
        const offset = 0;
        const count = Shape.drawArraysCount(this.#gl);
        this.#gl.drawArrays(primitiveType, offset, count);
    }

    clear() {
        this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);
    }
}

export default GLDrawing;

/* 
For each thing you want to draw
call gl.useProgram for the program needed to draw.
setup attributes for the thing you want to draw
for each attribute call gl.bindBuffer, gl.vertexAttribPointer, gl.enableVertexAttribArray
setup uniforms for the thing you want to draw
call gl.uniformXXX for each uniform
call gl.activeTexture and gl.bindTexture to assign textures to texture units.
call gl.drawArrays or gl.drawElements
*/