import Drawer from "./module/core/drawer.js";

// Drawer
var drawer = new Drawer();

document.getElementById('draw-garis').addEventListener('click', (e) => {
    drawer.addModel("Garis");
    console.log(drawer.models);
    console.log("==============");
});

document.getElementById('draw-polygon').addEventListener('click', (e) => {
    drawer.addModel("Polygon");
    console.log(drawer.models);
    console.log("==============");
});