import { LineRasterHandler } from "./line_raster_handler.js";

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const canvasContainerId = "canvas-container";
    const lineRasterHandler = new LineRasterHandler("canvas-container");
    lineRasterHandler.attachBresenhamRasterisationMethod("rasterise");
  }
};