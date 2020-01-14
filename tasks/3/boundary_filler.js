class BoundaryFiller {
  static StackedBoundaryFill_4(
    canvasHandler, raster,
    pointStack,
    emptyValue, fillValue, boundaryValue) {

    let xLeft;
    let xRight;
    let leftBound;
    let rightBound;
    let pixel1;
    let pixel2;
    let point;

    let newStack=[];

    while(pointStack.length) {

      let point = pointStack.pop();

      pixel1 = raster.getPixel(point.x, point.y);

      if (pixel1 != emptyValue) continue;

      xLeft = point.x;
      xRight = point.x;

      leftBound = raster.getPixel(xLeft,point.y);
      rightBound = raster.getPixel(xRight,point.y);

      while(leftBound == emptyValue){
        --xLeft;
        leftBound = raster.getPixel(xLeft,point.y);
      }
      ++xLeft;

      while(rightBound == emptyValue) {
        ++xRight;
        rightBound = raster.getPixel(xRight,point.y);
      }
      --xRight;

      raster.setPixelRow(xLeft, xRight, point.y, fillValue);
      canvasHandler.fillCanvasWithRaster(
        raster,
        {
          0: "black",
          1: "white",
          2: "orange"
        });

      for(let nexty = point.y-1; nexty < point.y+2; nexty+=2) {
        pixel1 = raster.getPixel(xLeft,nexty);

        for(let x = xLeft; x <= xRight; ++x) {
          pixel2 = raster.getPixel(x + 1, nexty);

          if( pixel1 == emptyValue && (pixel2 == boundaryValue || pixel2 == undefined)) {
            newStack.push({x: x, y: nexty});
          }

          pixel1=pixel2;
        }

        if(raster.getPixel(xRight, nexty) == emptyValue){
          newStack.push({x: xRight, y: nexty});
        }
      }

      setTimeout(()=> {
        BoundaryFiller.StackedBoundaryFill_4(
          canvasHandler, raster,
          newStack,
          emptyValue, fillValue, boundaryValue
          );
      }, 100);
    }
  }
}

export { BoundaryFiller };