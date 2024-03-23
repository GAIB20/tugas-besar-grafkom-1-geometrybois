import DrawingInfo from "./module/components/drawingInfo.js";
import ModelInfo from "./module/components/modelInfo.js";
import Drawer from "./module/core/drawer.js";

// Drawer
var drawer = new Drawer();
var drawerModels = drawer.models;
var rightPanel = document.querySelector(".right-panel");

function renderRightPanel(info){
    if (info instanceof ModelInfo){

    } else if (info instanceof DrawingInfo){
        rightPanel.innerHTML = `
            <div class="right-panel-info">
                <h2>Drawing ${info.drawingObject}</h2>
                <div>
                    <label for="color-picker">Color: </label>
                    <input type="color" id="color-picker" name="colorPicker" />
                </div>

                ${
                    info.drawingObject === "Polygon" ? 
                    `<div>
                        <label for="">Max Vertex: </label>
                        <input type="number" id="max-vertex" name="maxVertex">
                    </div>
                    <div>
                        <span>Vertex Count: </span>
                        <span id="Vertex Count"> 5 </span>
                    </div>
                    </div>`
                    :
                    `</div>`
                } `
    }
}


document.getElementById('draw-garis').addEventListener('click', (e) => {
    renderRightPanel(new DrawingInfo("Garis", "0F0F0F"));
    drawer.addModel("Garis");
});

document.getElementById('draw-polygon').addEventListener('click', (e) => {
    renderRightPanel(new DrawingInfo("Polygon", "#0F0F0F"));
    drawer.addModel("Polygon")
});

document.getElementById('draw-rectangle').addEventListener('click', (e) => {
    renderRightPanel(new DrawingInfo("Persegi Panjang", "0F0F0F"));
    drawer.addModel("Rectangle");
});

document.getElementById('save-btn').addEventListener('click', (e) => {
    var types = [];
    var positions = [];
    var colors = [];
    drawerModels.forEach((model) => {
        types.push(model.getType)
        positions.push(model.getPositions)
        colors.push(model.getColors)
    });
    var testString = "";
    types.forEach((type) => {
        testString += type + ", "
    })
    console.log(positions)
});