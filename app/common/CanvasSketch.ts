import { fabric } from "fabric";

export class CanvasSketch {
  canvas: any = null;
  commonStore: any = null;

  constructor(commonStore: any) {
    this.commonStore = commonStore;

    this.canvas = new fabric.Canvas("sketch", {
      isDrawingMode: true,

      backgroundColor: "white",
    });

    const canvas: any = document.getElementById("sketch");

    console.log(canvas.width);
    console.log(canvas.height);

    fabric.Object.prototype.transparentCorners = false;

    this.canvas.setDimensions({
      width: 268,
      height: 268,
    });

    if (this.canvas.freeDrawingBrush) {
      this.canvas.freeDrawingBrush.color = "black";
      this.canvas.freeDrawingBrush.width = 5;
    }
  }

  clearCanvas = () => {
    this.canvas.clear();
    this.canvas.backgroundColor = "white";

    this.canvas.renderAll();
  };

  getCanvasDataURL = () => {
    const data = this.canvas.toDataURL({
      format: "jpg",
    });

    return data.split(",")[1];
  };
}
