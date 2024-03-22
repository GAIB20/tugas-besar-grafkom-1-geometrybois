import CanvasGaris from "./module/garis.js";

document.getElementById('draw-garis').addEventListener('click', (e) => {
    let draw = new CanvasGaris();
    draw.drawArrays();
    console.log('draw garis');
});
