"use strict";

class Drawable {
    // Attributes
    _id;
    #gl;
    #type;
    #program;
    #positionAttributeLocation;
    #positionBuffer;
    #positions;
    #colorAttributeLocation;
    #colorBuffer;
    #colors;
    #positionSize;          // components per iteration
    #positionType;   // the data is 32bit floats
    #positionNormalize; // don't normalize the data
    #positionStride;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    #positionOffset;        // start at the beginning of the buffer
    #colorSize;          // components per iteration
    #colorType;   // the data is 32bit floats
    #colorNormalize; // don't normalize the data
    #colorStride;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    #colorOffset;        // start at the beginning of the buffer
    #primitiveType;
    #matrixAttributeLocation;
    #maxVertex;
    #vertexCount;
    #drawOffset;
    #count;


    // Constructor
    constructor(gl, program, vertexCount = 0, count = 0, type = "Model"){
        // Set gl and program
        this.#gl = gl;
        this.#count = count;
        this.#program = program;
        this.#maxVertex = vertexCount;
        this.#vertexCount = vertexCount;
        this.#type = type;

        // look up where the vertex data needs to go.
        this.#positionAttributeLocation = this.#gl.getAttribLocation(this.#program, "a_position");
        this.#colorAttributeLocation = this.#gl.getAttribLocation(this.#program, "a_color");
        this.#matrixAttributeLocation = this.#gl.getUniformLocation(this.#program, "u_matrix");
        
        // Create a buffer and put three 2d clip space points in it
        this.#positionBuffer = this.#gl.createBuffer();
        
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#positionBuffer);
        
        // Create color buffer
        this.#colorBuffer = this.#gl.createBuffer();
        
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#colorBuffer);

        // Initialize the properties for rendering
        this.setPositionAttribute();
        this.setColorAttribute();
        this.setDrawAttributes();

    }

    // Setter
    set setPositions(positions){
        this.#positions = positions;
    }

    set setColors(colors){
        this.#colors = colors;
    }

    // Getter
    get getPositions(){
        return this.#positions;
    }

    get getType() {
        return this.#type;
    }

    get getColors() {
        return this.#colors;
    }
    
    // Public Methods
    setPositionAttribute(size = 2, type = this.#gl.FLOAT, normalize = false, stride=0, offset=0){
        this.#positionSize = size;
        this.#positionType = type;
        this.#positionNormalize = normalize;
        this.#positionStride = stride;
        this.#positionOffset = offset;
        this.#gl.vertexAttribPointer(this.#positionAttributeLocation, this.#positionSize,this.#positionType, 
            this.#positionNormalize, this.#positionStride, this.#positionOffset);
    }
    
    setColorAttribute(size = 4, type = this.#gl.FLOAT, normalize = false, stride=0, offset=0){
        this.#colorSize = size;
        this.#colorType = type;
        this.#colorNormalize = normalize;
        this.#colorStride = stride;
        this.#colorOffset = offset;
        this.#gl.vertexAttribPointer(this.#colorAttributeLocation, this.#colorSize,this.#colorType, 
            this.#colorNormalize, this.#colorStride, this.#colorOffset);
    }
    setDrawAttributes(primitiveType=this.#gl.TRIANGLES, offset=0){
        this.#primitiveType = primitiveType;
        this.#drawOffset = offset;
    }
    
    drawSetup(){
        // Setup positions data 
        this.#gl.bufferData(this.#gl.ARRAY_BUFFER, new Float32Array(this.#positions), this.#gl.STATIC_DRAW);
        this.#gl.enableVertexAttribArray(this.#positionAttributeLocation);
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#positionBuffer);

        // Setup colors data
        this.#gl.bufferData(this.#gl.ARRAY_BUFFER, new Float32Array(this.#colors), this.#gl.STATIC_DRAW);
        this.#gl.enableVertexAttribArray(this.#colorAttributeLocation);
        this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#colorBuffer);
    }

    draw(){
        // console.log(this.#primitiveType, this.#drawOffset, this.#count);
        this.#gl.drawArrays(this.#primitiveType, this.#drawOffset, this.#count);
    }
}

export default Drawable;