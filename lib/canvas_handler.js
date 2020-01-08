class CanvasHandler {

  constructor(canvasContainerId) {
    this._canvasContainer = document.getElementById(canvasContainerId);
    this._canvas;
    this._height;
    this._width;
  }

  createCanvas(width = 2048, height = 2048) {
    this._canvas = this._canvas || document.getElementById("canvas");

    if(this._canvas) {
      this._canvas.parentNode.removeChild(canvas);
    }

    this._canvas = document.createElement("canvas");
    this._canvas.id = "canvas";
    this._canvas.width = width;
    this._canvas.height = height;

    this._width = width;
    this._height = height;

    this._canvasContainer.append(this._canvas);
  }

  getCanvasHeight() {
    return this._height;
  }

  getCanvasWidth() {
    return this._width;
  }

  getCanvas2D() {
    return this._canvas ? this._canvas.getContext("2d") : undefined;
  }
}

export { CanvasHandler };