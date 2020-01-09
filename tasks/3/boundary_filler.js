class boundaryFiller {
  StackedBoundaryFill_4(raster, x, y, fillValue, boundaryValue) {
    let pointStack = [];
    let point = {x: x, y: y};
    pointStack.push(point);

    let xleft;
    let xRight;

    while(pointStack.length) {
      point = pointStack.pop();

      if(this._raster.getPixel(point.x, point.y) == fillValue) continue;

      xLeft = point.x;
      xRight = point.y;

      while(this._raster.getPixel(xLeft-1,y) != boundaryValue) --xLeft;
      while(this._raster.getPixel(xRight+1,y) != boundaryValue) ++xLeft;

      this._raster.putPixelRow(xLeft, xRight, y, fillValue);
      let p1;
      let p2;
      for(let nexty = y-1; nexty<y+2; nexty+=2) {
        p1 = this._raster.getPixel(xLeft,nexty);
        for(let x = xLeft; x < xRight; ++x) {
          p2 = this._raster.getPixel(x + 1, nexty);
          if(p1 != fillValue && p2 == boundaryValue) {
            point.x = x;
            point.y = nexty;
            pointStack.push(point);
          }
          p1=p2;
        }
      }
    }
  }
}