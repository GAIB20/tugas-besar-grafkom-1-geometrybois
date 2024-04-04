"use strict"
import Shape from "../models/shape.js";

class ClickedShapeInfo{
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
    

    setInfo(shape, vertexIdx, color){
        this.shape = shape;
        this.vertexIdx = vertexIdx;
        this.color = color;

        if ( /^polygon/.test(this.shape.id)){
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
                        <input type="number" id="max-vertex" name="maxVertex" min="${Math.max(3, this.shape.drawArraysCount())}" value="${this.maxVertex}">
                    </div>
                    <div>
                        <span>Vertex Count: </span>
                        <span id="Vertex Count"> ${this.shape.drawArraysCount()} </span>
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
                        <input type="color" id="color-picker-point" name="colorPickerPoint" />
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
                        <button>Delete Point</button>
                        `
                        :
                        `<div> </div>`
                    }
                `
                :
                `<div> </div>`
            }
            `   
    }
}

export default ClickedShapeInfo;