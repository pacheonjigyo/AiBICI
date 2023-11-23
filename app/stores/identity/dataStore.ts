import { makeAutoObservable, runInAction } from "mobx";
import { APIGateway } from "../../common/Gateway.js";

export class IdentityDataStore {
  constructor() {
    makeAutoObservable(this);
  }

  page = 1;

  serviceData: any = null;

  serviceInfo: any = {
    id: -1,

    modal: false,
  };

  challengeData: any = null;
  challengeDetailedData: any = null;

  productData: any = null;
  productDetailedData: any = null;

  detailedData: any = null;
  detailedSectionData: any = null;

  detailedInfo: any = {
    id: -1,

    modalDetail: false,
    modalProduct: false,
    modalChallenge: false,
  };

  setProductDetailedData;
  getChallengeData = async (view: number, page: number) => {
    this.challengeData = null;

    const challengeData = await APIGateway(
      {
        query: `listUserChallenge`,
        method: "POST",
        auth: true,
        data: {
          data: {
            view,
            page,
            search: {
              status: "start",
            },
          },
        },
      },
      true,
    );

    if (challengeData.error) {
      alert(challengeData.error.message);

      return;
    }

    runInAction(() => {
      this.challengeData = challengeData;
    });
  };

  setChallengeData = (value: any) => {
    this.challengeData = value;
  };

  setChallengeDetailedData = (value: any) => {
    this.challengeDetailedData = value;
  };

  setServiceInfo = (value: any) => {
    this.serviceInfo = value;
  };

  setDetailedInfo = (value: any) => {
    this.detailedInfo = value;
  };

  setPage = (value: number) => {
    this.page = value;
  };

  getServiceData = async (view: number, page: number) => {
    this.serviceData = null;

    const userData = await APIGateway(
      {
        query: `servicelist`,
        method: "POST",
        auth: true,
        data: {
          data: {
            view,
            page,
          },
        },
      },
      true,
    );

    if (userData.error) {
      alert(userData.error.message);

      return;
    }

    runInAction(() => {
      this.serviceData = userData.allList;
    });
  };

  deleteServiceData = async (id: string) => {
    const accept = confirm("정말로 삭제하시겠습니까?");

    if (!accept) {
      return;
    }

    await APIGateway(
      {
        query: `servicelist/${id}`,
        method: "DELETE",
        data: null,
        auth: true,
      },
      true,
    );

    runInAction(() => {
      this.getServiceData(10, 1);
    });
  };

  getDetailedData = async (id: string) => {
    this.detailedData = null;

    const detailedData = await APIGateway(
      {
        query: `servicelist/${id}`,
        method: "GET",
        auth: true,
        data: null,
      },
      true,
    );

    if (detailedData.error) {
      alert(detailedData.error.message);

      return;
    }

    runInAction(() => {
      this.detailedData = {
        ...detailedData.list.group.service[0],
        engine: detailedData.list.engine,
        serviceId: detailedData.list.group.serviceId,
      };
    });
  };

  setDetailedData = async (value: any) => {
    this.detailedData = value;
  };

  updateDetailedData = async (id: string, value: any, part: string) => {
    await APIGateway(
      {
        query: `servicelist/${id}/detail/${part}`,
        method: "PATCH",
        data: {
          userData: this.detailedData?.serviceCore?.engineId ?? undefined,

          ...value,
        },
        auth: true,
      },
      true,
    );
  };

  getDetailedSectionData = async (id: string, section: string) => {
    this.detailedSectionData = null;

    const detailedSectionData = await APIGateway(
      {
        query: `servicelist/${id}/detail/${section}`,
        method: "GET",
        auth: true,
        data: null,
      },
      true,
    );

    if (detailedSectionData.error) {
      alert(detailedSectionData.error.message);

      return;
    }

    runInAction(() => {
      this.detailedSectionData = detailedSectionData.sectionView;
    });
  };

  updateServiceDataAll = async (id: string, data: any) => {
    const updateResp = await APIGateway(
      {
        query: `servicelist/${id}`,
        method: "PATCH",
        auth: true,
        data: data,
      },
      true,
    );

    if (updateResp.error) {
      alert(updateResp.error.message);

      return;
    }
  };

