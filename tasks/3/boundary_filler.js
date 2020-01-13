class BoundaryFiller {
  static StackedBoundaryFill_4(raster, x, y, emptyValue, fillValue, boundaryValue) {
    let pointStack = [];
    let point = {x: x, y: y};
    pointStack.push(point);

    let xLeft;
    let xRight;
    let leftBound;
    let rightBound;
    let pixel1;
    let pixel2;

    while(pointStack.length) {
      point = pointStack.pop();

      pixel1 = raster.getPixel(point.x, point.y);
      if(pixel1 != emptyValue) continue;

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
      pixel1;
      pixel2;

      for(let nexty = point.y-1; nexty<point.y+2; nexty+=2) {
        pixel1 = raster.getPixel(xLeft,nexty);

        for(let x = xLeft; x <= xRight; ++x) {
          pixel2 = raster.getPixel(x + 1, nexty);

          if( pixel1 == emptyValue &&
             (pixel2 == boundaryValue || pixel2 == undefined)) {
            point.x = x;
            point.y = nexty;
            pointStack.push(point);
            break;
          }
          pixel1=pixel2;
        }
      }
    }
  }
}

export { BoundaryFiller };