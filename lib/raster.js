class Raster {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._map = new Array(this._height);

    for (let i = 0; i < this._height; ++i) {
      this._map[i] = new Array(this._width).fill(0);
    }
  }

  fillCanvas2d(canvas2d, pixelSize=1, colors = {0: "orange", 1: "green"}) {
    for (let y = 0; y < this._height; ++y) {
      for (let x = 0; x < this._width; ++x) {
        canvas2d.fillStyle = colors[this._map[y][x]];
        canvas2d.fillRect(
          x*pixelSize,
          y*pixelSize,
          pixelSize,
          pixelSize
          );
      }
    }
  }

  pixelExists(x,y) {
    if (this._map[y] == undefined || this._map[y][x] == undefined)
      return false;
    return true;
  }

  setPixel(x, y, value = 1) {
    if (!this.pixelExists(x,y)) {
      throw new Error(`Can't set pixel with coordinates (x: ${x}, y: ${y}). ` +
        `Coordinates must be < (${this._width}, ${this._height}).`)
    }
    this._map[y][x] = value;
  }

  getPixel(x,y) {
    return this.pixelExists(x,y) ? this._map[y][x] : undefined;
  }
}

export { Raster };