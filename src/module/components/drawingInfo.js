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
}

export default DrawingInfo
