function createFragmentShader(gl) {
    // Create the fragment shader source code
    const fragmentShaderSource = `
        // fragment shader tidak punya default precision, jadi kita harus memilihnya.
        // mediump merupakan default bagus yang berarti "medium precision".
        // selain itu juga ada highp (high precision) dan lowp (low precision).
        precision mediump float;
        varying vec4 v_color;
        void main() {
            // gl_FragColor merupakan variabel spesial yang harus diatur oleh fragment shader (anggap saja sebagai return warna)
            gl_FragColor = v_color;
            // gl_FragColor = vec4(1, 0, 0.5, 1);
        }
    `;

    // Create the fragment shader object
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Check if the shader compilation was successful
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the fragment shader:', gl.getShaderInfoLog(fragmentShader));
        return null;
    }

    return fragmentShader;
}

export default createFragmentShader;



// function createVertexShader(gl) {
//     const vertexShaderSource = `
//         // an attribute will receive data from a buffer
//         attribute vec2 a_position;
//         uniform vec2 u_resolution;

//         uniform mat3 u_matrix;

//         // Color attribute
//         attribute vec4 a_color;
//         varying vec4 v_color;
        
//         // all shaders have a main function
//         void main() {
//             /** 
//              * @description Multiply the position by the matrix uniform transformation.
//              * it is do the same as the following code:
//              * //   Multiply the position by the transformation matrix.
//              * vec2 position = (u_matrix * vec3(a_position, 1)).xy;
//              * //   convert the position from pixels to clipspace (-1, +1)
//              * vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;
//              * //   WebGL considers positive Y as up and negative Y as down. In clip space the bottom left corner -1,-1. We haven't changed any signs so with our current math 0, 0 becomes the bottom left corner.
//              * gl_Position = vec4(clipSpace * vec2(1,-1) ,0,1);
//             */

//             // gl_Position is a special global variable a vertex shader 
//             gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
//             v_color = a_color;
//         }
//     `;

//     const vertexShader = gl.createShader(gl.VERTEX_SHADER);
//     gl.shaderSource(vertexShader, vertexShaderSource);
//     gl.compileShader(vertexShader);

//     if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
//         console.error('An error occurred compiling the vertex shader:', gl.getShaderInfoLog(vertexShader));
//         return null;
//     }

//     return vertexShader;
// }

