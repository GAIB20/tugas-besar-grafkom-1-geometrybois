
function createVertexShader(gl) {
    const vertexShaderSource =`
        // an attribute will receive data from a buffer
        attribute vec2 a_position;
        attribute vec4 a_color;
        varying vec4 v_color;
        uniform vec2 u_resolution;
        
        // all shaders have a main function
        void main() {        
            // convert the position from pixels to clipspace (-1, +1)
            vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;
            // gl_Position is a special variable a vertex shader
            gl_Position = vec4(clipSpace,0,1);
            v_color = a_color;
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the vertex shader:', gl.getShaderInfoLog(vertexShader));
        return null;
    }

    return vertexShader;
}

export default createVertexShader;


