
function createVertexShader(gl) {
    const vertexShaderSource =`
        // an attribute will receive data from a buffer
        attribute vec2 a_position;
        uniform vec2 u_resolution;

        uniform mat3 u_matrix;

        // Color attribute
        attribute vec4 a_color;
        varying vec4 v_color;
        
        // all shaders have a main function
        void main() {
            // Multiply the position by the transformation matrix.
            vec2 position = (u_matrix * vec3(a_position, 1)).xy;

            // convert the position from pixels to clipspace (-1, +1)
            vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;
            
            // gl_Position is a special global variable a vertex shader
            // WebGL considers positive Y as up and negative Y as down. In clip space the bottom left corner -1,-1. We haven't changed any signs so with our current math 0, 0 becomes the bottom left corner.
            gl_Position = vec4(clipSpace * vec2(1,-1) ,0,1);
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


