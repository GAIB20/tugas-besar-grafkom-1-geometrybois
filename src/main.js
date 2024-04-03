import DrawingInfo from "./module/components/drawingInfo.js";
import ModelInfo from "./module/components/modelInfo.js";
import Drawer from "./module/core/drawer.js";
import Drawer2 from "./module/core/drawer.js";
import Square from "./module/models/persegi.js";
import Rectangle from "./module/models/persegiPanjang.js";
import ShapeTypes from "./module/type/shapeTypes.js";
import Vector2 from "./module/utils/Vector2.js";
import Point from "./module/utils/point.js";

const drawer = new Drawer2();

// State
const STATE =  Object.freeze({
    IDLE: 0,
    DRAWING: 1,
    EDITING: 2
})
var currentState = STATE.IDLE;
// Menyatakan apakah saat ini sedang menggambar (sudah ada vertex yang dibentuk, tetapi model belum jadi)
var onDrawing = false; 
var coordX = 0;
var coordY = 0;
var startX = 0;
var startY = 0;
var object;

const glcanvas = document.getElementById("glcanvas");
const gl = glcanvas.getContext("webgl")

// Drawer

// Left Panel
var canvas = document.getElementById('glcanvas');
var drawGarisPanel = document.getElementById('draw-garis');
var drawPersegiPanel = document.getElementById('draw-persegi');
var drawRectanglePanel = document.getElementById('draw-rectangle');
var drawPolygonPanel =document.getElementById('draw-polygon');


function handleLeftPanelClick(event, shapeType){
    currentState = STATE.DRAWING;

    console.log("Create shape X:", coordX);
    console.log("Create shape Y:", coordY);
    
    drawer.startDrawShape(shapeType, new Vector2(coordX, coordY));
}

// canvas.addEventListener("click", (event) => {
//     console.log("state: ", currentState)
// });

function clearCanvas() {
    drawer.clearShapes();
}

drawGarisPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.GARIS)});
drawPolygonPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.POLYGON)});
drawRectanglePanel.addEventListener('click', (e) => {
    clearCanvas();
    // handleLeftPanelClick(e, ShapeTypes.RECTANGLE);
    render(ShapeTypes.RECTANGLE);
})

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
            const point = object.getPoints(vertex.x, vertex.y);
            const square = pointToSquare(point);
            drawer.glDrawing.drawShape(square);
        })
    }
    // Create rectangle while dragging
    function formRectangle(e) {
        getCoordinates(e);
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
        getCoordinates(event);
        console.log("Click X:", coordX);
        console.log("Click Y:", coordY);
        startX = coordX;
        startY = coordY;

        canvas.addEventListener("mousemove", formRectangle)


        // Click again to stop forming the rectangle
        canvas.addEventListener("mouseup", function stopFormingRectangle(e) {
            
            getCoordinates(e);
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
// TODO: Find the right coordinates for cursor, still not working :p
function getCoordinates(event) {
    const rect = glcanvas.getBoundingClientRect();
    coordX = (event.clientX - rect.left) * 0.7;
    coordY = event.clientY - rect.top;
}

function modifyVertex(event, selectedObject, index) {
    getCoordinates(event);
    selectedObject.resize(index, x, y);
    drawer.glDrawing.drawShape(object);
}

function pointToSquare(point) {
    const square = new Square();
    let p1 = new Point(point[0], point[1]);
    let p2 = new Point(point[2], point[3]);
    let p3 = new Point(point[4], point[5]);
    let p4 = new Point(point[6], point[7]);
    // console.log("square p1: ", p1);
    square.setPoints(p1, p2, p3, p4);
    return square;
}

// Get current shape
const getShape = (event) => {
    getCoordinates(event);
    let selectedObject = null;
    let vertexIndex = -1;

    console.log("coord X: ", coordX);
    console.log("coord Y: ", coordY);

    let index = object.isVertexClicked(coordX, coordY);
    if (index != -1) {
        selectedObject = object;
        vertexIndex = index;
    }
    if (selectedObject == null) {
        drawer.glDrawing.drawShape(object);
        return null;
    }
    console.log("selected: ", selectedObject);
    return {
        selected: selectedObject,
        vertexIndex: vertexIndex
    }
}

// Click on the current shape
canvas.addEventListener("click", (e) => {
    let shape = getShape(e);

    if (shape) {
        let selectedObject = shape["selected"];
        let vertexIndex = shape["vertexIndex"];

        let point = selectedObject.getPoints(selectedObject.vertices[vertexIndex].x, selectedObject.vertices[vertexIndex].y);

        const square = pointToSquare(point);
        drawer.glDrawing.drawShape(square);

    }
})


// Drag current shape that has been formed
canvas.addEventListener("mousedown", (e) => {
    let shape = getShape(e);

    if (shape) {
        console.log("clicked object: ", shape)
        let selectedObject = shape["selected"];
        let vertexIndex = shape["vertexIndex"];

        function dragCurrentShape(e) {
            modifyVertex(e, selectedObject, vertexIndex);
        }

        canvas.addEventListener("mousemove", dragCurrentShape);
        canvas.addEventListener("mouseup", function end() {
            canvas.removeEventListener("mousemove", modifyVertex);
            canvas.removeEventListener("mouseup", end);
        })

    }
})


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