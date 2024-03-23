function createFragmentShader(gl) {
    // Create the fragment shader source code
    const fragmentShaderSource = `
        // fragment shader tidak punya default precision, jadi kita harus memilihnya.
        // mediump merupakan default bagus yang berarti "medium precision".
        // selain itu juga ada highp (high precision) dan lowp (low precision).
        precision mediump float;
        varying vec4 v_color;
        void main() {
            // gl_FragColor merupakan variabel spesial yang harus diatur
            // oleh fragment shader (anggap saja sebagai return warna)
            // gl_FragColor = v_color; // Set agar warna mengikuti varying
            gl_FragColor = vec4(1, 0, 0.5, 1);
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

