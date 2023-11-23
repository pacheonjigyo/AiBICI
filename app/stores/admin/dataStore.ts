import { makeAutoObservable, runInAction } from "mobx";
import { APIGateway } from "../../common/Gateway.js";

export class adminDataStore {
  constructor() {
    makeAutoObservable(this);
  }

  userEngineData: any = null;

  userServiceData: any = null;
  userServiceDetailed: any = {};

  getUserEngineData = async (view: number, page: number) => {
    this.userEngineData = null;

    const userEngineData = await APIGateway(
      {
        query: `sysop/session/inputlists`,
        data: {
          data: {
            page,
            view,
            user: "all",
            section: "details",
          },
        },
        method: "POST",
        auth: true,
      },
      false,
    );

    if (userEngineData.error) {
      alert(userEngineData.error.message);

      return;
    }

    runInAction(() => {
      this.userEngineData = userEngineData;
    });
  };

  getUserServiceData = async (view: number, page: number) => {
    this.userServiceData = null;

    const userServiceData = await APIGateway(
      {
        query: `sysop/session/servicelist`,
        data: {
          data: {
            page,
            view,
            user: "all",
            section: "group",
          },
        },
        method: "POST",
        auth: true,
      },
      true,
    );

    if (userServiceData.error) {
      alert(userServiceData.error.message);

      return;
    }

    runInAction(() => {
      this.userServiceData = userServiceData;
    });
  };
}
