import DrawingInfo from "./module/components/drawingInfo.js";
import ModelInfo from "./module/components/modelInfo.js";
import Drawer from "./module/core/drawer.js";
import Drawer2 from "./module/core/drawer.js";
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

drawGarisPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.GARIS)});
drawPolygonPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.POLYGON)});
drawRectanglePanel.addEventListener('click', (e) => {
    // handleLeftPanelClick(e, ShapeTypes.RECTANGLE);
    render(ShapeTypes.RECTANGLE);
})

// canvas.addEventListener("click", (e)=>{handleCanvasClick(e)}); // Click suatu titik pada canvas
// canvas.addEventListener("mousemove", (e)=>{handleCanvasHover(e)}); // Mouse hovering di dalam canvas

// Model (TODO: cari cara agar model yang sudah di render bisa listen)
const render = (type) => {
    let object;
    if (type == ShapeTypes.RECTANGLE) {
        object = new Rectangle();
    }
    function formRectangle(e) {
        getCoordinates(e);
        console.log("Drag X:", coordX);
        console.log("Drag Y:", coordY);
    }
    canvas.addEventListener("click", function drawShape(event) {
        getCoordinates(event);
        console.log("Click X:", coordX);
        console.log("Click Y:", coordY);
        let startX = coordX;
        let startY = coordY;

        canvas.addEventListener("mousemove", formRectangle)

        canvas.addEventListener("mouseup", function stopFormingRectangle(e) {
            canvas.removeEventListener("mousemove", formRectangle)
            canvas.removeEventListener("click", drawShape)
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

            drawer.addShape(object);
            drawer.drawAllShapes(object);
            
            
    
        })
        
    });
}



function getCoordinates(event) {
    const glcanvas = document.getElementById("glcanvas");
    const rect = glcanvas.getBoundingClientRect();
    coordX = event.clientX - rect.left;
    coordY = event.clientY - rect.top;
}

