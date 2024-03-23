/**
 * GLSL Location Type
 * @class data structure for GLSL
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 */
class GLSLLocationType {
    #gl; #program;

    constructor(gl, program) {
        this.#gl = gl;
        this.a_position = this.#gl.getAttribLocation(this.#program, "a_position");
        this.a_color = this.#gl.getAttribLocation(this.#program, "a_color");
        this.u_matrix = this.#gl.getUniformLocation(this.#program, "u_matrix");
        this.v_color = this.#gl.getUniformLocation(this.#program, "v_color");
    }
}