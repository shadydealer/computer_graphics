import { CanvasHandler } from "../../lib/canvas_handler.js";
import { InputHandler } from "../../lib/input_handler.js";

class RasterHandler {
  constructor(
    canvasContaierId,
    raster,
    addShapeButtonId,
    shapeFields) {
    this._inputHandler = new InputHandler(
      "input-fields-container",
      Object.values(RasterHandler.MAP_INPUT_FIELDS),
      shapeFields
      );

    this._inputHandler.attachAddShapeOnClick(addShapeButtonId);
    this._canvasHandler = new CanvasHandler(canvasContaierId);

    this._raster = raster;
  }

  attachRasterisationMethod(triggerElementId, rasterisationMethod, colors) {
    document
    .getElementById(triggerElementId)
    .addEventListener(
      "click",
      event => {
        event.preventDefault();

        const inputData = this._inputHandler.getInputData();

        const inputFields = RasterHandler.MAP_INPUT_FIELDS;

        const mapWidth = inputData.mapData[inputFields.pixelMapWidth];
        const mapHeight = inputData.mapData[inputFields.pixelMapHeight];
        const pixelSize = inputData.mapData[inputFields.pixelSize];

        this._canvasHandler.initCanvas(
          mapWidth*pixelSize,
          mapHeight*pixelSize
          );

        this.getRaster().initMap(
          mapWidth,
          mapHeight
          );

        inputData.shapeData.forEach(circle => {
          rasterisationMethod.call(
            this.getRaster(),
            ...Object.values(circle)
            );
        });

        const raster = this.getRaster();

        this._canvasHandler.fillCanvasWithRaster(
          raster,
          pixelSize,
          colors
          );
      });
  }

  getRaster() {
    return this._raster;
  }

  getCanvasHandler() {
    return this._canvasHandler;
  }

  getInputHandler() {
    return this._inputHandler;
  }
}

RasterHandler.SHAPE_FIELDS = [];

RasterHandler.MAP_INPUT_FIELDS = {
  pixelSize: "pixel-size",
  pixelMapWidth: "pixel-map-width",
  pixelMapHeight: "pixel-map-height",
}

export { RasterHandler };