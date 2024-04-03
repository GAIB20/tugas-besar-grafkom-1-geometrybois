import DrawingInfo from "./module/components/drawingInfo.js";
import ModelInfo from "./module/components/modelInfo.js";
import Drawer from "./module/core/drawer.js";
import Square from "./module/models/persegi.js";
import Rectangle from "./module/models/persegiPanjang.js";
import ShapeTypes from "./module/type/shapeTypes.js";
import Vector2 from "./module/utils/Vector2.js";
import Point from "./module/utils/point.js";


/* State */
const STATE =  Object.freeze({
    IDLE: "Idle",
    DRAW: "Draw",
    ONDRAWING: "OnDrawing", 
    EDIT: "Edit",
})
var currentState = STATE.IDLE;

var coordX = 0;
var coordY = 0;
var startX = 0;
var startY = 0;
var object;

const glcanvas = document.getElementById("glcanvas");
const gl = glcanvas.getContext("webgl")

/* Drawer */
const drawer = new Drawer();


/* Left Panel */
var leftPanelWidth = (document.querySelector('.left-panel')).offsetWidth;
var drawGarisPanel = document.getElementById('draw-garis');
var drawPersegiPanel = document.getElementById('draw-persegi');
var drawRectanglePanel = document.getElementById('draw-rectangle');
var drawPolygonPanel =document.getElementById('draw-polygon');


function handleLeftPanelClick(event, shapeType){
    if (currentState == STATE.ONDRAWING){
        // Jika shape yang akan digambar berbeda dengan shape sedang digambar
        // Hapus shapeCandidate 
        if (drawingInfo.shapeType != shapeType){
            drawer.clearShapeCandidate()
            drawingInfo.setInfo(shapeType, "#FF0000");
            drawingInfo.render(rightPanel);
            currentState = STATE.DRAW;
        }
    } else {
            drawingInfo.setInfo(shapeType, "#FF0000");
            drawingInfo.render(rightPanel);
            currentState = STATE.DRAW;
    }  

}

drawGarisPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.LINES)});
drawPolygonPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.POLYGON)});
drawRectanglePanel.addEventListener('click', (e) => {
    clearCanvas();
    // handleLeftPanelClick(e, ShapeTypes.RECTANGLE);
    render(ShapeTypes.RECTANGLE);
})

/* Right Panel */
var rightPanelWidth = (document.querySelector('.right-panel')).offsetWidth;
var rightPanel = document.querySelector(".right-panel");
var drawingInfo = new DrawingInfo()


/* Canvas */
var canvas = document.getElementById('glcanvas');

function handleCanvasClick(event){
    // Jika current state draw, inisiasi titik awal dan masuk state OnDrawing
    if (currentState == STATE.DRAW){
        currentState = STATE.ONDRAWING
        console.log("current state: " + currentState);
        updateCursorCoordinates(event)
        drawer.startFormShape(drawingInfo.shapeType, new Point(coordX, coordY));
        console.log("Candidate: ", drawer.shapeCandidate);
    } else if (currentState == STATE.ONDRAWING){
        // Jika merupakan shape polygon, tambah vertex
        if (drawingInfo.shapeType == ShapeTypes.POLYGON){
            updateCursorCoordinates(event);
            let p = new Point(1,2)
            drawer.shapeCandidate.addPoint(new Point(coordX, coordY));
            drawer.shapeCandidate.setCount(drawer.shapeCandidate.getCount()+1);
            drawer.drawShapeCandidate();
            drawingInfo.updateVertexCount(drawer.shapeCandidate.getCount())
        }
    }
}

function handleCanvasHover(event){
    if (currentState == STATE.ONDRAWING){
        // Lakukan proses menggambar saat mousemove
    }
}

canvas.addEventListener("click", (event) => {handleCanvasClick(event)});
canvas.addEventListener("mousemove", (event) => {handleCanvasHover(event)})

function clearCanvas() {
    drawer.clearShapes();
}


// canvas.addEventListener("click", (e)=>{handleCanvasClick(e)}); // Click suatu titik pada canvas
// canvas.addEventListener("mousemove", (e)=>{handleCanvasHover(e)}); // Mouse hovering di dalam canvas

