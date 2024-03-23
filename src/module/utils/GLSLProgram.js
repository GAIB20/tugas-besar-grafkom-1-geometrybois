import createFragmentShader from "../shader/fragmentShader";
import createVertexShader from "../shader/vertexShader";

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
    createProgram(gl) {
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
    static getGLFromidCanvas(id) {
        const canvas = document.getElementById(id);
        const gl = canvas.getContext("webgl");
        
        if (!gl) {
            console.error('WebGL is not available.');
            return null;
        }
        
        return gl;
    }

    /** 
     * Resize a canvas element to the display size.
     * @param {HTMLCanvasElement} canvas - The canvas element to resize.
     * @returns {void}
    */
    static resizeCanvasToDisplaySize(canvas) {
        
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            this.gl.canvas.width = displayWidth;
            this.gl.canvas.height = displayHeight;
        }
    }
      
}

export default GLSLProgram;