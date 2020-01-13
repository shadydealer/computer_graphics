class InputHandler {
  constructor(
    inputFieldsDivContainerId,
    mapInputFieldIds,
    shapeInputFieldIdPrefixes
    ) {
    this._inputFieldsContainerId = inputFieldsDivContainerId;
    this._mapInputFields = mapInputFieldIds;
    this._shapeInputFieldIdPrefixes = shapeInputFieldIdPrefixes;
    this._shapeCount = 0;
  }

  getMapInputFields() {
    const inputData = {mapData: {}};

    this._mapInputFields.forEach(inputFieldId => {
     inputData.mapData[inputFieldId] = Number(document.getElementById(inputFieldId).value);
    });

    return inputData;
  }

  getShapeInputFields() {
    const inputData = {};
    inputData.shapeData = new Array(this._shapeCount);
    let currentShapeData;

    for(let shapeNum = 0; shapeNum < this._shapeCount; ++shapeNum) {
      currentShapeData = {};

      this._shapeInputFieldIdPrefixes.forEach(field => {
        currentShapeData[field] = Number(
          document.getElementById(field + `-${shapeNum}`).value
          );
      });

      inputData.shapeData[shapeNum] = currentShapeData;
    }

    return inputData;
  }

  getInputData() {
    const mapInputData = this.getMapInputFields();
    const shapeInputData = this.getShapeInputFields();
    return {...mapInputData, ...shapeInputData};
  }

  attachAddShapeOnClick(triggerElementId) {
    document
    .getElementById(triggerElementId)
    .addEventListener(
      "click",
      event => {
        event.preventDefault();
        this.generateShapeInputFields();
        ++this._shapeCount;
      });
  }

  generateShapeInputFields() {
    let  inputFieldsContainer = this.getInputFieldsContainer();
    const style = "float:left;";

    const divs = this._shapeInputFieldIdPrefixes.map(idPrefix => {

      let inputField = document.createElement("input");
      let newId = idPrefix + `-${this._shapeCount}`;
      inputField.idPrefix = newId;
      inputField.id = newId;
      inputField.type = "number";
      inputField.min = 1;
      inputField.value = 1;

      let wrapperDiv = document.createElement("div");

      if(idPrefix != this._shapeInputFieldIdPrefixes[this._shapeInputFieldIdPrefixes.length -1]) {
        wrapperDiv.style = style;
      }

      let textDiv = document.createElement("div");
      textDiv.append(idPrefix+":");

      let inputFiledDiv = document.createElement("div");
      inputFiledDiv.append(inputField);

      wrapperDiv.append(textDiv);
      wrapperDiv.append(inputFiledDiv);

      return wrapperDiv;
    });

    divs.forEach((div) => {
      inputFieldsContainer.append(div);
    });
  }

  getInputFieldsContainer() {
    return document.getElementById(this._inputFieldsContainerId);
  }
}

export { InputHandler };