import { makeAutoObservable, runInAction } from "mobx";
import { APIGateway } from "../../common/Gateway.js";

export class LibraryDataStore {
  constructor() {
    makeAutoObservable(this);
  }

  libraryData: any = null;

  page = 1;

  step = 0;

  currentImageIndex = 0;

  setPage = (value: number) => {
    this.page = value;
  };

  setCurrentImageIndex = (value: number) => {
    this.currentImageIndex = value;
  };

  setStep = (value: number) => {
    this.step = value;
  };

  createLibraryData = async (url: string) => {
    const libraryResp = await APIGateway(
      {
        query: "librarycreate",
        method: "POST",
        data: {
          upload: "y",
          data: [
            {
              logo: url,
            },
          ],
        },
        auth: true,
      },
      false,
    );

    if (libraryResp.error) {
      alert(libraryResp.error.message);

      return;
    }

    alert("이미지가 등록되었습니다.");

    runInAction(() => {
      this.getLibraryData(10, 1);
    });
  };

  getLibraryData = async (view: number, page: number) => {
    this.libraryData = null;

    const libraryList = await APIGateway(
      {
        query: `librarylist`,
        method: "POST",
        auth: true,
        data: {
          data: {
            page,
            view,
            section: "logo",
          },
        },
      },
      true,
    );

    if (libraryList.error) {
      alert(libraryList.error.message);

      return;
    }

    runInAction(() => {
      this.libraryData = libraryList.list;
    });
  };

  deleteLibraryData = async (id: number) => {
    const accept = confirm("정말로 삭제하시겠습니까?");

    if (!accept) {
      return;
    }

    const libraryList = await APIGateway(
      {
        query: `librarychange`,
        method: "PATCH",
        auth: true,
        data: {
          data: [{ id }],
        },
      },
      true,
    );

    if (libraryList.error) {
      alert(libraryList.error.message);

      return;
    }

    runInAction(() => {
      this.getLibraryData(10, 1);
    });
  };
}
