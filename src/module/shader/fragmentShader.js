function createFragmentShader(gl) {
    // Create the fragment shader source code
    const fragmentShaderSource = `
        precision mediump float;

        varying vec4 v_color;
        
        void main() {
        gl_FragColor = v_color;
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

