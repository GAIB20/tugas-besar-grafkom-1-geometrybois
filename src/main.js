import DrawingInfo from "./module/components/drawingInfo.js";
import ModelInfo from "./module/components/modelInfo.js";
import Drawer from "./module/core/drawer.js";
import Drawer2 from "./module/core/drawer.js";
import ShapeTypes from "./module/type/shapeTypes.js";
import Vector2 from "./module/utils/Vector2.js";

const drawer = new Drawer2();

function handleLeftPanelClick(event, shapeType){
    drawer.startDrawShape(shapeType, new Vector2(event.clientX, event.clientY));
}
// State
const STATE =  Object.freeze({
    IDLE: 0,
    DRAWING: 1,
    EDITING: 2
})
var currentState = STATE.IDLE;
// Menyatakan apakah saat ini sedang menggambar (sudah ada vertex yang dibentuk, tetapi model belum jadi)
var onDrawing = false; 

// Drawer

// Left Panel
var drawGarisPanel = document.getElementById('draw-garis');
var drawPersegiPanel = document.getElementById('draw-persegi');
var drawRectanglePanel = document.getElementById('draw-rectangle');
var drawPolygonPanel =document.getElementById('draw-polygon');

drawGarisPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.GARIS)});
drawPolygonPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.POLYGON)});
drawRectanglePanel.addEventListener('click', (e) => {handleLeftPanelClick(e, ShapeTypes.RECTANGLE)})

canvas.addEventListener("click", (e)=>{handleCanvasClick(e)}); // Click suatu titik pada canvas
canvas.addEventListener("mousemove", (e)=>{handleCanvasHover(e)}); // Mouse hovering di dalam canvas

// Model (TODO: cari cara agar model yang sudah di render bisa listen)
canvas.addEventListener("click", (event) => {
    const glcanvas = document.getElementById("glcanvas");
    const rect = glcanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    console.log("Mouse X:", mouseX);
    console.log("Mouse Y:", mouseY);
});

