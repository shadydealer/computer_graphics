import { CircleRaster } from "./circle_raster.js";
import { RasterHandler } from "../../lib/raster_handler.js";

class CircleRasterHandler extends RasterHandler {
  constructor(canvasContaierId) {
    super(
      canvasContaierId,
      new CircleRaster(),
      "add-circle",
      CircleRasterHandler.CIRCLE_FIELDS
      );
  }

  attachMichenerRasterisationTrigger(triggerElementId) {
    this.attachRasterisationMethod(
      triggerElementId,
      this.getRaster().michenerCircle,
      {
        0: "black",
        1: "white",
      });
  }

  attachSecondOrderDiffRasterisationTrigger(triggerElementId) {
    this.attachRasterisationMethod(
      triggerElementId,
      this.getRaster().secondOrderDiffCircle,
      {
        0: "black",
        1: "white",
      });
  }
}

CircleRasterHandler.CIRCLE_FIELDS = [
"x",
"y",
"r",
];

export { CircleRasterHandler };