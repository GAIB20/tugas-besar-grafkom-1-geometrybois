"use strict"

class DrawingInfo{
    drawingObject;
    color;
    maxVertex;
    vertexCount;
    constructor(drawingObject, color, maxVertex=null, vertexCount=null){
        this.drawingObject = drawingObject;
        this.color = color;
        this.maxVertex = maxVertex;
        this.vertexCount = vertexCount;
    }

    render(parentElement){
        parentElement.innerHTML = `
        <div class="right-panel-info">
            <h2>Drawing ${this.drawingObject}</h2>
            <div>
                <label for="color-picker">Color: </label>
                <input type="color" id="color-picker" name="colorPicker" />
            </div>

            ${
                this.drawingObject === "Polygon" ? 
                `<div>
                    <label for="">Max Vertex: </label>
                    <input type="number" id="max-vertex" name="maxVertex">
                </div>
                <div>
                    <span>Vertex Count: </span>
                    <span id="Vertex Count"> 5 </span>
                </div>
                </div>`
                :
                `</div>`
            } `        
    }
}

export default DrawingInfo
