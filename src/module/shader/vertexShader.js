
function createVertexShader(gl) {
    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec4 a_color;
        
        uniform mat3 u_matrix;
        
        varying vec4 v_color;
        
        void main() {
        // Multiply the position by the matrix.
        gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
        
        // Copy the color from the attribute to the varying.
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