// Model (TODO: cari cara agar model yang sudah di render bisa listen)
const render = (type) => {
    if (type == ShapeTypes.RECTANGLE) {
        object = new Rectangle();
    }
    // Draw point visual using Square()
    function drawPoint(object) {
        object.vertices.forEach((vertex) => {
            const point = getPoints(vertex.x, vertex.y);
            const square = new Square();
            let p1 = new Point(point[0], point[1]);
            let p2 = new Point(point[2], point[3]);
            let p3 = new Point(point[4], point[5]);
            let p4 = new Point(point[6], point[7]);
            // console.log("square p1: ", p1);
            square.setPoints(p1, p2, p3, p4);
            drawer.glDrawing.drawShape(square);
        })
    }
    // Create rectangle while dragging
    function formRectangle(e) {
        updateCursorCoordinates(e);
        console.log("Drag X:", coordX);
        console.log("Drag Y:", coordY);

        let dragX = coordX;
        let dragY = coordY;

        let p1 = new Point(startX, startY);
        let p2 = new Point(startX, dragY);
        let p3 = new Point(dragX, startY);
        let p4 = new Point(dragX, dragY);
        object.setPoints(p1, p2, p3, p4);

        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        drawer.glDrawing.drawShape(object);
        drawPoint(object);
    }
    // Init first point of rectangle
    canvas.addEventListener("click", function drawShape(event) {
        updateCursorCoordinates(event);
        console.log("Click X:", coordX);
        console.log("Click Y:", coordY);
        startX = coordX;
        startY = coordY;

        canvas.addEventListener("mousemove", formRectangle)


        // Click again to stop forming the rectangle
        canvas.addEventListener("mouseup", function stopFormingRectangle(e) {
            
            updateCursorCoordinates(e);
            console.log("Stop forming X:", coordX);
            console.log("Stop forming Y:", coordY);
            let endX = coordX;
            let endY = coordY;
            let p1 = new Point(startX, startY);
            let p2 = new Point(startX, endY);
            let p3 = new Point(endX, startY);
            let p4 = new Point(endX, endY);
            object.setPoints(p1, p2, p3, p4);

            console.log("vertex 1: ", object.p1);
            console.log("vertex 2: ", object.p2);
            console.log("vertex 3: ", object.p3);
            console.log("vertex 4: ", object.p4);

            drawer.addShape(object);

            drawer.glDrawing.drawShape(object);
            drawPoint(object);
            console.log("object: ", object);

            canvas.removeEventListener("mousemove", formRectangle)
            canvas.removeEventListener("click", drawShape)
            canvas.removeEventListener("mouseup", stopFormingRectangle);
        })
        
    });
}

// Get current coordinate of cursor
function updateCursorCoordinates(event) {
    const rect = glcanvas.getBoundingClientRect();
    coordX = (event.clientX - leftPanelWidth)*(1- (rightPanelWidth+leftPanelWidth)/window.innerWidth);
    coordY = event.clientY - rect.top;
    console.log(`x: ${coordX}, y:${coordY}`);
}

function getPoints(x, y) {
    return [
        x - 5, y + 5,
        x + 5, y + 5,
        x - 5, y - 5,
        x + 5, y - 5,
    ]
}

function modifyVertex(event, selectedObject, index) {
    updateCursorCoordinates(event);
    selectedObject.resize(index, x, y);
    drawer.glDrawing.drawShape(object);
}

const getShape = (event) => {
    updateCursorCoordinates(event);
    let selectedObject = null;
    let vertexIndex = -1;

    let index = object.checkVertex(coordX, coordY);
    if (index != -1) {
        selectedObject = object;
        vertexIndex = index;
    }
    if (selectedObject == null) {
        drawer.glDrawing.drawShape(object);
        return null;
    }
    return {
        selected: selectedObject,
        vertexIndex: vertexIndex
    }
}

let saveButton = document.getElementById("save-btn");
saveButton.addEventListener("click", function saveObject() {
    saveModel(object);
    saveButton.removeEventListener("click", saveObject);
});

function saveModel(object) {
    const filename = "object-file"

    const text = JSON.stringify(object);

    const file = new Blob([text], {
        type: "json/javascript",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
}