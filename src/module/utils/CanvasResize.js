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
    constructor() {
        this.canvasToDisplaySizeMap = new Map([[canvas, [300, 150]]]);
        this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
        this.resizeObserver.observe(canvas, { box: 'content-box' });
    }

    onResize(entries) {
        for (const entry of entries) {
            let width;
            let height;
            let dpr = window.devicePixelRatio;
            if (entry.devicePixelContentBoxSize) {
                width = entry.devicePixelContentBoxSize[0].inlineSize;
                height = entry.devicePixelContentBoxSize[0].blockSize;
                dpr = 1;
            } else if (entry.contentBoxSize) {
                if (entry.contentBoxSize[0]) {
                    width = entry.contentBoxSize[0].inlineSize;
                    height = entry.contentBoxSize[0].blockSize;
                } else {
                    width = entry.contentBoxSize.inlineSize;
                    height = entry.contentBoxSize.blockSize;
                }
            } else {
                width = entry.contentRect.width;
                height = entry.contentRect.height;
            }
            const displayWidth = Math.round(width * dpr);
            const displayHeight = Math.round(height * dpr);
            this.canvasToDisplaySizeMap.set(entry.target, [displayWidth, displayHeight]);
        }
    }

    resizeCanvasToDisplaySize(canvas) {
        const [displayWidth, displayHeight] = this.canvasToDisplaySizeMap.get(canvas);
        const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
        if (needResize) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
        return needResize;
    }
}

const canvasResize = (() => {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = new CanvasResize();
            }
            return instance;
        }
    };
})();

// Get the instance of CanvasResize
const canvasResizeInstance = canvasResize.getInstance();