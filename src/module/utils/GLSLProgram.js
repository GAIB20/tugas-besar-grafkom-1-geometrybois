import createFragmentShader from "../shader/fragmentShader.js";
import createVertexShader from "../shader/vertexShader.js";

/**
 * A class to represent a GLSL program.
 * @class
 * @classdesc A class to represent a GLSL program.
 * @property {WebGLRenderingContext} gl - The WebGL rendering context.
 */
class GLSLProgram {
    constructor() {
    }

    /**
     * Create a WebGL program.
     * @returns {WebGLProgram} - The WebGL program.
     * @throws {Error} - An error occurred compiling the shader.
     * @example 
     * const program = createProgram();
    */
    static createProgram(gl) {
        const program = gl.createProgram();

        gl.attachShader(program, createVertexShader(gl));
        gl.attachShader(program, createFragmentShader(gl));
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('An error occurred linking the program:', gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    /**
     * Get the WebGL context from a canvas element by its id.
     * @param {string} id - The id of the canvas element.
     * @returns {WebGLRenderingContext} - The WebGL rendering context.
     */
    static getCanvasAndGLFromidCanvas(id) {
        const canvas = document.getElementById(id);
        const gl = canvas.getContext("webgl");
        
        if (!gl) {
            console.error('WebGL is not available.');
            return null;
        }
        return [canvas, gl];
    }
}

export default GLSLProgram;