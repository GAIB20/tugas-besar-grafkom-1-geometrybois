"use strict";
import Drawable from "./drawable.js";

class Rectangle extends Drawable {
    static counter = 0;
    constructor(gl, program, vertexCount = 4, count = 6, type = "Rectangle") {
        super(gl, program, vertexCount, count, type)
        this._id = "rectangle#"+Rectangle.counter;
        Rectangle.counter+=1;
    }
}

export default Rectangle;