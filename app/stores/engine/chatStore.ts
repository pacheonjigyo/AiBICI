import { makeAutoObservable, runInAction } from "mobx";
import { EngineGateway } from "../../common/Gateway.js";

export class engineChatStore {
  constructor() {
    makeAutoObservable(this);
  }

  chatData: any = {
    option: false,

    loading: false,

    messageEnd: null,
    messages: [],

    prompt: "",

    step: 0,
    subStep: 0,
  };

  getChatResponse = async (prompt: string) => {
    this.chatData.loading = true;

    const chatData = await EngineGateway({
      query: "chat/v1",
      method: "POST",
      data: {
        prompt,
      },
      auth: false,
    });

    runInAction(() => {
      this.chatData.loading = false;
    });

    if (chatData.error) {
      return chatData.error.message;
    }

    return chatData.choices[0].message.content;
  };

  setChatData = (value: any) => {
    this.chatData = value;
  };
}
