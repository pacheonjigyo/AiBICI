import { makeAutoObservable, runInAction } from "mobx";
import { APIGateway } from "../../common/Gateway.js";

export class WorkDataStore {
  constructor() {
    makeAutoObservable(this);
  }

  openEngineData: any = null;
  detailedOpenEngineData: any = null;

  getOpenEngineData = async (view: number, page: number) => {
    this.openEngineData = null;

    const openEngineData = await APIGateway(
      {
        query: `guest/inputList`,
        data: {
          data: {
            view,
            page,
            user: "all",
          },
        },
        method: "POST",
        auth: false,
      },
      false,
    );

    if (openEngineData.error) {
      alert(openEngineData.error.message);

      return;
    }

    runInAction(() => {
      this.openEngineData = openEngineData.list;
    });
  };

  getDetailedOpenEngineData = async (id: string) => {
    this.detailedOpenEngineData = null;

    const detailedOpenEngineData = await APIGateway(
      {
        query: `guest/inputList/${id}`,
        data: null,
        method: "GET",
        auth: false,
      },
      false,
    );

    if (detailedOpenEngineData.error) {
      alert(detailedOpenEngineData.error.message);

      return;
    }

    runInAction(() => {
      this.detailedOpenEngineData = detailedOpenEngineData.view;
    });
  };
}
