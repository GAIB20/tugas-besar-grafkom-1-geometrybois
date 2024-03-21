"use strict";


class CanvasGaris extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        let canvas = document.createElement("canvas");
        canvas.id = "garis-glCanvas";
        canvas.style.display = "block";
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.width = "400px";
        canvas.style.height = "400px";
        canvas.style.border = "1px solid black";
        var gl = canvas.getContext("webgl");

        if (!gl) {
            console.log("WebGL not supported");
            return;
        }

        this.shadowRoot.appendChild(canvas);

        const vertex_shader_2d = `
        // sebuah atribut akan menerima data dari buffer
        attribute vec2 a_position;
 
        uniform vec2 u_resolution;

        // semua shader punya fungsi utama (main)
        void main() {
            // gl_Position merupakan variabel spesial yang harus diatur oleh vertex shader
            // (anggap saja sebagai return result koordinat clip space)
            // convert the position from pixels to 0.0 to 1.0
            vec2 zeroToOne = a_position / u_resolution;
         
            // convert from 0->1 to 0->2
            vec2 zeroToTwo = zeroToOne * 2.0;
         
            // convert from 0->2 to -1->+1 (clip space)
            vec2 clipSpace = zeroToTwo - 1.0;
         
            gl_Position = vec4(clipSpace, 0, 1);

            // vec4 b = vec4(x,y,z,w);
            // b.x -> x
            // b.xx -> vec2(x,y)
            // b.xyz -> vec3(x,y,z)
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

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

        // set the resolution
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

        let positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // three 2d points
        var positions = [
            10, 20,
            80, 20,
            10, 30,
            10, 30,
            80, 20,
            80, 30,
          ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        
        gl.enableVertexAttribArray(positionAttributeLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);



        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

        // draw
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);


        const canvasToDisplaySizeMap = new Map([[canvas, [400, 400]]]);

        function resizeCanvasToDisplaySize(canvas) {
            // Get the size the browser is displaying the canvas in device pixels.
            const [displayWidth, displayHeight] = canvasToDisplaySizeMap.get(canvas);

            // Check if the canvas is not the same size.
            const needResize = canvas.width !== displayWidth ||
                canvas.height !== displayHeight;

            if (needResize) {
                // Make the canvas the same size
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }

            return needResize;
        }

        function onResize(entries) {
            for (const entry of entries) {
                let width;
                let height;
                let dpr = window.devicePixelRatio;
                if (entry.devicePixelContentBoxSize) {
                    // NOTE: Only this path gives the correct answer
                    // The other 2 paths are an imperfect fallback
                    // for browsers that don't provide anyway to do this
                    width = entry.devicePixelContentBoxSize[0].inlineSize;
                    height = entry.devicePixelContentBoxSize[0].blockSize;
                    dpr = 1; // it's already in width and height
                } else if (entry.contentBoxSize) {
                    if (entry.contentBoxSize[0]) {
                        width = entry.contentBoxSize[0].inlineSize;
                        height = entry.contentBoxSize[0].blockSize;
                    } else {
                        // legacy
                        width = entry.contentBoxSize.inlineSize;
                        height = entry.contentBoxSize.blockSize;
                    }
                } else {
                    // legacy
                    width = entry.contentRect.width;
                    height = entry.contentRect.height;
                }
                const displayWidth = Math.round(width * dpr);
                const displayHeight = Math.round(height * dpr);
                canvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight]);
            }
        }

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(canvas, { box: 'content-box' });

    
        // resizeCanvasToDisplaySize(gl.canvas);
    }
}

customElements.define("canvas-garis", CanvasGaris);