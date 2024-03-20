let isCanvasAdded = false;

document.getElementById("garis").addEventListener("click", () => {
    if (!isCanvasAdded) {
        const canvasGaris = document.createElement("canvas-garis");
        document.querySelector(".canvas-container").appendChild(canvasGaris);
        isCanvasAdded = true;
    } else {
        const canvasGaris = document.querySelector("canvas-garis");
        document.querySelector(".canvas-container").removeChild(canvasGaris);
        isCanvasAdded = false;
    }
});
