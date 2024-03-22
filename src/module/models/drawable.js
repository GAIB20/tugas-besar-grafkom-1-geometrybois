"use strict";

class Drawable {
    // Attributes
    #gl;
    #program;
    #positionAttributeLocation;
    #positionBuffer;
    #positions;
    #size;          // 2 components per iteration
    #type;   // the data is 32bit floats
    #normalize; // don't normalize the data
    #stride;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    #offset;        // start at the beginning of the buffer
    #primitiveType;
    #drawOffset;
    #count;


    // Constructor
    constructor(gl, program){
        // Set gl and program
        this.#gl = gl;
        this.#program = program;

        this.#gl.useProgram(this.#program);
        // look up where the vertex data needs to go.
        this.#positionAttributeLocation = this.#gl.getAttribLocation(program, "a_position");
        
        // Create a buffer and put three 2d clip space points in it
        this.#positionBuffer = this.#gl.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#positionBuffer);
        
        // Initialize the properties for rendering
        this.setVertexAttribPointer();
        this.setDrawAttributes();

    }

    // Setter
    set setPositions(positions){
        this.#positions = positions;
    }

    // Getter
    get getPositions(){
        return this.#positions;
    }

    // Private Methods
    #resizeCanvasToDisplaySize(){
        this.#gl.canvas.width = this.#gl.canvas.clientWidth;
        this.#gl.canvas.height = this.#gl.canvas.clientHeight;
        this.#gl.viewport(0,0, this.#gl.canvas.width, this.#gl.canvas.height);
    }

    #clearCanvas(){
        this.#gl.clearColor(0,0,0,0);
        this.#gl.clear(this.#gl.COLOR_BUFFER_BIT);
    }

    
    // Public Methods
    setVertexAttribPointer(size = 2, type = this.#gl.FLOAT, normalize = false, stride=0, offset=0){
        this.#size = size;
        this.#type = type;
        this.#normalize = normalize;
        this.#stride = stride;
        this.#offset = offset;
        this.#gl.vertexAttribPointer(this.#positionAttributeLocation, this.#size,this.#type, this.#normalize, this.#stride, this.#offset);
    }
    
    setDrawAttributes(primitiveType=this.#gl.TRIANGLES, offset=0, count=3){
        this.#primitiveType = primitiveType;
        this.#drawOffset = offset;
        this.#count = count;
    }
    
    drawSetup(){
        
        this.#gl.bufferData(this.#gl.ARRAY_BUFFER, new Float32Array(this.#positions), this.#gl.STATIC_DRAW);
        this.#resizeCanvasToDisplaySize();
        // this.#clearCanvas();
        this.#gl.useProgram(this.#program);
        this.#gl.enableVertexAttribArray(this.#positionAttributeLocation);
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#positionBuffer);
    }

    draw(){
        // console.log(this.#primitiveType, this.#drawOffset, this.#count);
        this.#gl.drawArrays(this.#primitiveType, this.#drawOffset, this.#count);
    }
}

export default Drawable;