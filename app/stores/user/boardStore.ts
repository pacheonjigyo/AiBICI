import { makeAutoObservable, runInAction } from "mobx";
import { APIGateway } from "../../common/Gateway.js";
import { Board, BoardInput, Notice } from "../../types.js";

export class boardStore {
  constructor() {
    makeAutoObservable(this);
  }

  boardCreateModal = false;

  boardInput = {
    category: "",
    title: "",
    thumbnail: "",
    content: "",
    attached: "",
  };

  boardAllData: any = null;
  boardNewsData: any = null;
  boardNoticeData: any = null;
  boardNewsDetailed: Board | null = null;
  boardNoticeDetailed: Notice | null = null;

  setBoardCreateModal = (value: boolean) => {
    this.boardCreateModal = value;
  };

  getBoardData = async (
    category: string | undefined,
    view: number,
    page: number,
  ) => {
    this.boardAllData = null;
    this.boardNewsData = null;
    this.boardNoticeData = null;

    const boardData = await APIGateway(
      {
        query: `board/list`,
        method: "POST",
        auth: false,
        data: {
          data: {
            page,
            view,
            search: {
              category,
            },
          },
        },
      },
      true,
    );

    if (boardData.error) {
      alert(boardData.error.message);

      return;
    }

    runInAction(() => {
      switch (category) {
        case undefined: {
          this.boardAllData = boardData;

          break;
        }

        case "info": {
          this.boardNewsData = boardData;

          break;
        }

        case "notice": {
          this.boardNoticeData = boardData;

          break;
        }

        default:
          break;
      }
    });
  };

  initBoardDetailed = async (category: string) => {
    switch (category) {
      case "info": {
        this.boardNewsDetailed = {
          author: "",
          content: "",
          hit: 0,
          id: 0,
          title: "",
          createdAt: "",
          updatedAt: "",
        };

        break;
      }

      case "notice": {
        this.boardNoticeDetailed = {
          author: "",
          content: "",
          hit: 0,
          id: 0,
          title: "",
          updatedAt: "",
          attached: "",
        };

        break;
      }

      default:
        break;
    }
  };

  getBoardDetailed = async (id: string, category: string) => {
    this.boardNewsDetailed = null;
    this.boardNoticeDetailed = null;

    const boardDetailed = await APIGateway(
      {
        query: `board/list/${id}`,
        method: "GET",
        auth: true,
        data: null,
      },
      true,
    );

    if (boardDetailed.error) {
      alert(boardDetailed.error.message);

      return;
    }

    const htmlResp = await fetch(boardDetailed.content);
    const htmlText = await htmlResp.text();

    boardDetailed.content = htmlText;

    switch (category) {
      case "info": {
        this.boardNewsDetailed = boardDetailed;

        break;
      }

      case "notice": {
        this.boardNoticeDetailed = boardDetailed;

        break;
      }

      default:
        break;
    }
  };

  uploadBoardData = async () => {
    const uploadResult = await APIGateway(
      {
        query: `board/write`,
        method: "POST",
        auth: true,
        data: this.boardInput,
      },
      true,
    );

    if (uploadResult.error) {
      alert(uploadResult.error.message);

      return;
    }
  };

  setBoardInput = async (value: BoardInput) => {
    this.boardInput = value;
  };
}
