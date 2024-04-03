"use strict"
import ShapeTypes from "../type/shapeTypes.js";

class DrawingInfo{
    /**
     * @type {ShapeTypes}
     * @description Type of shape being drawn
    */    
    shapeType;
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

    constructor(){
        this.drawingObject = null;
        this.color = null;
        this.maxVertex = null;
        this.vertexCount = null;
    }

    setInfo(shapeType, color){
        this.shapeType = shapeType;
        this.color = color;

        if (shapeType == "polygon"){
            this.maxVertex = 3;
            this.vertexCount = 0;
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

    render(parentElement){
        parentElement.innerHTML = `
        <div class="right-panel-info">
            <h2>Drawing ${this.shapeType}</h2>
            <div>
                <label for="color-picker">Color: </label>
                <input type="color" id="color-picker" name="colorPicker" />
            </div>

            ${
                this.shapeType === "polygon" ? 
                `<div>
                    <label for="">Max Vertex: </label>
                    <input type="number" id="max-vertex" name="maxVertex" min="${Math.max(3, this.vertexCount+1)}" value="${this.maxVertex}">
                </div>
                <div>
                    <span>Vertex Count: </span>
                    <span id="Vertex Count"> ${this.vertexCount} </span>
                </div>
                </div>`
                :
                `</div>`
            } `        
    }
}

export default DrawingInfo
