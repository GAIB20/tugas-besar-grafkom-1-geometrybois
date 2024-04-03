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
     * @description vertex index being clicked
     */
    vertexIdx;
}

export default ClickedShapeInfo;
