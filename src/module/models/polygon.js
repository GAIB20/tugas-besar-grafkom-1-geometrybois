"use strict";
import Drawable from "./drawable.js";

class Polygon extends Drawable{
    static counter = 0;
    constructor(gl, program, vertexCount, count, type="Polygon"){
        super(gl,program, vertexCount, count, type);
        this._id = "polygon#"+Polygon.counter;
        Polygon.counter+=1;
    }
}

export default Polygon;