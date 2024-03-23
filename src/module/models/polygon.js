"use strict";
import Drawable from "./drawable.js";

class Polygon extends Drawable{
    static counter = 0;
    constructor(gl, program){
        super(gl,program);
        this._id = "polygon#"+Polygon.counter;
        Polygon.counter+=1;
    }
}

export default Polygon;