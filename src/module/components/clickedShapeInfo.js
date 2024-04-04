"use strict"
import Shape from "../models/shape.js";
import Drawer from "../core/drawer.js";
import ShapeTypes from "../type/shapeTypes.js";
import Color from "../utils/color.js";

class ClickedShapeInfo{
    /**
     * @type {Drawer}
     * @description drawer
    */ 
    drawer;

    /**
     * @type {Shape}
     * @description shape being edited
    */    
    shape;

    /**
     * @type {number}
     * @description index vertex clicked
     */
    vertexIdx;

    /**
     * @type {string}
     * @description Color of shape being drawn in hex(?)
    */    
    color;
    
    /**
     * @type {number}
     * @description Max vertex of shape being drawn
     */    
    maxVertex;

    /**
     * @type {number}
     * @description Num vertex of shape being drawn
     */    
    vertexCount;
    
    constructor(drawer){
        this.shape = null;
        this.color = null;
        this.maxVertex = null;
        this.vertexCount = null;
        this.drawer = drawer;
    }

    setInfo(shape, vertexIdx, color){
        this.shape = shape;
        this.vertexIdx = vertexIdx;
        this.color = color;

        if ( /^polygon/.test(this.shape.id)){
            this.maxVertex = this.shape.drawArraysCount();
            this.vertexCount = this.maxVertex;
        }
    }

    setMaxVertex(maxVertex){
        this.maxVertex = maxVertex;
    }

    getMaxVertex(){
        const maxVertexInput = document.getElementById('max-vertex');
        return maxVertexInput.value;
    }

    updateVertexCount(vertexCount){
        this.vertexCount = vertexCount;
    }

