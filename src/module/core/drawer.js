"use strict";

import Garis from "../models/garis.js";
import Polygon from "../models/polygon.js";

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

class Drawer{
    #program;
    #gl;
    models;

    constructor(){
        let canvas = document.querySelector("#glcanvas")
        canvas.height = 100;
        canvas.width = 100;
        this.#gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
        
        if (!this.#gl) {
            console.log("WebGL not supported");
            return;
        }
        
        const vertex_shader_2d = `
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
        
        const fragment_shader_2d = `
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
        // let vertexShader = createVertexShader(gl);
        // let fragmentShader = createFragmentShader(gl);
        let vertexShader = createShader(this.#gl, this.#gl.VERTEX_SHADER, vertex_shader_2d);
        let fragmentShader = createShader(this.#gl, this.#gl.FRAGMENT_SHADER, fragment_shader_2d);

        // setup GLSL program
        this.#program = createProgram(this.#gl, vertexShader, fragmentShader);

        // Setup Canvas
        this.#gl.canvas.width = this.#gl.canvas.clientWidth;
        this.#gl.canvas.height = this.#gl.canvas.clientHeight;
        this.#gl.viewport(0,0, this.#gl.canvas.width, this.#gl.canvas.height);
        
        this.#gl.clearColor(1,1,1,1);
        this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);
        
        // use program : only once for one shader program
        this.#gl.useProgram(this.#program);

        // Empty models
        this.models = [];
    }

    addModel(modelType){
        if (modelType == "Garis"){
            let garis = new Garis(this.#gl, this.#program);
            garis.setPositions = [
                0, 0,
                0, -0.5,
                -0.7, 0,
            ];
            garis.setColors = [
                1, 0, 0.5, 1,
                1, 0, 0.5, 1,
                1, 0, 0.5, 1,
            ];
            garis.drawSetup();
            garis.draw();
            this.models.push(garis);
            console.log('draw garis');
        } else if (modelType=="Polygon"){
            let poligon = new Polygon(this.#gl, this.#program);
            poligon.setPositions = [
                0, 0,
                0, 0.5,
                0.7, 0,
            ];
            poligon.setColors = [
                1, 0, 0.5, 1,
                1, 0, 0.5, 1,
                1, 0, 0.5, 1,
            ];
            poligon.drawSetup();
            poligon.draw();
            this.models.push(poligon);
            console.log('draw poligon');            
        }
        this.drawModels();
    }

    drawModels(){
        this.models.forEach( (model) => {
            model.draw();
            console.log("draw model")
        })
    }
}

export default Drawer;