  updateDetailedDataAll = async (id: string) => {
    const updateResp = await APIGateway(
      {
        query: `servicelist/${id}`,
        method: "PATCH",
        auth: true,
        data: {
          name: this.detailedData.name,
          color_m_rgb: this.detailedData.serviceBasicBrand.colorMRgb,
          color_m_hex: this.detailedData.serviceBasicBrand.colorMHex,
          color_s_rgb: this.detailedData.serviceBasicBrand.colorSRgb,
          color_s_hex: this.detailedData.serviceBasicBrand.colorSHex,
          font_family: this.detailedData.serviceBasicBrand.fontFamily,
          logo: this.detailedData.serviceCore.logo,
          slogan: this.detailedData.serviceCore.slogan,
          core_value: this.detailedData.serviceCore.coreValue,
          story: this.detailedData.serviceCommon.story,
          mission: this.detailedData.serviceCommon.mission,
          vision: this.detailedData.serviceCommon.vision,

          innerWebsite: "",
          websiteUrl: "",
          description: this.detailedData.serviceMarketing.description,
          copyrightType: "",
          applyNo: "",
          registerNo: "",
          startDate: "",
          expireDate: "",
        },
      },
      true,
    );

    if (updateResp.error) {
      alert(updateResp.error.message);

      return;
    }
  };

  applyChallenge = async (id: string) => {
    const challengeResp = await APIGateway(
      {
        query: `serviceChallenge/${id}`,
        method: "POST",
        auth: true,
        data: {
          data: {
            section: "challenge",
            serviceId: id,
            modify: false,
          },
        },
      },
      true,
    );

    if (challengeResp.error) {
      alert(challengeResp.error.message);

      return;
    }

    if (challengeResp.findSection.error) {
      alert(challengeResp.findSection.message);

      return;
    }

    alert("도전을 신청하였습니다.");
  };

  createProduct = async (data: any) => {
    const createData = await APIGateway(
      {
        query: "apirest/agservice/register",
        method: "POST",
        data: {
          data: {
            service: {
              retryOption: false,

              userData: 0,

              // indexLogo:
              //   this.brandInfo.engineIndex.logo[this.brandInfo.resulted.logo],
              // indexLogo_selected: this.brandInfo.selected.logo,
              // indexSlogan:
              //   this.brandInfo.engineIndex.slogan[
              //     this.brandInfo.resulted.slogan
              //   ],
              // indexSlogan_selected: this.brandInfo.selected.slogan,
              // indexCorevalue:
              //   this.brandInfo.engineIndex.coreValue[
              //     this.brandInfo.resulted.coreValue
              //   ],
              // indexCorevalue_selected: this.brandInfo.selected.coreValue,

              name: "test",
              type: data.type,
              description: "",
              category: data.category,
              industry: {
                Industry: data.industry,
                "Industry Ko": "test",
              },
              special: {
                name: "",
                nameKor: "",
              },
              color: {
                main: {
                  rgb: "",
                  hex: "",
                },

                sub: {
                  rgb: "",
                  hex: "",
                },
              },
              font_family: data.serviceBasicBrand.fontFamily,
              logo: data.serviceCore.logo,
              slogan: data.serviceCore.slogan,
              core_value: data.serviceCore.coreValue,
              // story: "",
              // mission: "",
              // vision: "",
              // strategy: "",

              // rating: this.brandInfo.rating,
              // comment: this.brandInfo.ratingFeedback,
              // share: "n",
            },
          },
        },
        auth: true,
      },
      false,
    );

    await APIGateway(
      {
        query: "product/write",
        method: "POST",
        data: {
          data: {
            product: {
              agServiceId: createData.agServiceInput.agserviceId,
              name: data.serviceProduct.name,
              price: Number(data.serviceProduct.price),
              maxPurchase: 1,
              quantity: 1,
              description: data.serviceProduct.description,
            },
            board: {
              title: data.serviceProduct.name,
              content: "상품요약",
              thumbnail: data.serviceCore.logo,
            },
          },
        },
        auth: true,
      },
      false,
    );
  };

  getProductList = async () => {
    const productData = await APIGateway(
      {
        query: `productBoard/list`,
        method: "POST",
        data: {
          data: {
            view: 10,
            page: 1,
            end: "n",
            search: {
              category: "REQUEST",
            },
          },
        },
        auth: false,
      },
      false,
    );

    if (productData.error) {
      alert(productData.error.message);

      return;
    }

    this.productData = productData;
  };

  getProductDetailedData = async (id: string) => {
    const productDetailedData = await APIGateway(
      {
        query: `product/view/${id}`,
        method: "GET",
        data: {},
        auth: true,
      },
      false,
    );

    if (productDetailedData.error) {
      alert(productDetailedData.error.message);

      return;
    }

    if (productDetailedData.view.board.description) {
      const descResp = await fetch(productDetailedData.view.board.description);
      const descText = await descResp.text();

      productDetailedData.view.board.descriptionHTML = descText;
    }

    this.productDetailedData = productDetailedData;
  };
}
