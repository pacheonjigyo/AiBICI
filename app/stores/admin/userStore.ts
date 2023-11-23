import { makeAutoObservable, runInAction } from "mobx";
import { floatingToast } from "../../common/FloatingToast.js";
import { APIGateway } from "../../common/Gateway.js";

export class adminUserStore {
  constructor() {
    makeAutoObservable(this);
  }

  userListResults: any = null;

  updateUserGrade = async (
    index: number,
    id: number,
    grade: number,
    isDesktop: boolean,
  ) => {
    const userGradeData = await APIGateway(
      {
        query: `sysop/session/userlist/${id}`,
        data: {
          grade,
        },
        method: "PATCH",
        auth: true,
      },
      true,
    );

    if (userGradeData.error) {
      alert(userGradeData.error.message);

      return;
    }

    runInAction(() => {
      this.userListResults.pagination[index].userGrade.grade = grade;
    });

    floatingToast("권한이 설정되었습니다.", "success", isDesktop);
  };

  getUserLists = async (view: number, page: number) => {
    this.userListResults = null;

    const userListData = await APIGateway(
      {
        query: `sysop/session/userlist?view=${view}&page=${page}`,
        data: {
          data: {
            view,
            page,
          },
        },
        method: "POST",
        auth: true,
      },
      true,
    );

    if (userListData.error) {
      alert(userListData.error.message);

      return;
    }

    runInAction(() => {
      this.userListResults = userListData;
      this.userListResults.pagination = this.userListResults.pagination.filter(
        (v) => v.id !== 1,
      );
    });
  };
}
