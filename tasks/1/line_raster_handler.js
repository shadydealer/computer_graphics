import { LineRaster } from "./line_raster.js";
import { CanvasHandler } from "../../lib/canvas_handler.js";
import { InputHandler } from "../../lib/input_handler.js";

class LineRasterHandler {
  constructor(canvasContaierId) {
    this._inputHandler = new InputHandler(
      "input-fields-container",
      Object.values(LineRasterHandler.MAP_INPUT_FIELDS),
      LineRasterHandler.LINE_FIELDS
      );
    this._inputHandler.attachAddShapeOnClick("add-line");

    this._canvasHandler = new CanvasHandler(canvasContaierId);

    this._lineRaster;
  }

  attachBresenhamRasterisationMethod(triggerElementId) {
    this.attachRasterisationMethod(triggerElementId, new LineRaster().bresenhamLine);
  }

  attachRasterisationMethod(triggerElementId, rasterisationMethod) {
    document
    .getElementById(triggerElementId)
    .addEventListener(
      "click",
      event => {
        event.preventDefault();

        const inputData = this._inputHandler.getInputData();

        const inputFields = LineRasterHandler.MAP_INPUT_FIELDS;

        const mapWidth = inputData.mapData[inputFields.pixelMapWidth];
        const mapHeight = inputData.mapData[inputFields.pixelMapHeight];
        const pixelSize = inputData.mapData[inputFields.pixelSize];

        this._canvasHandler.initCanvas(
          mapWidth*pixelSize,
          mapHeight*pixelSize
          );

        this._lineRaster = new LineRaster(
          mapWidth,
          mapHeight
          );

        inputData.shapeData.forEach(line => {
          rasterisationMethod.call(
            this._lineRaster,
            line.x1,
            line.y1,
            line.x2,
            line.y2,
            line.thickness
            );
        });

        const rasterMap = this._lineRaster.getMap();

        this._canvasHandler.fillCanvasWithRaster(
          rasterMap,
          pixelSize,
          {
            0: "blue",
            1: "orange",
            2: "yellow"
          }
          );
      });
  }

  getLineRaster() {
    return this._lineRaster;
  }
}

LineRasterHandler.LINE_FIELDS = [
"x1",
"y1",
"x2",
"y2",
"thickness"
];

LineRasterHandler.MAP_INPUT_FIELDS = {
  pixelSize: "pixel-size",
  pixelMapWidth: "pixel-map-width",
  pixelMapHeight: "pixel-map-height",
}

export { LineRasterHandler };