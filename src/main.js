import DrawingInfo from "./module/components/drawingInfo.js";
import Drawer from "./module/core/drawer.js";
import ShapeTypes from "./module/type/shapeTypes.js";
import Point from "./module/utils/point.js";
import ClickedShapeInfo from "./module/components/clickedShapeInfo.js";
import Rectangle from "./module/models/persegiPanjang.js";

/* State */
const STATE =  Object.freeze({
    IDLE: "Idle",
    DRAW: "Draw",
    ONDRAWING: "OnDrawing", 
    EDIT: "Edit",
    ONEDITING: "OnEditing",
})
var currentState = STATE.IDLE;

console.log("initial state", currentState)

var coordX = 0;
var coordY = 0;

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
var drawingInfo = new DrawingInfo();
var clickedShapeInfo = new ClickedShapeInfo();

function updateDrawingInfo(){
    drawingInfo.updateVertexCount(drawer.shapeCandidate.drawArraysCount());
    drawingInfo.setMaxVertex(drawingInfo.getMaxVertex());
    drawingInfo.render(rightPanel);
}

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
        drawer.drawShapeCandidate();

        if (drawingInfo.shapeType == ShapeTypes.POLYGON){
            // Perbarui Drawing Info
            updateDrawingInfo();
        }

        console.log("Shapes:", drawer.Shapes);
    } else if (currentState == STATE.ONDRAWING){
        if (drawingInfo.shapeType == ShapeTypes.POLYGON){
            // Jika merupakan shape polygon, tambah vertex 
            drawer.shapeCandidate.updateLastPoint(new Point(coordX, coordY));

            // Draw polygon terupdate
            drawer.drawShapeCandidate();
            
            // Perbarui Right Panel Info
            updateDrawingInfo();

            // apabila count == maxVertex, shape terbentuk
            if (drawer.shapeCandidate.drawArraysCount() == drawingInfo.getMaxVertex()){
                // Masukkan shape yang terbentuk ke dalam list shape
                drawer.moveCandidatetoShape();
                currentState = STATE.IDLE;
                resetRightPanel();
            }

        } else { 
            // Jika selain shape polygon, shape terbentuk
            if (drawingInfo.shapeType == ShapeTypes.RECTANGLE){
                // Update points sehingga sesuai posisi terakhir
                drawer.shapeCandidate.updatePoints(new Point(coordX, coordY));
                drawer.drawShapeCandidate();
            }

            // Masukkan shape yang terbentuk ke dalam list shape
            drawer.moveCandidatetoShape();
            currentState = STATE.IDLE;
            resetRightPanel();
        }
    }  else if (currentState = STATE.IDLE){
        // Jika Idle dilakukan pengecekan apakah ada vertex model yang diclick
        let shape = drawer.getShapeAndVertexClicked(coordX, coordY);
        console.log(`cursor x: ${coordX}, y: ${coordY}`);
        if (shape["shapeClicked"] != null){
            console.log("shape detected:", shape);
            // Terdapat model yang diklik
            clickedShapeInfo.shape = shape["shapeClicked"];
            clickedShapeInfo.vertexIdx = shape["vertexIdx"];

            // Change current state to EDIT
            currentState = STATE.EDIT;

            drawer.drawAllShapes();
            drawer.drawPoints(clickedShapeInfo.shape);
        }
    }
}

function handleCanvasMouseMove(event){
    updateCursorCoordinates(event);
    if (currentState == STATE.ONDRAWING){
        // Lakukan proses menggambar saat mousemove
        if (drawingInfo.shapeType == ShapeTypes.RECTANGLE){
            // Update posisi titik pada rectangle
            drawer.shapeCandidate.updatePoints(new Point(coordX, coordY));
            drawer.drawShapeCandidate();
        } else if (drawingInfo.shapeType == ShapeTypes.POLYGON){
            // Update titik terakhir pada polygon jika telah ada titik sementara
            if (drawingInfo.vertexCount < drawer.shapeCandidate.vertices.length){
                drawer.shapeCandidate.updateLastPoint(new Point(coordX, coordY));
            } else if (drawingInfo.vertexCount == drawer.shapeCandidate.vertices.length){
                drawer.shapeCandidate.addPoint(new Point(coordX, coordY));
                drawer.shapeCandidate.setCount(drawer.shapeCandidate.drawArraysCount()+1);
            }
            drawer.drawShapeCandidate();
        }
    } else if (currentState == STATE.ONEDITING){
        if (clickedShapeInfo.shape instanceof Rectangle){
            modifyVertex(event, clickedShapeInfo.shape, clickedShapeInfo.vertexIdx);
        }
    }
}

function handleCanvasMouseDown(event){
    if (currentState == STATE.EDIT){
        // Ubah jadi onEditing
        currentState = STATE.ONEDITING;
    }
}

function handleCanvasMouseUp(event){
    if (currentState == STATE.ONEDITING){
        // Ubah jadi onEditing
        currentState = STATE.EDIT;
    }
}

canvas.addEventListener("click", (event) => {handleCanvasClick(event)});
canvas.addEventListener("mousemove", (event) => {handleCanvasMouseMove(event)})
canvas.addEventListener("mousedown", (event)=> {handleCanvasMouseDown(event)})
canvas.addEventListener("mouseup", (event)=> {handleCanvasMouseUp(event)})

// Model (TODO: cari cara agar model yang sudah di render bisa listen)

/* User Interface */
// Get current coordinate of cursor
function updateCursorCoordinates(event) {
    coordX = (event.clientX - leftPanelWidth)*(1- (rightPanel.offsetWidth+leftPanelWidth)/window.innerWidth);
    coordY = event.clientY;
    // console.log(`x:${coordX}, y:${coordY}`);
}

function modifyVertex(event, selectedObject, index) {
    updateCursorCoordinates(event);
    selectedObject.resize(index, coordX, coordY);
    drawer.drawOneShape(selectedObject);
}

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

saveButton.addEventListener("click", (e) => {saveModel(clickedShapeInfo)});