    // Listener handler function
    #handleModelColorPicker(color){
        // Set semua point yang ada untuk memiliki warna color
        let rgbaVal = Color.hexToRgba(color, 1);
        this.shape.setColor(new Color(rgbaVal.r, rgbaVal.g, rgbaVal.b, rgbaVal.a));
        this.drawer.drawAllShapes();
    }

    #handleMaxVertexInput(maxVertex){
        // Update max vertex
        this.maxVertex = maxVertex;
        this.drawer.drawAllShapes();
    }

    #handleTranslationXInput(translationX){
        // Update Origin Translation X-axis
        this.shape.originTranslation.x = translationX;
        this.shape.translateXVertices(translationX);
        console.log(this.drawer);
        this.drawer.drawAllShapes();
    }

    #handleTranslationYInput(translationY){
        // Update Origin Translation y-axis
        this.shape.originTranslation.y = translationY;
        this.shape.translateYVertices(translationY);
        this.drawer.drawAllShapes();
    }
    
    #handleRotationInput(rotationDegree){
        // Update rotation Degree
        this.shape.rotationDegree = rotationDegree;
        this.drawer.drawAllShapes();
    }
    
    #handleDilationXInput(dilationX){
        // Update Scale X-axis
        this.shape.scale.x = dilationX;
        this.drawer.drawAllShapes();
    }

    #handleDilationYInput(dilationY){
        // Update Scale y-axis
        this.shape.scale.y = dilationY;
        this.drawer.drawAllShapes();
    }
    
    #handleVertexColorPicker(color){
        // Set point yang diklik untuk memiliki warna color
        let rgbaVal = Color.hexToRgba(color, 1);
        this.shape.setVertexColor(this.vertexIdx, new Color(rgbaVal.r, rgbaVal.g, rgbaVal.b, rgbaVal.a));
        this.drawer.drawAllShapes();
    }

    #handleDeletePoint(vertexIdx){
        if (vertexIdx == this.vertexIdx){
            this.vertexIdx = 0;
        } 
        
    }


    render(parentElement){
        
        parentElement.innerHTML = `
        <div class="right-panel-info">
            <h2>Editing ${this.shape.id}</h2>
            
            <div> 
                <h3> Model Properties </h3>
                <div>
                    <label for="color-picker">Color: </label>
                    <input type="color" id="color-picker" name="colorPicker" />
                </div>
            
                ${
                        /^polygon/.test(this.shape.id) ? 
                    `<div>
                        <label for="">Max Vertex: </label>
                        <input type="number" id="max-vertex" name="maxVertex" min="${Math.max(3, this.shape.drawArraysCount())}" 
                        value="${this.maxVertex}" >
                    </div>
                    <div>
                        <span>Vertex Count: </span>
                        <span id="Vertex Count"> ${this.vertexCount} </span>
                    </div>
                    `
                    :
                    `<div></div>`
                }   
            
            </div>
            <div class="geometry-transformation">
                <h3> Model Transformation </h3>
                <div class="translation">
                    <p>Translation</p>
                    <div>
                        <label for="translationX">X:</label>
                        <input type="number" id="translationXInput" name="translationXInput" value="${this.shape.originTranslation.x}">
                    </div>
                    <div>
                        <label for="translationY">Y:</label>
                        <input type="number" id="translationYInput" name="translationYInput" value="${this.shape.originTranslation.y}">
                    </div>
                </div>

                <div class="rotation">
                    <label for="translationY">Rotation: </label>
                    <input type="number" id="rotationInput" name="rotationInput" value="${this.shape.rotationDegree}">
                </div>

                <div class="dilation">
                    <p>Dilation</p>
                    <div>
                        <label for="dilationX">X:</label>
                        <input type="number" id="dilationXInput" name="dilationXInput" value="${this.shape.scale.x}">
                    </div>
                    <div>
                        <label for="dilationY">Y:</label>
                        <input type="number" id="dilationYInput" name="dilationYInput" value="${this.shape.scale.y}">
                    </div>
                    </div>
            </div>   
            
            ${
                this.vertexIdx!=null ? `
                    <h3> Point Properties </h3>
                    <div>
                        <div> 
                            <span>Index: </span>
                            <span id="positionX" class="right-panel-attribute"> ${this.vertexIdx} </span>
                        </div>
                        <p>Position</p>
                        <div> 
                            <span>X: </span>
                            <span id="positionX" class="right-panel-attribute"> ${this.shape.vertices[this.vertexIdx].x} </span>
                        </div>
                        <div> 
                            <span>Y: </span>
                            <span id="positionY" class="right-panel-attribute"> ${this.shape.vertices[this.vertexIdx].y} </span>
                        </div>
                    </div>
                    <div>
                        <label for="color-picker-point">Color: </label>
                        <input type="color" id="color-picker-point" name="colorPickerPoint" value="${this.shape.vertices[this.vertexIdx].color.getHexRepresentation()}"/>
                    </div>

                    ${
                        /^polygon/.test(this.shape.id) ? 
                        `
                        <h3> Delete Point </h3>
                        <div>
                            <label for="">Index</label>
                            <input type="number" id="index-point-input" name="indexPointInput" value="${this.vertexIdx}" min="0"
                                max="${this.shape.drawArraysCount()-1}">
                        </div>
                        <button id="delete-point-button">Delete Point</button>
                        </div>
                        `
                        :
                        `</div>`
                    }
                `
                :
                `</div>`
            }
            `;
            this.listen();
        }
        
    listen(){
        document.getElementById("color-picker").addEventListener("input" , (e) => {this.#handleModelColorPicker(document.getElementById("color-picker").value)})
        if (this.shape.shapeType == ShapeTypes.POLYGON) {
            document.getElementById("max-vertex").addEventListener("input" , (e) => {this.#handleMaxVertexInput(document.getElementById("max-vertex").value)})
            document.getElementById("delete-point-button").addEventListener("input" , (e) => {this.#handleDeletePoint(document.getElementById("index-point-input").value)})
        }
        document.getElementById("translationXInput").addEventListener("input" , (e) => {this.#handleTranslationXInput(document.getElementById("translationXInput").value)})
        document.getElementById("translationYInput").addEventListener("input" , (e) => {this.#handleTranslationYInput(document.getElementById("translationYInput").value)})
        document.getElementById("rotationInput").addEventListener("input" , (e) => {this.#handleRotationInput(document.getElementById("rotationInput").value)})
        document.getElementById("dilationXInput").addEventListener("input" , (e) => {this.#handleDilationXInput(document.getElementById("dilationXInput").value)})
        document.getElementById("dilationYInput").addEventListener("input" , (e) => {this.#handleDilationYInput(document.getElementById("dilationYInput").value)})
        document.getElementById("color-picker-point").addEventListener("input" , (e) => {this.#handleVertexColorPicker(document.getElementById("color-picker-point").value)})
    }
}

export default ClickedShapeInfo;
