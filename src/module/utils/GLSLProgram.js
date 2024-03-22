import createFragmentShader from "../shader/fragmentShader";
import createVertexShader from "../shader/vertexShader";

/**
 * A class to represent a GLSL program.
 * @class
 * @classdesc A class to represent a GLSL program.
 * @property {WebGLRenderingContext} gl - The WebGL rendering context.
 * @property {WebGLProgram} program - The WebGL program.
 */
class GLSLProgram {
    constructor(gl) {
        this.gl = gl;
        this.program = this.createProgram();
    }

    createProgram() {
        const gl = this.gl;
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

    use() {
        this.gl.useProgram(this.program);
    }

    /**
     * Get the WebGL context from a canvas element by its id.
     * @param {string} id - The id of the canvas element.
     * @returns {WebGLRenderingContext} - The WebGL rendering context.
     */
    static getGLFromidCanvas(id) {
        const canvas = document.getElementById(id);
        const gl = canvas.getContext("webgl");
        
        if (!gl) {
            console.error('WebGL is not available.');
            return null;
        }
        
        return gl;
    }
}