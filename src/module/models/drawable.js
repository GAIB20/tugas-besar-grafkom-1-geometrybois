"use strict";

class Drawable {
    // Attributes
    _id;
    _gl;
    _type;
    _program;
    _positionAttributeLocation;
    _positionBuffer;
    _positions;
    _colorAttributeLocation;
    _colorBuffer;
    _colors;
    _positionsize;          // components per iteration
    _positionType;   // the data is 32bit floats
    _positionNormalize; // don't normalize the data
    _positionstride;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    _positionOffset;        // start at the beginning of the buffer
    _colorSize;          // components per iteration
    _colorType;   // the data is 32bit floats
    _colorNormalize; // don't normalize the data
    _colorStride;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    _colorOffset;        // start at the beginning of the buffer
    _primitiveType;
    _matrixAttributeLocation;
    _maxVertex;
    _vertexCount;
    _drawOffset;
    _count;


    // Constructor
    constructor(gl, program, vertexCount = 0, count = 0, type = "Model"){
        // Set gl and program
        this._gl = gl;
        this._count = count;
        this._program = program;
        this._maxVertex = vertexCount;
        this._vertexCount = vertexCount;
        this._type = type;

        // look up where the vertex data needs to go.
        this._positionAttributeLocation = this._gl.getAttribLocation(this._program, "a_position");
        this._colorAttributeLocation = this._gl.getAttribLocation(this._program, "a_color");
        this._matrixAttributeLocation = this._gl.getUniformLocation(this._program, "u_matrix");
        
        // Create a buffer and put three 2d clip space points in it
        this._positionBuffer = this._gl.createBuffer();
        
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
        
        // Create color buffer
        this._colorBuffer = this._gl.createBuffer();
        
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = colorBuffer)
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._colorBuffer);

        // Initialize the properties for rendering
        this.setPositionAttribute();
        this.setColorAttribute();
    }

    // Setter
    set setPositions(positions){
        this._positions = positions;
    }

    set setColors(colors){
        this._colors = colors;
    }

    // Getter
    get getPositions(){
        return this._positions;
    }

    get getType() {
        return this._type;
    }

    get getColors() {
        return this._colors;
    }
    
    // Public Methods
    setPositionAttribute(size = 2, type = this._gl.FLOAT, normalize = false, stride=0, offset=0){
        this._positionsize = size;
        this._positionType = type;
        this._positionNormalize = normalize;
        this._positionstride = stride;
        this._positionOffset = offset;
        this._gl.vertexAttribPointer(this._positionAttributeLocation, this._positionsize,this._positionType, 
            this._positionNormalize, this._positionstride, this._positionOffset);
    }
    
    setColorAttribute(size = 4, type = this._gl.FLOAT, normalize = false, stride=0, offset=0){
        this._colorSize = size;
        this._colorType = type;
        this._colorNormalize = normalize;
        this._colorStride = stride;
        this._colorOffset = offset;
        this._gl.vertexAttribPointer(this._colorAttributeLocation, this._colorSize,this._colorType, 
            this._colorNormalize, this._colorStride, this._colorOffset);
    }
    setDrawAttributes(primitiveType, offset=0){
        this._primitiveType = primitiveType;
        this._drawOffset = offset;
    }
    
    drawSetup(){
        // Setup positions data 
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._positions), this._gl.STATIC_DRAW);
        this._gl.enableVertexAttribArray(this._positionAttributeLocation);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);

        // Setup colors data
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._colors), this._gl.STATIC_DRAW);
        this._gl.enableVertexAttribArray(this._colorAttributeLocation);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._colorBuffer);
    }

    draw(){
        // console.log(this._primitiveType, this._drawOffset, this._count);
        this._gl.drawArrays(this._primitiveType, this._drawOffset, this._count);
    }
}

export default Drawable;