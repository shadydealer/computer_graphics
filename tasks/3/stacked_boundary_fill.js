import { CircleRasterHandler } from "../2/circle_raster_handler.js";
import { BoundaryFiller } from "./boundary_filler.js";

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const canvasContainerId = "canvas-container";

    const circleRasterHandler = new CircleRasterHandler(
      canvasContainerId
      );

    circleRasterHandler.attachMichenerRasterisationTrigger(
      "michener-rasterisation"
      );
    circleRasterHandler.attachSecondOrderDiffRasterisationTrigger(
      "second-order-rasterisation"
      );

    document
    .getElementById(canvasContainerId)
    .addEventListener("click", (event) => {
      event.preventDefault();

      const circleRaster = circleRasterHandler.getRaster();

      const pixelSize = circleRasterHandler
      .getInputHandler()
      .getMapInputData().mapData["pixel-size"];

      const pixel = {
        x: Math.round((event.x - event.target.offsetLeft)/pixelSize),
        y: Math.round((event.y - event.target.offsetTop)/pixelSize),
      };

      const rasterValues = {
        empty: 0,
        boundary: 1,
        filling: 2,
      };

      const canvasHandler = circleRasterHandler.getCanvasHandler();

      BoundaryFiller.StackedBoundaryFill_4(
        canvasHandler,
        circleRaster,
        [
        {
          x: pixel.x,
          y: pixel.y
        }
        ],
        rasterValues.empty,
        rasterValues.filling,
        rasterValues.boundary
        );
    });
  }
};



