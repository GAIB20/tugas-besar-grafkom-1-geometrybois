
/**
 * @class CanvasResize
 * @classdesc CanvasResize class to resize the canvas based on the content box size
 * @property {Map} canvasToDisplaySizeMap - A map to store the canvas and its display size
 * @property {ResizeObserver} resizeObserver - A ResizeObserver object to observe the canvas size
 * @example How to use CanvasResize:
 * const canvasResize = new CanvasResize();
 * canvasResize.resizeCanvasToDisplaySize(canvas);
 * 
 */
class CanvasResize {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasToDisplaySizeMap = new Map([[this.canvas, [300, 150]]]);
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(canvas, { box: 'content-box' });
    }

    onResize(entries) {
        for (const entry of entries) {
            let width;
            let height;
            let dpr = window.devicePixelRatio;
            if (entry.devicePixelContentBoxSize) {
                // NOTE: Only this path gives the correct answer
                // The other 2 paths are an imperfect fallback
                // for browsers that don't provide anyway to do this
                width = entry.devicePixelContentBoxSize[0].inlineSize;
                height = entry.devicePixelContentBoxSize[0].blockSize;
                // it's already in width and height
                dpr = 1;
            } else if (entry.contentBoxSize) {
                if (entry.contentBoxSize[0]) {
                    width = entry.contentBoxSize[0].inlineSize;
                    height = entry.contentBoxSize[0].blockSize;
                } else {
                    // legacy
                    width = entry.contentBoxSize.inlineSize;
                    height = entry.contentBoxSize.blockSize;
                }
            } else {
                // legacy
                width = entry.contentRect.width;
                height = entry.contentRect.height;
            }
            const displayWidth = Math.round(width * dpr);
            const displayHeight = Math.round(height * dpr);
            this.canvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight]);
        }
    }

    resizeCanvasToDisplaySize(canvas) {
        // Get the size the browser is displaying the canvas in device pixels.
        const [displayWidth, displayHeight] = this.canvasToDisplaySizeMap.get(canvas);
        if (!displaySize) {
            console.error('Canvas not found in canvasToDisplaySizeMap');
            return false;
        }
        
        // Check if the canvas is not the same size.
        const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
        
        if (needResize) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
        return needResize;
    }
}

export default CanvasResize;