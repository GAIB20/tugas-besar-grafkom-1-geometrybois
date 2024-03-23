"use strict";
import Drawable from "./drawable.js";

class Garis extends Drawable{
    static counter = 0;
    constructor(gl, program, vertexCount = 1, count = 3, type = "Line"){
        super(gl,program, vertexCount, count, type);
        this._id = "garis#"+Garis.counter;
        Garis.counter+=1;
    }
}

export default Garis;