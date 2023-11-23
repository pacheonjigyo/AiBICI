import { makeAutoObservable } from "mobx";

export class canvasStore {
  constructor() {
    makeAutoObservable(this);
  }

  effect: any = false;

  sketch: any = null;

  canvas: any = null;
  canvasPreview: any = 100;

  externalCanvas = false;

  palette: any = {
    main: "#000000",
    sub: "#ffffff",
  };

  logoLocked = false;
  logoShape = "rectangle";
  logoMenu = 0;
  logoType = 0;

  textData = "여기에 내용을 입력하세요.";

  layers: any = [];
  layerCurrentId = -1;

  placePopOver = false;
  alignPopOver = false;

  canvasState = {
    undo: [],
    redo: [],
  };

  group = false;

  setEffect = (value: boolean) => {
    this.effect = value;
  };

  setSketch = (value: any) => {
    this.sketch = value;
  };

  setGroup = (value: boolean) => {
    this.group = value;
  };

  setCanvasState = (value: any) => {
    this.canvasState = value;
  };

  setExternalCanvas = (value: boolean) => {
    this.externalCanvas = value;
  };

  setLogoType = (value: number) => {
    this.logoType = value;
  };

  setAlignPopOver = (value: boolean) => {
    this.alignPopOver = value;
  };

  setPlacePopOver = (value: boolean) => {
    this.placePopOver = value;
  };

  setLayerCurrentId = (value: number) => {
    this.layerCurrentId = value;
  };

  setLayers = (value: any) => {
    this.layers = value;
  };

  updateZoom = () => {
    this.canvasPreview = this.canvas.previewSize;
  };

  setTextData = (value: string) => {
    this.textData = value;
  };

  setCanvas = (value: any) => {
    this.canvas = value;
  };

  setPalette = (value: any) => {
    this.palette = value;
  };

  setLogoLocked = (value: boolean) => {
    this.logoLocked = value;

    this.canvas.setLogoLocked(value);
  };

  setLogoShape = (value: string) => {
    this.logoShape = value;

    this.canvas.setLogoShape(value);
  };

  setLogoMenu = (value: number) => {
    this.logoMenu = value;
  };
}
