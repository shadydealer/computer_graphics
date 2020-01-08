import { CircleRaster } from "./circle_raster.js";
import { CanvasHandler } from "../../lib/canvas_handler.js";

class CircleRasterCanvasHandler extends CanvasHandler {
  constructor(canvasContaierId, circleFieldsDivId) {
    super(canvasContaierId);

    this._circleFieldsContainer = document.getElementById(circleFieldsDivId);
    this._circleFields = [
    "x",
    "y",
    "r",
    ];
    this._circlesCount = 0;
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

        const inputData = this.getInputData();
        this.initCanvas(inputData);

        this._circleRaster = new CircleRaster(
          Math.round(this.getCanvasWidth()/inputData.pixelSize),
          Math.round(this.getCanvasHeight()/inputData.pixelSize)
          );

        inputData.circlesData.forEach(circle => {
          rasterisationMethod.call(
            this._circleRaster,
            circle.x,
            circle.y,
            circle.r
            );
        });

        const canvas2D = this.getCanvas2D();
        this._circleRaster.fillCanvas2d(
          canvas2D,
          inputData.pixelSize,
          {
            0: "black",
            1: "white"
          });
      });
  }

  attachAddCircleEventListener(triggerElementId) {
    document
    .getElementById(triggerElementId)
    .addEventListener(
      "click",
      event => {
        event.preventDefault();
        this.generateCircleInputFields();
        ++this._circlesCount;
      });
  }

  generateCircleInputFields() {
    const style = "float:left;";

    const divs = this._circleFields.map(name => {

      let inputField = document.createElement("input");
      let newId = name + `${`${this._circlesCount}`}`;
      inputField.name = newId;
      inputField.id = newId;
      inputField.type = "number";
      inputField.min = 0;
      inputField.value = 1;

      let wrapperDiv = document.createElement("div");

      if(name != this._circleFields[this._circleFields.length -1]) {
        wrapperDiv.style = style;
      }

      let textDiv = document.createElement("div");
      textDiv.append(name.toUpperCase()+":");

      let inputFiledDiv = document.createElement("div");
      inputFiledDiv.append(inputField);

      wrapperDiv.append(textDiv);
      wrapperDiv.append(inputFiledDiv);

      return wrapperDiv;
    });

    divs.forEach((div) => {
      this._circleFieldsContainer.append(div);
    });
  }

  getInputData() {
    const inputData = {};
    inputData.pixelSize = Number(document.getElementById("pixelSize").value);

    inputData.circlesData = new Array(this._circlesCount);
    let currentCircleData;

    for(let circleNum = 0; circleNum < this._circlesCount; ++circleNum) {
      currentCircleData = {};

      this._circleFields.forEach(field => {
        currentCircleData[field] = Number(
          document.getElementById(field + `${circleNum}`).value
          );
      });

      inputData.circlesData[circleNum] = currentCircleData;
    }

    return inputData;
  }

  initCanvas(inputData) {
    const canvasDimensions = inputData.circlesData.reduce(
      (currMax, data) => {
        return [
        Math.max(currMax[0], (data.x + data.r + 1)*inputData.pixelSize),
        Math.max(currMax[1], (data.y + data.r + 1)*inputData.pixelSize)
        ];
      },
      [2048,2048]
      );

    this.createCanvas(canvasDimensions[0], canvasDimensions[1]);
  }
}

export { CircleRasterCanvasHandler };