import { Raster } from "../../lib/raster.js";

class LineRaster extends Raster {
  constructor(x, y) {
    super(x,y);
  }

  bresenhamLine(x1, y1, x2, y2, thickness) {
    let dx = Math.abs(x2-x1);
    let dy = Math.abs(y2-y1);


    let reverse;
    if(reverse =(dx < dy)){
      [x1,y1,x2,y2,dx,dy] = [y1,x1,y2,x2,dy,dx];
    }

    let incUP = 2*dy - 2*dx;
    let incDN = 2*dy;
    let d = 2*dy - dx;

    let incX = x1 <= x2 ? 1 : -1;
    let incY = y1 <= y2 ? 1 : -1;

    let x = x1;
    let y = y1;
    let n = dx + 1;

    let tempx;
    let tempy;

    while(n--) {
      if(reverse) {
        tempx = y;
        tempy = x;
      }else{
        tempx = x;
        tempy = y;
      }

      for(let i = -thickness; i <= thickness; ++i) {
        for(let j = -thickness; j <= thickness; ++j) {
          if(this.pixelExists(tempx + i, tempy + j)) {
            if(i == 0 && j == 0) {
              this.setPixel(tempx, tempy, 1);
            }
            else if(this.getPixel(tempx + i, tempy + j) == 0){
              this.setPixel(tempx + i, tempy + j, 2);
            }
          }
        }
      }

      if(d > 0) {
        d+= incUP;
        y+= incY;
      }else {
        d+= incDN;
      }
      x+=incX;
    }
  }
}

export { LineRaster };