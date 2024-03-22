import Drawer from "./module/core/drawer.js";

// Drawer
var drawer = new Drawer();

document.getElementById('draw-garis').addEventListener('click', (e) => {
    drawer.addModel("Garis");
});

document.getElementById('draw-polygon').addEventListener('click', (e) => {
    drawer.addModel("Polygon");
});