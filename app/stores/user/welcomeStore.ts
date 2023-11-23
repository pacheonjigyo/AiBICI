import { makeAutoObservable, runInAction } from "mobx";
import { sleep } from "../../common/Functions.js";

export class welcomeStore {
  appInfo: any = null;

  constructor() {
    makeAutoObservable(this);

    const appInfo = JSON.parse(
      localStorage.getItem("web_aibici_storage") ?? "{}",
    );

    if (Object.keys(appInfo).length > 0) {
      this.appInfo = appInfo;
    }

    this.mainTextLoop(0);
    this.mainImageLoop();
  }

  mainImageData = {
    opacity: 1,
  };

  mainTextData = {
    color: "",
    text: "",
  };

  mainTextDataSet = [
    {
      color: "#ffffff",
      text: {
        ko: "브랜드가",
        en: "Brand,",
      },
    },

    {
      color: "#ffffff",
      text: {
        ko: "디자이너가",
        en: "Designer,",
      },
    },

    {
      color: "#ffffff",
      text: {
        ko: "창업 지원이",
        en: "Start-up,",
      },
    },

    {
      color: "#ffffff",
      text: {
        ko: "브랜드 보호가",
        en: "Protect a Brand,",
      },
    },
  ];

  mainTextLoop = async (index: number) => {
    let start = 0;

    this.mainTextData.color = this.mainTextDataSet[index].color;

    while (
      this.mainTextData.text !==
      this.mainTextDataSet[index].text[this.appInfo.language]
    ) {
      runInAction(() => {
        this.mainTextData.text +=
          this.mainTextDataSet[index].text[this.appInfo.language][start];
      });

      await sleep(300 * 1);

      start += 1;
    }

    await sleep(1000 * 3);

    while (this.mainTextData.text !== "") {
      runInAction(() => {
        this.mainTextData.text = this.mainTextData.text.slice(0, start - 1);
      });

      await sleep(50 * 1);

      start -= 1;
    }

    runInAction(() => {
      this.mainTextLoop((index + 1) % this.mainTextDataSet.length);
    });
  };

  mainImageLoop = async () => {
    let start = 0;

    while (start < 100) {
      start += 1;

      runInAction(() => {
        this.mainImageData.opacity = start / 100;
      });

      await sleep(10 * 1);
    }

    await sleep(1000 * 3);

    while (start > 0) {
      start -= 1;

      runInAction(() => {
        this.mainImageData.opacity = start / 100;
      });

      await sleep(10 * 1);
    }

    await sleep(1000 * 3);

    runInAction(() => {
      this.mainImageLoop();
    });
  };
}
