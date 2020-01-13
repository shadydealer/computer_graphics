class CanvasHandler {

  constructor(canvasContainerId) {
    this._canvasContainer = document.getElementById(canvasContainerId);
    this._canvas;
    this._height;
    this._width;
  }

  initCanvas(width = 2048, height = 2048) {
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

  fillCanvasWithRaster(map, pixelSize=1, colors = {0: "black", 1: "white"}) {
    const canvas2d = this.getCanvas2D();
    const height = map.length;
    const width = map[0].length;

    const totalHeight = height*pixelSize;
    const totalWidth = width*pixelSize;

    if(totalHeight > this._height || totalWidth > this._width)
      throw new Error(`Map of size ${totalWidth} width and ${totalHeight} height cannot fit in a canvas of size ${this._width} width and ${this._height}.`);

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        canvas2d.fillStyle = colors[map[y][x]];
        canvas2d.fillRect(
          x*pixelSize,
          y*pixelSize,
          pixelSize,
          pixelSize
          );
      }
    }
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