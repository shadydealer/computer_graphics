import { LineRaster } from "./line_raster.js";

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    document.getElementById("rasterise").addEventListener("click", (event) => {

      event.preventDefault();

      const pixelSize = Number(document.getElementById("pixelSize").value);
      const x1 = Number(document.getElementById("x1").value);
      const y1 = Number(document.getElementById("y1").value);
      const x2 = Number(document.getElementById("x2").value);
      const y2 = Number(document.getElementById("y2").value);

      let canvas = document.getElementById("canvas");

      if(canvas) {
        canvas.parentNode.removeChild(canvas);
      }

      canvas = document.createElement("canvas");
      canvas.id = "canvas";
      canvas.width = Math.max(Math.abs(x2-x1)*pixelSize, 2048);
      canvas.height = Math.max(Math.abs(y2-y1)*pixelSize, 2048);

      document.body.append(canvas);

      const canvas2d = canvas.getContext("2d");


      const dimensions = [
      Math.round(canvas.width/pixelSize),
      Math.round(canvas.height/pixelSize),
      ];

      let raster = new LineRaster(dimensions[0], dimensions[1]);
      raster.bresenhamLine(x1,y1,x2,y2,1);
      raster.fillCanvas2d(canvas2d, pixelSize, {0: "blue", 1: "orange", 2: "yellow"});

    });
  }
};