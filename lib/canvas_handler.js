class CanvasHandler {

  constructor(canvasContainerId) {
    this._canvasContainer = document.getElementById(canvasContainerId);
  }

  initCanvas(width = 2048, height = 2048) {
    let canvas = document.getElementById("canvas");

    if(canvas) {
      canvas.parentNode.removeChild(canvas);
    }

    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = Math.max(width);
    canvas.height = Math.max(height);

    this._canvasContainer.append(canvas);
  }
}

export { CanvasHandler };