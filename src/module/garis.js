"use strict";

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
class CanvasGaris {
    constructor() {

        let canvas = document.querySelector("#glcanvas")
        canvas.height = 400;
        canvas.width = 400;
        var gl = canvas.getContext("webgl");

        if (!gl) {
            console.log("WebGL not supported");
            return;
        }

        const vertex_shader_2d = `
        // an attribute will receive data from a buffer
        attribute vec4 a_position;
        
        // all shaders have a main function
        void main() {
        
            // gl_Position is a special variable a vertex shader
            // is responsible for setting
            gl_Position = a_position;
        }
        `;

        const fragment_shader_2d = `
        // fragment shader tidak punya default precision, jadi kita harus memilihnya.
        // mediump merupakan default bagus yang berarti "medium precision".
        // selain itu juga ada highp (high precision) dan lowp (low precision).
        precision mediump float;
        
        void main() {
            // gl_FragColor merupakan variabel spesial yang harus diatur
            // oleh fragment shader (anggap saja sebagai return warna)
            gl_FragColor = vec4(1, 0, 0.5, 1); // mengembalikan warna ungu kemerahan
        }
        `;

        let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex_shader_2d);
        let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment_shader_2d);

        // setup GLSL program
        let program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        // Create a buffer and put three 2d clip space points in it
        var positionBuffer = gl.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        var positions = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        // code above this line is initialization code.
        // code below this line is rendering code.

        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset);

        // draw
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays(primitiveType, offset, count);
    }

    drawArrays() {
         // draw
         var primitiveType = gl.TRIANGLES;
         var offset = 0;
         var count = 3;
         gl.drawArrays(primitiveType, offset, count);
    }
}

export default CanvasGaris;