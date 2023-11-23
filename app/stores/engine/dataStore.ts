import { makeAutoObservable, runInAction } from "mobx";
import { getPaletteAsync } from "../../common/ColorThief.js";
import { getRealUrl } from "../../common/FileUpload.js";
import { floatingToast } from "../../common/FloatingToast.js";
import { hasKorean, sleep } from "../../common/Functions.js";
import { APIGateway, EngineGateway } from "../../common/Gateway.js";
import { papagoTranslation } from "../../common/Translator.js";

import {
  BrandIdentity,
  BrandInfo,
  LogoResponseType,
  Prompt,
  SloganResponseType,
} from "../../types.js";

export class engineDataStore {
  commonStore: any = null;
  engineStore: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  brandInfo = {
    id: -1,

    form: "",
    type: "",
    description: "",
    dream: "",
    image: "",
    keyword: "",
    essense: "",

    identity: "BI",
    name: "",
    category: "",
    style: "[]",
    logoColor: "",
    material: `["vector"]`,
    symbols: "",
    personality: "",
    emotion: `["soft"]`,

    industry: {
      Industry: "",
      "Industry Ko": "",
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

    fontFamily: "Pretendard-Regular",

    logo: "",
    slogan: "",
    coreValue: "",
    story: "",
    mission: "",
    vision: "",

    engineIndex: {
      logo: [],
      slogan: [],
      coreValue: [],
      userData: -1,
    },

    selected: {
      logo: -1,
      slogan: -1,
      coreValue: -1,
      fontFamily: 0,
    },

    resulted: {
      logo: 0,
      slogan: 0,
      coreValue: 0,
    },

    disableLogoColor: 0,
    disableName: 0,
    disableStyle: 0,
    disableMaterial: 0,
    disableSymbols: 0,
    disableEmotion: 0,

    workOwn: 0,

    logoType: 0,
    logoShape: "image",

    ipfrom: "unknown",

    rating: 0,
    ratingFeedback: "",

    serviceMarketing: {
      innerWebsite: "",
      websiteUrl: "",
      description: "",
      descriptionHtml: "",
      copyrightType: "",
      applyNo: "",
      registerNo: "",
      startDate: "",
      expireDate: "",
    },
  };

  brandIdentity: BrandIdentity = {
    slogan: [],
    coreValue: [],
    logo: [],
  };

  prompts: Prompt = {
    detailed: true,
    positive: "",
    negative: "",
  };

  logoInfo: any = {
    prompt: "3D Blender render, a flower",
    url: "https://cdn.aibici.co.kr/aibici/test/images_1691475290252.3799813",
    result: {
      result: {
        predictions: [
          "https://cdn.aibici.co.kr/aibici/engine/logo_1691475306.3314404.png",
        ],
      },
    },
    opacity: 1,
    type: "upload",
    sample: true,
  };

  engineProcessed = 0;

  isEngineBusy = false;

  brandingType = "";

  getCount = () => {
    let count = 0;

    if (this.brandInfo.form) {
      count++;
    }

    if (this.brandInfo.type) {
      count++;
    }

    if (this.brandInfo.description) {
      count++;
    }

    if (this.brandInfo.dream) {
      count++;
    }

    if (this.brandInfo.symbols) {
      count++;
    }

    if (this.brandInfo.keyword) {
      count++;
    }

    if (this.brandInfo.industry["Industry Ko"]) {
      count++;
    }

    return count;
  };

  getPercentage = () => {
    let count = 0;

    if (this.getCount() === 7) {
      count++;
    }

    if (this.brandInfo.name) {
      count++;
    }

    if (this.brandInfo.vision) {
      count++;
    }

    if (this.brandInfo.mission) {
      count++;
    }

    if (this.brandInfo.story) {
      count++;
    }

    if (this.brandInfo.essense) {
      count++;
    }

    if (this.brandInfo.slogan) {
      count++;
    }

    if (this.brandInfo.coreValue) {
      count++;
    }

    if (this.brandInfo.color.main.hex && this.brandInfo.color.sub.hex) {
      count++;
    }

    if (this.brandInfo.fontFamily) {
      count++;
    }

    if (this.brandInfo.logo) {
      count++;
    }

    return count;
  };

  setBrandingType = (value: string) => {
    this.brandingType = value;
  };

  setLogoInfo = (value: any) => {
    this.logoInfo = value;
  };

  changeColor = async () => {
    const realUrl = getRealUrl(this.brandInfo.logo);
    const color = await getPaletteAsync(realUrl);

    runInAction(() => {
      this.brandInfo.color = color;
    });
  };

  changeLogo = async (num_images: number) => {
    console.log(this.commonStore);

    if (!this.logoInfo.prompt) {
      floatingToast(
        "프롬프트를 입력해주세요.",
        "failed",
        this.commonStore.isDesktop,
      );

      return;
    }

    this.isEngineBusy = true;

    let prompt = this.logoInfo.prompt;

    if (hasKorean(this.logoInfo.prompt)) {
      prompt = await papagoTranslation("ko", "en", this.logoInfo.prompt);
    }

    const data = await EngineGateway({
      query: "image/v1",
      method: "POST",
      data: {
        num_images,
        num_inference_steps: 50,
        prompt: prompt,
        images: this.logoInfo.url,
        compression_format: `PNG`,
        type: "url",
      },
      auth: false,
    });

    runInAction(() => {
      this.isEngineBusy = false;

      this.logoInfo.result = data;
      this.logoInfo.sample = false;

      this.brandInfo.logo = data.result.predictions[0];
    });
  };

  setBrandInfo = (value: BrandInfo) => {
    this.brandInfo = value;
  };

  setBrandIdentity = (value: BrandIdentity) => {
    this.brandIdentity = value;
  };

  setPrompts = (value: Prompt) => {
    this.prompts = value;
  };

  getPrompts = async () => {
    const emotion = JSON.parse(this.brandInfo.emotion);
    const material = JSON.parse(this.brandInfo.material);
    const style = JSON.parse(this.brandInfo.style);

    let symbol = this.brandInfo.symbols;

    if (this.brandInfo.logoShape === "image") {
      if (hasKorean(symbol)) {
        symbol = await papagoTranslation("ko", "en", symbol);
      }
    }

    let symbols = `a ${this.brandInfo.industry.Industry} ${
      material.length > 0 ? `${material.join(" and ")}` : ``
    } logo for ${this.brandInfo.category} ${this.brandInfo.identity} ${
      this.brandInfo.disableSymbols
        ? ``
        : this.brandInfo.logoShape === "initial"
        ? `using the letter ${symbol[0]},`
        : `should include illustration of ${symbol
            .split(",")
            .filter((v) => v)
            .join(" or ")},`
    } ${emotion.length > 0 ? `with ${emotion.join(", ")},` : ``} ${
      style.length > 0 ? `by ${style.join(" and ")},` : ``
    } ${
      this.brandInfo.logoColor ? `${this.brandInfo.logoColor} background,` : ``
    } `;

    if (material.includes("3D blender render")) {
      symbols +=
        "polycount, modular constructivism, pop surrealism, physically based rendering";
    }

    runInAction(() => {
      this.prompts.positive = symbols.replace(/'/g, "");
      // this.prompts.negative = `ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face, blurry, draft, grainy`;
      this.prompts.negative = `watermark`;
    });
  };

  getIdentity = async (
    engineId: any,
    custom: boolean,
    type: string,
    autoSave: boolean,
  ) => {
    this.isEngineBusy = false;
    this.engineProcessed = 0;

    const timer = async (limit: number) => {
      while (this.engineProcessed < limit) {
        this.engineProcessed += 1;

        await sleep(150);
      }
    };

    timer(10);

    runInAction(() => {
      this.isEngineBusy = true;
    });

    if (type === "slogan" || type === "all") {
      if (hasKorean(this.brandInfo.description)) {
        this.brandInfo.description = await papagoTranslation(
          "ko",
          "en",
          this.brandInfo.description,
        );
      }

      let textDescription = this.brandInfo.workOwn
        ? `We work in the field of ${this.brandInfo.industry["Industry"]} with ${this.brandInfo.description}`
        : `We work in the field of ${this.brandInfo.industry["Industry"]} with ${this.brandInfo.special.name}`;

      textDescription = textDescription.replace(/'/g, "");

      const sloganResp: SloganResponseType[] = await Promise.all([
        new Promise<SloganResponseType>((res) => {
          EngineGateway({
            query: "slogan/v1",
            method: "POST",
            data: {
              input: textDescription,
              num_sequences: "5",
              language: "en",
              model: "t5-base-Noise0.25+ep100",
            },
            auth: false,
          }).then((data) => res(data));
        }),

        new Promise<SloganResponseType>((res) => {
          EngineGateway({
            query: "slogan/v1",
            method: "POST",
            data: {
              input: textDescription,
              num_sequences: "5",
              language: "en",
              model: "t5-base-Noise0.25+ep120",
            },
            auth: false,
          }).then((data) => res(data));
        }),
      ]);

      runInAction(() => {
        this.brandIdentity.slogan = sloganResp;

        this.brandInfo.slogan =
          this.brandIdentity.slogan[0].result.predictions[0];
        this.brandInfo.resulted.slogan = 0;
        this.brandInfo.selected.slogan = 0;
      });
    }

    runInAction(() => {
      this.engineProcessed = 10;
    });

    timer(20);

    if (type === "coreValue" || type === "all") {
      if (hasKorean(this.brandInfo.description)) {
        this.brandInfo.description = await papagoTranslation(
          "ko",
          "en",
          this.brandInfo.description,
        );
      }

      let textDescription = this.brandInfo.workOwn
        ? `We work in the field of ${this.brandInfo.industry["Industry"]} with ${this.brandInfo.description}`
        : `We work in the field of ${this.brandInfo.industry["Industry"]} with ${this.brandInfo.special.name}`;

      textDescription = textDescription.replace(/'/g, "");

      const coreValueResp: SloganResponseType[] = await Promise.all([
        new Promise<SloganResponseType>((res) => {
          EngineGateway({
            query: "slogan/v1",
            method: "POST",
            data: {
              input: textDescription,
              num_sequences: "5",
              language: "en",
              model: "t5-base-Noise0.25+ep140",
            },
            auth: false,
          }).then((data) => res(data));
        }),
      ]);

      runInAction(() => {
        this.brandIdentity.coreValue = coreValueResp;

        this.brandInfo.coreValue =
          this.brandIdentity.coreValue[0].result.predictions[0];
        this.brandInfo.resulted.coreValue = 0;
        this.brandInfo.selected.coreValue = 0;
      });
    }

    runInAction(() => {
      this.engineProcessed = 20;
    });

    timer(100);

    if (type === "logo" || type === "all") {
      if (!custom) {
        await this.getPrompts();
      }

      const positiveList = this.prompts.positive.split(",");
      const positiveKorList = positiveList
        .filter((v) => hasKorean(v))
        .map((v) => v.trim());

      if (positiveKorList.length > 0) {
        const positiveKor = positiveKorList.join("\n");
        const positiveKorResult = await papagoTranslation(
          "ko",
          "en",
          positiveKor,
        );
        const positiveKorResultList = positiveKorResult.split("\n");

        positiveKorList.map((v, i) => {
          this.prompts.positive = this.prompts.positive.replaceAll(
            v,
            positiveKorResultList[i],
          );
        });
      }

      const negativeList = this.prompts.negative.split(",");
      const negativeKorList = negativeList
        .filter((v) => hasKorean(v))
        .map((v) => v.trim());

      if (negativeKorList.length > 0) {
        const negativeKor = negativeKorList.join("\n");
        const negativeKorResult = await papagoTranslation(
          "ko",
          "en",
          negativeKor,
        );
        const negativeKorResultList = negativeKorResult.split("\n");

        negativeKorList.map((v, i) => {
          this.prompts.negative = this.prompts.negative.replaceAll(
            v,
            negativeKorResultList[i],
          );
        });
      }

      runInAction(() => {
        this.prompts.positive = this.prompts.positive.replace(",,,", "");
      });

      const promiseList: Promise<LogoResponseType>[] = [];

      if (this.brandingType === "sketch") {
        promiseList.push(
          new Promise<LogoResponseType>((res) => {
            EngineGateway({
              query: "image/v1",
              method: "POST",
              data: {
                num_images: 4,
                num_inference_steps: 50,
                prompt: `${this.prompts.positive}\n${this.prompts.negative}`,
                images: this.logoInfo.url,
                compression_format: `PNG`,
                type: "url",
              },
              auth: false,
            }).then((data) => res(data));
          }),
        );
      } else {
        promiseList.push(
          new Promise<LogoResponseType>((res) => {
            EngineGateway({
              query: "logo/v1",
              method: "POST",
              data: {
                category: "Logo-Diffusion",
                num_images: "2",
                num_inference_steps: "50",
                engine: "test_v2",
                prompt: `${this.prompts.positive}\n${this.prompts.negative}`,
                pixel_resolution: "768",
                compression_format: "PNG",
              },
              auth: false,
            }).then((data) => res(data));
          }),

          new Promise<LogoResponseType>((res) => {
            EngineGateway({
              query: "logo/v1",
              method: "POST",
              data: {
                category: "Only-Caption",
                num_images: "2",
                num_inference_steps: "50",
                engine: "test_v2",
                prompt: `${this.prompts.positive}\n${this.prompts.negative}`,
                pixel_resolution: "512",
                compression_format: "PNG",
              },
              auth: false,
            }).then((data) => res(data));
          }),

          new Promise<LogoResponseType>((res) => {
            EngineGateway({
              query: "logo/v1",
              method: "POST",
              data: {
                category: "Caption-BrandInfo-BP",
                num_images: "2",
                num_inference_steps: "50",
                engine: "test_v2",
                prompt: `${this.prompts.positive}\n${this.prompts.negative}`,
                pixel_resolution: "512",
                compression_format: "PNG",
              },
              auth: false,
            }).then((data) => res(data));
          }),

          new Promise<LogoResponseType>((res) => {
            EngineGateway({
              query: "logo/v1",
              method: "POST",
              data: {
                category: "Default",
                num_images: "2",
                num_inference_steps: "50",
                engine: "test_v2",
                prompt: `${this.prompts.positive}\n${this.prompts.negative}`,
                pixel_resolution: "512",
                compression_format: "PNG",
              },
              auth: false,
            }).then((data) => res(data));
          }),
        );
      }

      const logoResp: LogoResponseType[] = await Promise.all(promiseList);

      runInAction(() => {
        this.engineProcessed = 100;

        this.brandIdentity.logo = logoResp.map((v: LogoResponseType) => {
          return {
            ...v,

            data: {
              category: v.data?.category ?? "Unknown",
              num_images: v.data.num_images,
              num_inference_steps: v.data.num_inference_steps,
              prompt: v.data.prompt,

              brand_personality: "",
              brand_name: "",
              industry: "",
              lan: "",
            },
          };
        });

        this.brandInfo.logo = this.brandIdentity.logo[0].result.predictions[0];
        this.brandInfo.resulted.logo = 0;
        this.brandInfo.selected.logo = 0;
      });

      const realUrl = getRealUrl(this.brandInfo.logo);

      this.brandInfo.color = await getPaletteAsync(realUrl);
    }

    let cip = "";

    try {
      const cipResp = await fetch("https://api64.ipify.org?format=json");
      const cipJson = await cipResp.json();

      cip = cipJson.ip;
    } catch (e) {
      //
    }

    runInAction(() => {
      this.brandInfo.ipfrom = cip;
    });

    if (type === "all") {
      const engineData = await APIGateway(
        {
          query: "inputRegisters",
          method: "POST",
          data: {
            aiModel: {
              ...this.brandIdentity,

              // retryOption: false,

              work_own: this.brandInfo.workOwn,
              disable_logo_color: this.brandInfo.disableLogoColor,
              disable_name: this.brandInfo.disableName,
              disable_style: this.brandInfo.disableStyle,
              disable_material: this.brandInfo.disableMaterial,
              disable_symbols: this.brandInfo.disableSymbols,
              disable_emotion: this.brandInfo.disableEmotion,

              type: this.brandInfo.identity,
              logo_type: this.brandInfo.logoType,
              style: this.brandInfo.style,
              logo_color: this.brandInfo.logoColor,
              material: this.brandInfo.material,
              symbols: this.brandInfo.symbols,
              personality: this.brandInfo.personality,
              emotion: this.brandInfo.emotion,
              description: this.brandInfo.description,
              category: this.brandInfo.category,
              industry: this.brandInfo.industry,
              special: this.brandInfo.special,
            },
          },

          auth: true,
        },
        false,
      );

      if (engineData.error) {
        alert(engineData.error.message);

        return false;
      }

      runInAction(() => {
        this.brandInfo.engineIndex = {
          logo: engineData.indexLogo,
          slogan: engineData.indexSlogan,
          coreValue: engineData.indexCorevalue,
          userData: engineData.inputUserDataDb.id,
        };
      });
    } else if (type === "slogan") {
      const engineData = await APIGateway(
        {
          query: "inputRegister/slogan",
          method: "POST",
          data: {
            aiModel: {
              slogan: this.brandIdentity.slogan,

              engineId,

              // retryOption: false,

              work_own: this.brandInfo.workOwn,
              description: this.brandInfo.description,
              special: this.brandInfo.special,
            },
          },

          auth: true,
        },
        false,
      );

      if (engineData.error) {
        alert(engineData.error.message);

        return false;
      }

      runInAction(() => {
        this.brandInfo.engineIndex = {
          logo: [],
          slogan: engineData.indexSlogan,
          coreValue: [],
          userData: -1,
        };
      });
    } else if (type === "coreValue") {
      const engineData = await APIGateway(
        {
          query: "inputRegister/coreValue",
          method: "POST",
          data: {
            aiModel: {
              coreValue: this.brandIdentity.coreValue,

              engineId,

              // retryOption: false,

              work_own: this.brandInfo.workOwn,
              description: this.brandInfo.description,
              special: this.brandInfo.special,
            },
          },

          auth: true,
        },
        false,
      );

      if (engineData.error) {
        alert(engineData.error.message);

        return false;
      }

      runInAction(() => {
        this.brandInfo.engineIndex = {
          logo: [],
          slogan: [],
          coreValue: engineData.indexCorevalue,
          userData: -1,
        };
      });
    } else if (type === "logo") {
      const engineData = await APIGateway(
        {
          query: "inputRegister/logo",
          method: "POST",
          data: {
            aiModel: {
              ...this.brandIdentity,

              engineId,

              // retryOption: false,

              disable_logo_color: this.brandInfo.disableLogoColor,
              disable_name: this.brandInfo.disableName,
              disable_style: this.brandInfo.disableStyle,
              disable_material: this.brandInfo.disableMaterial,
              disable_symbols: this.brandInfo.disableSymbols,
              disable_emotion: this.brandInfo.disableEmotion,

              type: this.brandInfo.identity === "Brand" ? "BI" : "CI",
              logo_type: this.brandInfo.logoType,
              style: this.brandInfo.style,
              logo_color: this.brandInfo.logoColor,
              material: this.brandInfo.material,
              symbols: this.brandInfo.symbols,
              personality: this.brandInfo.personality,
              emotion: this.brandInfo.emotion,
              category: this.brandInfo.category,
              industry: this.brandInfo.industry,
            },
          },

          auth: true,
        },
        false,
      );

      if (engineData.error) {
        alert(engineData.error.message);

        return false;
      }

      runInAction(() => {
        this.brandInfo.engineIndex = {
          logo: engineData.indexLogo,
          slogan: [],
          coreValue: [],
          userData: -1,
        };
      });
    }

    runInAction(() => {
      if (autoSave) {
        const result: any = this.saveIdentityInfo();

        if (result) {
          this.isEngineBusy = false;
        }
      } else {
        this.isEngineBusy = false;
      }
    });

    return true;
  };

  saveIdentityInfo = async () => {
    let serviceData: any = null;

    if (this.brandInfo.engineIndex.userData > -1) {
      serviceData = await APIGateway(
        {
          query: "serviceRegisters/all",
          method: "POST",
          data: {
            data: {
              service: {
                retryOption: false,

                userData: this.brandInfo.engineIndex.userData,

                indexLogo:
                  this.brandInfo.engineIndex.logo[this.brandInfo.resulted.logo],
                indexLogo_selected: this.brandInfo.selected.logo,
                indexSlogan:
                  this.brandInfo.engineIndex.slogan[
                    this.brandInfo.resulted.slogan
                  ],
                indexSlogan_selected: this.brandInfo.selected.slogan,
                indexCorevalue:
                  this.brandInfo.engineIndex.coreValue[
                    this.brandInfo.resulted.coreValue
                  ],
                indexCorevalue_selected: this.brandInfo.selected.coreValue,

                name: this.brandInfo.name,
                type: this.brandInfo.identity,
                description: this.brandInfo.description,
                category: this.brandInfo.category,
                industry: this.brandInfo.industry,
                special: this.brandInfo.special,
                color: this.brandInfo.color,
                font_family: this.brandInfo.fontFamily,
                logo: this.brandInfo.logo,
                slogan: this.brandInfo.slogan,
                core_value: this.brandInfo.coreValue,
                story: this.brandInfo.story,
                mission: this.brandInfo.mission,
                vision: this.brandInfo.vision,
                strategy: "",

                rating: this.brandInfo.rating,
                comment: this.brandInfo.ratingFeedback,
                share: "n",
              },
            },
          },
          auth: true,
        },
        true,
      );
    } else {
      serviceData = await APIGateway(
        {
          query: "serviceRegisters/upload",
          method: "POST",
          data: {
            data: {
              service: {
                type: this.brandInfo.identity,
                category: this.brandInfo.category,
                industry: this.brandInfo.industry,
                name: this.brandInfo.name,
                color: this.brandInfo.color,
                font_family: this.brandInfo.fontFamily,

                logo: this.brandInfo.logo,
                slogan: this.brandInfo.slogan,
                core_value: this.brandInfo.coreValue,

                story: this.brandInfo.story,
                mission: this.brandInfo.mission,
                vision: this.brandInfo.vision,

                special: {
                  name: "",
                  nameKor: "",
                },

                description: "",
              },
            },
          },
          auth: true,
        },
        false,
      );
    }

    if (serviceData.error) {
      alert(serviceData.error.message);

      return false;
    }

    runInAction(() => {
      this.brandInfo.id = serviceData.serviceInput.id;
    });

    return true;
  };

  getRecommend = async () => {
    const images: any = [];

    this.brandIdentity.logo.map((v) => {
      v.result.predictions.map((w) => {
        images.push({
          name: v.data.prompt,
          url: w,
        });
      });
    });

    const data = await EngineGateway({
      query: "reco/v1",
      method: "POST",
      data: {
        images,
      },
      auth: false,
    });

    runInAction(() => {
      this.brandIdentity.logo = this.brandIdentity.logo.map((v) => {
        const recommend = v.result.predictions.map((w) => {
          const matched = data.result.predictions.find((v) => v.url === w);
          const matchedIndex = data.result.predictions.findIndex(
            (v) => v.url === w,
          );

          return {
            order: matchedIndex + 1,
            score: matched.score,
          };
        });

        return {
          ...v,

          result: {
            ...v.result,

            recommend,
          },
        };
      });
    });
  };
}
