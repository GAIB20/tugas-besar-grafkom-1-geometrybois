let isCanvasAdded = false;

document.getElementById("garis").addEventListener("click", () => {
    if (!isCanvasAdded) {
        const canvasGaris = document.createElement("canvas-garis");
        document.querySelector(".canvas-container").appendChild(canvasGaris);
        isCanvasAdded = true;
    } else {
        const canvasGaris = document.querySelector("canvas-garis");
        document.querySelector(".canvas-container").removeChild(canvasGaris);
        isCanvasAdded = false;
    }
});

function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
