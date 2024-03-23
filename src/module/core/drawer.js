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

class Drawer {
    #program;
    #gl;
    #resolutionUniformLocation;
    models;

    constructor(){
        let canvas = document.querySelector("#glcanvas")
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
        var leftPanelWidth = (document.querySelector('.left-panel')).offsetWidth;
        var rightPanelWidth = (document.querySelector('.right-panel')).offsetWidth;
        // var headerHight = (document.querySelector("header h1")).offsetWidth;
        
        console.log(`window: ${window.innerWidth}, ${window.innerHeight}`);
        this.#gl.canvas.width = this.#gl.canvas.clientWidth - leftPanelWidth - rightPanelWidth;
        this.#gl.canvas.height = this.#gl.canvas.clientHeight;
        this.#gl.viewport(leftPanelWidth,0, this.#gl.canvas.width, this.#gl.canvas.height);        
        this.#gl.clearColor(1,1,1,1);
        this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);
        
        
        // use program : only once for one shader program
        this.#gl.useProgram(this.#program);

        // Setup the resolution
        this.#resolutionUniformLocation = this.#gl.getUniformLocation(this.#program, "u_resolution");
        this.#gl.uniform2f(this.#resolutionUniformLocation, this.#gl.canvas.width, this.#gl.canvas.height);
        
        console.log(`canvas width: ${this.#gl.canvas.width} height: ${this.#gl.canvas.height}`);

        // Empty models
        this.models = [];
    }

    addModel(modelType) {
        if (modelType == "Garis") {
            let garis = new Garis(this.#gl, this.#program);
            garis.setPositions = [
                1000, 400,
                1000, 0,
                0, 0,
            ];
            garis.setColors = [
                1, 0, 0.5, 1,
                1, 0, 0.5, 1,
                1, 0, 0.5, 1,
            ];
            garis.drawSetup();
            garis.draw();
            this.models.push(garis);
            console.log("draw garis");
        } else if (modelType == "Polygon") {
            let poligon = new Polygon(this.#gl, this.#program);
            poligon.setPositions = [0, 0, 0, 0.5, 0.7, 0];
            poligon.setColors = [1, 0, 0.5, 1, 1, 0, 0.5, 1, 1, 0, 0.5, 1];
            poligon.drawSetup();
            poligon.draw();
            this.models.push(poligon);
            console.log("draw poligon");
        } else if (modelType == "Rectangle") {
            let rectangle = new Rectangle(this.#gl, this.#program);
            var r1 = Math.random();
            var b1 = Math.random();
            var g1 = Math.random();
            rectangle.setPositions = [
                -150, -100, 150, -100, -150, 100, 150, -100, -150, 100, 150, 100,
            ];
            rectangle.setColors = [
                r1, b1, g1, 1,
                r1, b1, g1, 1,
                r1, b1, g1, 1,
                r1, b1, g1, 1,
                r1, b1, g1, 1,
                r1, b1, g1, 1,
            ];
            rectangle.drawSetup();
            rectangle.draw();
            this.models.push(rectangle);
            console.log("draw rectangle");
        }
        this.drawModels();
    }

    drawModels() {
        this.models.forEach((model) => {
            model.draw();
            console.log("draw model");
        });
    }
}

export default Drawer;
