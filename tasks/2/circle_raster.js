import { Raster } from "../../lib/raster.js";

class CircleRaster extends Raster {
  constructor(x, y) {
    super(x,y);
  }

  michenerCircle(xc, yc, r) {
    let y = r;
    let d = 3 - 2*r;
    this.eightSymmetric(xc,yc,0,r);
    for(let x= 0; x < y; ++x) {
      if(d >= 0) {
        d+= 10 +4*x-4*(y--);
      }
      else{
        d+= 6+4*x;
      }
      this.eightSymmetric(xc,yc,x,y);
    }
  }

  secondOrderDiffCircle(xc, yc, r) {
    let d = 1 - r;
    let y = r;
    let dH = 3;
    let dD = 5 - 2*r;
    this.eightSymmetric(xc, yc, 0, r);
    for(let x = 0; x < y; x++) {
      if(d < 0) {
        d += dH;
        dH +=2;
        dD +=2;
      }else {
        d += dD;
        dH +=2;
        dD +=4;
        --y;
      }
      this.eightSymmetric(xc,yc, x, y);
    }
  }

  eightSymmetric(xc, yc, x, y) {
    this.fourSymmetric(xc, yc, x, y);
    this.fourSymmetric(xc, yc, y, x);
  }

  fourSymmetric(xc, yc, x, y) {
    if(this.pixelExists(xc + x, yc + y)) {
      this.setPixel(xc + x, yc + y, 1);
    }
    if(this.pixelExists(xc - x, yc - y)) {
      this.setPixel(xc - x, yc - y, 1);
    }
    if(this.pixelExists(xc - x, yc + y)) {
      this.setPixel(xc - x, yc + y, 1);
    }
    if(this.pixelExists(xc + x, yc - y)) {
      this.setPixel(xc + x, yc - y, 1);
    }
  }
}

export { CircleRaster };