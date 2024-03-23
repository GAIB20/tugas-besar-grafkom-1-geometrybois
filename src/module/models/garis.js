"use strict";
import Drawable from "./drawable.js";

class Garis extends Drawable{
    static counter = 0;
    constructor(gl, program){
        super(gl,program);
        this._id = "garis#"+Garis.counter;
        Garis.counter+=1;
    }
}

export default Garis;