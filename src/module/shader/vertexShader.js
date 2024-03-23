
function createVertexShader(gl) {
    const vertexShaderSource =`
        // an attribute will receive data from a buffer
        attribute vec2 a_position;
        attribute vec4 a_color;
        varying vec4 v_color;
        
        // all shaders have a main function
        void main() {
        
            // gl_Position is a special variable a vertex shader
            // is responsible for setting
            gl_Position = vec4(a_position,0,1);
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


