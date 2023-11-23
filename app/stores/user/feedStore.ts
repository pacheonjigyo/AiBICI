import { makeAutoObservable } from "mobx";
import { APIGateway } from "../../common/Gateway.js";

export class feedStore {
  constructor() {
    makeAutoObservable(this);
  }

  feedType = 0;

  feedUploadModal = false;
  feedDetailModal = false;

  feedInput: any = {
    feedId: null,
    commentId: null,

    index: -1,

    thumbnail: "",
    content: "",
    attached: "",
    comment: "",
  };

  feedData: any = null;
  feedDetailedData: any = null;

  setFeedType = (value: number) => {
    this.feedType = value;
  };

  setFeedDetailModal = (value: boolean) => {
    this.feedDetailModal = value;
  };

  setFeedUploadModal = (value: boolean) => {
    this.feedUploadModal = value;
  };

  setFeedCommentData = async (index: number, comment: string) => {
    this.feedData.collect.repagination[index].comment = comment;
  };

  getFeedData = async (view: number, page: number) => {
    this.feedData = null;

    const feedData = await APIGateway(
      {
        query: `feed/list`,
        method: "POST",
        auth: false,
        data: {
          data: {
            page,
            view,
          },
        },
      },
      true,
    );

    if (feedData.error) {
      alert(feedData.error.message);

      return;
    }

    const feedContents = await Promise.all(
      feedData.collect.repagination.map(async (v, i) => {
        if (!v.title) {
          return {
            ...v,

            seq: i,
            content: "",
            comment: "",
          };
        }

        const contentHtml = await fetch(v.title);
        const contentText = await contentHtml.text();

        console.log(v.title);

        const difference =
          new Date().getTime() - new Date(v.createdAt).getTime();

        let seconds = Math.floor(difference / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let dates = Math.floor(hours / 24);
        let months = Math.floor(dates / 30);

        const years = Math.floor(months / 12);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;
        dates = dates % 30;
        months = months % 12;

        return {
          ...v,

          seq: i,
          content: contentText,
          comment: "",
          time: {
            years,
            months,
            dates,
            hours,
            minutes,
            seconds,
          },
        };
      }),
    );

    const repagination = feedContents.sort((a, b) => a.seq - b.seq);

    console.log(repagination);

    this.feedData = feedData;
    this.feedData.collect.repagination = repagination;
  };

  getFeedDetailedData = async (feedId: number, option: any) => {
    const feedDetailedData = await APIGateway(
      {
        query: "feed/view",
        data: {
          data: {
            ...option,
            feedId,
          },
        },
        method: "POST",
        auth: true,
      },
      false,
    );

    if (feedDetailedData.error) {
      alert(feedDetailedData.error.message);

      return;
    }

    if (option.all || option.content) {
      const desc = feedDetailedData.select.setFeed.title;

      const contentHtml = await fetch(desc);
      const contentText = await contentHtml.text();

      feedDetailedData.select.setFeed.content = contentText;
    }

    console.log(feedDetailedData);

    if (option.all) {
      this.feedDetailedData = feedDetailedData;
    } else if (option.comment) {
      this.feedDetailedData.select.initValue =
        feedDetailedData.select.initValue;
    } else {
      this.feedDetailedData.select.setFeed = feedDetailedData.select.setFeed;
    }

    this.feedData.collect.repagination.find(
      (v) => v.id === feedId,
    ).feedBoardComment = feedDetailedData.select.initValue;
  };

  setFeedInput = async (value: any) => {
    this.feedInput = value;
  };

  addFeedContent = async () => {
    const feedData = await APIGateway(
      {
        query: "feed/write",
        data: {
          data: {
            title: this.feedInput.content,
            content: "",
            attached: this.feedInput.attached,
            thumbnail: this.feedInput.thumbnail,
          },
        },
        method: "POST",
        auth: true,
      },
      false,
    );

    if (feedData.error) {
      alert(feedData.error.message);

      return;
    }

    alert("게시글이 등록되었습니다.");

    this.getFeedData(10, 1);
  };

  addFeedComment = async (
    feedId: number,
    commentId: number | null,
    comment: string,
  ) => {
    await APIGateway(
      {
        query: `feed/comment/write`,
        method: "POST",
        auth: true,
        data: {
          data: {
            reComment: commentId ? true : false,
            comment: commentId ? false : true,
            feedId,
            commentId,
            content: comment,
          },
        },
      },
      true,
    );

    this.getFeedDetailedData(feedId, {
      comment: true,
    });
  };

  likeFeedContent = async (feedId: number) => {
    const likeData = await APIGateway(
      {
        query: `feed/like`,
        method: "POST",
        auth: true,
        data: {
          data: {
            feedId,
            like: true,
          },
        },
      },
      true,
    );

    if (likeData.error) {
      alert(likeData.message);

      return;
    }

    this.getFeedData(10, 1);
  };
}
