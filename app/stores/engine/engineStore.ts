import { makeAutoObservable, runInAction } from "mobx";
import { APIGateway } from "../../common/Gateway.js";

export class engineStore {
  constructor() {
    makeAutoObservable(this);
  }

  drawingData: any = {
    selected: 0,
    data: "",
    prompt: "",
    loading: false,
  };

  engineData: any = null;

  floatingTips = false;

  isPreview = false;
  isKeypadOpen = false;
  imageCreateModal = false;

  logoGeneratorModal = false;
  logoEditorModal = false;
  logoSaveModal = false;
  logoSwiper: any = null;
  logoStep = 0;

  manualCreateModal = false;

  step = 1;
  symbolSettingModal = false;

  rankSlogan = false;
  rankCoreValue = false;

  setRankSlogan = (value: boolean) => {
    this.rankSlogan = value;
  };

  setRankCoreValue = (value: boolean) => {
    this.rankCoreValue = value;
  };

  setLogoSaveModal = (value: boolean) => {
    this.logoSaveModal = value;
  };

  setLogoSwiper = (value: any) => {
    this.logoSwiper = value;
  };

  setLogoStep = (value: number) => {
    this.logoStep = value;

    if (!this.logoSwiper) {
      return;
    }

    this.logoSwiper.slideTo(value);
  };

  setFloatingTips = (value: boolean) => {
    this.floatingTips = value;
  };

  setKeypadOpen = (value: boolean) => {
    this.isKeypadOpen = value;
  };

  setPreview = (value: boolean) => {
    this.isPreview = value;
  };

  setStep = (value: number) => {
    this.step = value;
  };

  setLogoGeneratorModal = (value: boolean) => {
    this.logoGeneratorModal = value;
  };

  setLogoEditorModal = (value: boolean) => {
    this.logoEditorModal = value;
  };

  setSymbolSettingModal = (value: boolean) => {
    this.symbolSettingModal = value;
  };

  setManualCreateModal = (value: boolean) => {
    this.manualCreateModal = value;
  };

  setImageCreateModal = (value: boolean) => {
    this.imageCreateModal = value;
  };

  setDrawingData = (value: any) => {
    this.drawingData = value;
  };

  getEngineData = async (view: number, page: number) => {
    this.engineData = null;

    const engineData = await APIGateway(
      {
        query: `inputList`,
        method: "POST",
        auth: true,
        data: {
          data: {
            view,
            page,
            section: "logo",
            used: "y",
          },
        },
      },
      true,
    );

    if (engineData.error) {
      alert(engineData.error.message);

      return;
    }

    runInAction(() => {
      this.engineData = engineData;
    });
  };
}
