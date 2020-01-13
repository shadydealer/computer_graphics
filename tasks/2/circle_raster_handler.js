import { CircleRaster } from "./circle_raster.js";
import { CanvasHandler } from "../../lib/canvas_handler.js";
import { InputHandler } from "../../lib/input_handler.js";

class CircleRasterHandler {
  constructor(canvasContaierId) {
    this._inputHandler = new InputHandler(
      "input-fields-container",
      Object.values(CircleRasterHandler.MAP_INPUT_FIELDS),
      CircleRasterHandler.CIRCLE_FIELDS
      );
    this._inputHandler.attachAddShapeOnClick("add-circle");

    this._canvasHandler = new CanvasHandler(canvasContaierId);

    this._circleRaster;
  }

  attachMichenerRasterisationTrigger(triggerElementId) {
    this.attachRasterisationMethod(triggerElementId, new CircleRaster().michenerCircle);
  }

  attachSecondOrderDiffRasterisationTrigger(triggerElementId) {
    this.attachRasterisationMethod(triggerElementId, new CircleRaster().secondOrderDiffCircle);
  }

  attachRasterisationMethod(triggerElementId, rasterisationMethod) {
    document
    .getElementById(triggerElementId)
    .addEventListener(
      "click",
      event => {
        event.preventDefault();

        const inputData = this._inputHandler.getInputData();

        const inputFields = CircleRasterHandler.MAP_INPUT_FIELDS;

        const mapWidth = inputData.mapData[inputFields.pixelMapWidth];
        const mapHeight = inputData.mapData[inputFields.pixelMapHeight];
        const pixelSize = inputData.mapData[inputFields.pixelSize];

        this._canvasHandler.initCanvas(
          mapWidth*pixelSize,
          mapHeight*pixelSize
          );

        this._circleRaster = new CircleRaster(
          mapWidth,
          mapHeight
          );

        inputData.shapeData.forEach(circle => {
          rasterisationMethod.call(
            this._circleRaster,
            circle.x,
            circle.y,
            circle.r
            );
        });

        const rasterMap = this._circleRaster.getMap();

        this._canvasHandler.fillCanvasWithRaster(
          rasterMap,
          pixelSize,
          {
            0: "black",
            1: "white"
          });
      });
  }

  getCircleRaster() {
    return this._circleRaster;
  }
}

CircleRasterHandler.CIRCLE_FIELDS = [
"x",
"y",
"r",
];

CircleRasterHandler.MAP_INPUT_FIELDS = {
  pixelSize: "pixel-size",
  pixelMapWidth: "pixel-map-width",
  pixelMapHeight: "pixel-map-height",
}

export { CircleRasterHandler };