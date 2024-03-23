"use strict";

import Garis from "../models/garis.js";
import Polygon from "../models/polygon.js";
import createFragmentShader from "../shader/fragmentShader.js";
import createVertexShader from "../shader/vertexShader.js";

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

        let vertexShader = createVertexShader(this.#gl);
        let fragmentShader =createFragmentShader(this.#gl);

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