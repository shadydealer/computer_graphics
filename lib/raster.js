class Raster {
  constructor() {
    this._width;
    this._height;
    this._map;
  }

  initMap(width, height) {
    this._width = width;
    this._height = height;
    this._map = new Array(this._height);

    for (let i = 0; i < this._height; ++i) {
      this._map[i] = new Array(this._width).fill(0);
    }
  }
  pixelExists(x,y) {
    if (this._map[y] == undefined || this._map[y][x] == undefined)
      return false;
    return true;
  }

  setPixel(x, y, value = 1) {
    this._map[y][x] = value;
  }

  setPixelRow(from, to, y, value = 1) {
    for(let x = from; x <= to; ++x) {
      this.setPixel(x,y, value);
    }
  }

  getPixel(x,y) {
    return this.pixelExists(x,y) ? this._map[y][x] : undefined;
  }

  getMap() {
    return this._map;
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }
}

export { Raster };