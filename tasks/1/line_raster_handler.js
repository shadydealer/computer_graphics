import { LineRaster } from "./line_raster.js";
import { RasterHandler } from "../../lib/raster_handler.js";

class LineRasterHandler extends RasterHandler {
  constructor(canvasContaierId) {
    super(
      canvasContaierId,
      new LineRaster(),
      "add-line",
      LineRasterHandler.LINE_FIELDS
      );
  }

  attachBresenhamRasterisationMethod(triggerElementId) {
    this.attachRasterisationMethod(
      triggerElementId,
      this.getRaster().bresenhamLine,
      {
        0: "black",
        1: "white",
        2: "orange"
      });
  }
}

LineRasterHandler.LINE_FIELDS = [
"x1",
"y1",
"x2",
"y2",
"thickness"
];

export { LineRasterHandler };