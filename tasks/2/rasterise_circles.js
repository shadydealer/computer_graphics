import { CircleRasterCanvasHandler } from "./circle_raster_canvas_handler.js";

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const canvasContainerId = "canvas-container";
    const circleFieldsContainerId = "circle-fields-container";

    const circleRasterCanvasHandler = new CircleRasterCanvasHandler(
      canvasContainerId,
      circleFieldsContainerId
      );

    circleRasterCanvasHandler.attachAddCircleEventListener(
      "addCircle"
      );
    circleRasterCanvasHandler.attachMichenerRasterisationTrigger(
      "michenerRasterisation"
      );
    circleRasterCanvasHandler.attachSecondOrderDiffRasterisationTrigger(
      "secondOrderDiff"
      )
  }
};


