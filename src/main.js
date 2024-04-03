import DrawingInfo from "./module/components/drawingInfo.js";
import Drawer from "./module/core/drawer.js";
import ShapeTypes from "./module/type/shapeTypes.js";
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
drawRectanglePanel.addEventListener('click', (e) => { handleLeftPanelClick(e, ShapeTypes.RECTANGLE);})

/* Right Panel */
var rightPanel = document.querySelector(".right-panel");
var drawingInfo = new DrawingInfo()

function resetRightPanel(){
    drawingInfo.setInfo(null, null);
    rightPanel.innerHTML = "";
}


/* Canvas */
var canvas = document.getElementById('glcanvas');

function handleCanvasClick(event){
    updateCursorCoordinates(event);
    // Jika current state draw, inisiasi titik awal dan masuk state OnDrawing
    if (currentState == STATE.DRAW){
        currentState = STATE.ONDRAWING
        drawer.startFormShape(drawingInfo.shapeType, new Point(coordX, coordY));
    } else if (currentState == STATE.ONDRAWING){
        if (drawingInfo.shapeType == ShapeTypes.POLYGON){
            // Jika merupakan shape polygon, tambah vertex
            drawer.shapeCandidate.addPoint(new Point(coordX, coordY));
            drawer.shapeCandidate.setCount(drawer.shapeCandidate.drawArraysCount()+1);

            // Draw polygon terupdate
            drawer.drawShapeCandidate();

            // Perbarui Right Panel Info
            drawingInfo.updateVertexCount(drawer.shapeCandidate.drawArraysCount());
            drawingInfo.render(rightPanel);

        } else { 
            // Jika selain shape polygon, shape terbentuk
            if (drawingInfo.shapeType == ShapeTypes.RECTANGLE){
                // Update points sehingga sesuai posisi terakhir
                drawer.shapeCandidate.updatePoints(new Point(coordX, coordY));
                drawer.drawShapeCandidate();
            }

            // Masukkan shape yang terbentuk ke dalam list shape
            drawer.moveCandidatetoShape();
            currentState = STATE.DRAW;
            resetRightPanel();
        }
    } else if (currentState = STATE.IDLE){
        // Jika Idle dilakukan pengecekan apakah ada vertex model yang diclick
    }
}

function handleCanvasHover(event){
    updateCursorCoordinates(event);
    if (currentState == STATE.ONDRAWING){
        // Lakukan proses menggambar saat mousemove
        if (drawingInfo.shapeType == ShapeTypes.RECTANGLE){
            // Update posisi titik pada rectangle
            drawer.shapeCandidate.updatePoints(new Point(coordX, coordY));
            drawer.drawShapeCandidate();
        }
    }
}

canvas.addEventListener("click", (event) => {handleCanvasClick(event)});
canvas.addEventListener("mousemove", (event) => {handleCanvasHover(event)})


// Model (TODO: cari cara agar model yang sudah di render bisa listen)

/* User Interface */
// Get current coordinate of cursor
function updateCursorCoordinates(event) {
    const rect = glcanvas.getBoundingClientRect();
    coordX = (event.clientX - leftPanelWidth)*(1- (rightPanel.offsetWidth+leftPanelWidth)/window.innerWidth);
    coordY = event.clientY - rect.top;
    // console.log(`x:${coordX}, y:${coordY}`);
}

function modifyVertex(event, selectedObject, index) {
    updateCursorCoordinates(event);
    selectedObject.resize(index, coordX, coordY);
    drawer.glDrawing.drawShape(object);
}


// Get current shape
const getShape = (event) => {
    updateCursorCoordinates(event);
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


// Save Model
let saveButton = document.getElementById("save-btn");

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

saveButton.addEventListener("click", (e) => {saveModel(object)});