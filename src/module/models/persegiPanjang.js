"use strict";
import Drawable from "./drawable.js";

class Rectangle extends Drawable {
    static counter = 0;
    constructor(gl, program) {
        super(gl, program)
        this._id = "rectangle#"+Rectangle.counter;
        Rectangle.counter+=1;
    }
}

export default Rectangle;