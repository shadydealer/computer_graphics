import { CircleRasterHandler } from "./circle_raster_handler.js";

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const canvasContainerId = "canvas-container";
    const circleFieldsContainerId = "circle-fields-container";

    const circleRasterHandler = new CircleRasterHandler(
      canvasContainerId
      );

    circleRasterHandler.attachMichenerRasterisationTrigger(
      "michener-rasterisation"
      );
    circleRasterHandler.attachSecondOrderDiffRasterisationTrigger(
      "second-order-rasterisation"
      )
  }
};


