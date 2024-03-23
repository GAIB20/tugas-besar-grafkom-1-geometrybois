import DrawingInfo from "./module/components/drawingInfo.js";
import ModelInfo from "./module/components/modelInfo.js";
import Drawer from "./module/core/drawer.js";

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
var drawer = new Drawer();

// Left Panel
const defaultColor = "#0F0F0F";
var drawGarisPanel = document.getElementById('draw-garis');
var drawPersegiPanel = document.getElementById('draw-persegi');
var drawRectanglePanel = document.getElementById('draw-rectangle');
var drawPolygonPanel =document.getElementById('draw-polygon');

// Canvas
var canvas = document.getElementById("glcanvas");

// Right Panel
var drawingInfo = new DrawingInfo(null,null);
var modelInfo = new ModelInfo();
var rightPanel = document.querySelector(".right-panel");

/* Utility Function */
function createModelCandidate(modelType){
    drawingInfo.drawingObject = modelType;
    drawingInfo.color = defaultColor;
    drawingInfo.render(rightPanel);
    drawer.createModelCandidate(modelType);
}

/* Event Listener */

// Left Panel: Model Type
function handleLeftPanelClick(event, modelType){
    // Ubah state jika belum berada pada state DRAWING
    if (currentState != STATE.DRAWING){
        currentState = STATE.DRAWING;

        // Tambahkan calon model pada drawer
        createModelCandidate(modelType);
        
    } else { // Jika sudah berada pada state DRAWING
        // Lakukan penyesuaian jika ganti model, jika tidak abaikan
        if (drawingInfo.drawingObject != modelType){
            // Ganti jenis model yang digambar
            drawingInfo.drawingObject = modelType
            
            // Cek apakah ada proses menggambar sebelumnya yang belum selesai
            if (onDrawing){
                // Hapus calon model dari list models drawer
                drawer.models.pop();
            }
            
            // Set onDrawing menjadi false karena drawing dimulai dari awal
            onDrawing = false;

            // Tambahkan calon model pada drawer
            createModelCandidate(modelType);
        }
    }

    console.log("Model yang digambar: ",  drawingInfo.drawingObject);
}

drawGarisPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, "Garis")});
drawRectanglePanel.addEventListener('click', (e) => {handleLeftPanelClick(e, "Rectangle")});    
drawPolygonPanel.addEventListener('click', (e) => {handleLeftPanelClick(e, "Polygon")});

// Canvas : Tempat model dirender
function handleCanvasClick(event){
    // Handle menggambar model hanya pada saat state DRAWING
    if(currentState == STATE.DRAWING){
        // TODO: Mengambil titik dan rendering pada calon model

        // Set onDrawing menjadi true karena sedang melakukan proses drawing
        onDrawing = true;

    } else if (currentState == STATE.EDITING){
        // Jika state sedang editing, ubah jadi idle dan hilangkan info pada right panel
        currentState = STATE.IDLE;
        rightPanel.innerHTML="";
    }
}

function handleCanvasHover(event){
    // Handle hanya saat sedang menggambar sehingga tampilan canvas interaktif
    if(onDrawing){
        // TODO: Mengambil posisi mouse lalu update calon vertex yang akan ditambah
    } 
}

canvas.addEventListener("click", (e)=>{handleCanvasClick(e)}); // Click suatu titik pada canvas
canvas.addEventListener("mousemove", (e)=>{handleCanvasHover(e)}); // Mouse hovering di dalam canvas

// Model (TODO: cari cara agar model yang sudah di render bisa listen)