import { makeAutoObservable, runInAction } from "mobx";
import { floatingToast } from "../../common/FloatingToast.js";
import { APIGateway, EngineGateway } from "../../common/Gateway.js";

import {
  LogoResponseType,
  SloganResponseType,
  TestLogoInput,
} from "../../types.js";

export class testStore {
  constructor() {
    makeAutoObservable(this);
  }

  isEngineBusy = false;
  isAutomatic = true;

  engineTesterIndex = 0;

  inputData = {
    category: "Logo-Diffusion",

    positive_prompt:
      "a logo of cafe, a cup of coffee, white, modern, minimalism, vector art, 2d, best quality, centered",
    // negative_prompt: "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face, blurry, draft, grainy",
    negative_prompt:
      "low quality, worst quality, bad composition, extra digit, fewer digits, text, inscription, watermark, label, asymmetric",

    num_images: "4",
    num_inference_steps: "30",

    pixel_resolution: "768",
    compression_format: "JPEG",

    type: "All",
  };

  inputSloganData: any = {
    category: "All",

    prompt: "",

    num_sequences: "5",
  };

  inputImageData: any = {
    positive_prompt: "",
    // negative_prompt: "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face, blurry, draft, grainy",
    negative_prompt: "",

    images: "",

    num_images: "4",
    num_inference_steps: "100",

    compression_format: "JPEG",
  };

  testSloganResult: SloganResponseType[] = [];
  testImageResult: any = [];

  testInputs: TestLogoInput[] = new Array(10).fill(null);
  testResult: LogoResponseType[] = [
    {
      data: {
        brand_personality: "",
        brand_name: "",
        category: "",
        industry: "",
        num_images: 0,
        num_inference_steps: 0,
        lan: "",
        prompt: "",
      },
      datetime: 0,
      result: {
        id: 0,
        ms: 0,
        predictions: ["", "", "", ""],
        recommend: [
          {
            order: 0,
            score: 0,
          },
        ],
      },
    },
  ];

  sampleData: any = null;

  setAutomatic = async (value: boolean) => {
    this.isAutomatic = value;
  };

  getSampleData = async (view: number, page: number) => {
    const sampleData = await APIGateway(
      {
        query: "beta/offsetAll",
        method: "POST",
        data: {
          view,
          page,
        },
        auth: false,
      },
      true,
    );

    if (sampleData.error) {
      alert(sampleData.error.message);

      return;
    }

    runInAction(() => {
      this.sampleData = sampleData;
    });
  };

  setInputImageData = (value: any) => {
    this.inputImageData = value;
  };

  setEngineTesterIndex = (value: number) => {
    this.engineTesterIndex = value;
  };

  setMultipleInputData = (index: number, value: TestLogoInput) => {
    this.testInputs[index] = value;
  };

  setInputData = (value: TestLogoInput) => {
    this.inputData = value;
  };

  setSloganInputData = (value: any) => {
    this.inputSloganData = value;
  };

  getSloganIdentity = async (isDesktop: boolean) => {
    if (!this.inputSloganData.prompt) {
      floatingToast("Please enter the prompt.", "failed", isDesktop);

      return;
    }

    this.isEngineBusy = true;
    this.inputSloganData.prompt = this.inputSloganData.prompt.replace(/'/g, "");

    let sloganResp: SloganResponseType[] = [];

    if (this.inputSloganData.category === "All") {
      sloganResp = await Promise.all([
        new Promise<SloganResponseType>((res) => {
          EngineGateway({
            query: "slogan/v1",
            method: "POST",
            data: {
              input: this.inputSloganData.prompt,
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
              input: this.inputSloganData.prompt,
              num_sequences: "5",
              language: "en",
              model: "t5-base-Noise0.25+ep120",
            },
            auth: false,
          }).then((data) => res(data));
        }),

        new Promise<SloganResponseType>((res) => {
          EngineGateway({
            query: "slogan/v1",
            method: "POST",
            data: {
              input: this.inputSloganData.prompt,
              num_sequences: "5",
              language: "en",
              model: "t5-base-Noise0.25+ep140",
            },
            auth: false,
          }).then((data) => res(data));
        }),
      ]);
    } else {
      const result = await new Promise<SloganResponseType>((res) => {
        EngineGateway({
          query: "slogan/v1",
          method: "POST",
          data: {
            input: this.inputSloganData.prompt,
            num_sequences: this.inputSloganData.num_sequences,
            language: "en",
            model: this.inputSloganData.category,
          },
          auth: false,
        }).then((data) => res(data));
      });

      sloganResp.push(result);
    }

    runInAction(() => {
      this.testSloganResult = sloganResp;
    });

    this.isEngineBusy = false;
  };

  getImageIdentity = async (isDesktop: boolean) => {
    if (!this.inputImageData.images) {
      floatingToast("Please enter the image URL.", "failed", isDesktop);

      return;
    }

    if (!this.inputImageData.positive_prompt) {
      floatingToast("Please enter the prompt.", "failed", isDesktop);

      return;
    }

    this.isEngineBusy = true;

    this.inputImageData.positive_prompt =
      this.inputImageData.positive_prompt.replace(/'/g, "");
    this.inputImageData.negative_prompt =
      this.inputImageData.negative_prompt.replace(/'/g, "");

    const imageResp: any = await Promise.all([
      new Promise<any>((res) => {
        EngineGateway({
          query: "image/v1",
          method: "POST",
          data: {
            num_images: this.inputImageData.num_images,
            num_inference_steps: this.inputImageData.num_inference_steps,
            prompt: `${this.inputImageData.positive_prompt}\n${this.inputImageData.negative_prompt}`,
            compression_format: this.inputImageData.compression_format,
            images: this.inputImageData.images,
            type: "url",
          },
          auth: false,
        }).then((data) => res(data));
      }),
    ]);

    runInAction(() => {
      this.testImageResult = imageResp;
    });

    this.isEngineBusy = false;
  };

  getMultipleIdentity = async () => {
    const logoInputs = this.testInputs.filter((v) => v);
    const logoResp: LogoResponseType[] = [];

    for (let i = 0; i < logoInputs.length; i++) {
      const result: LogoResponseType = await EngineGateway({
        query: "logo/v1",
        method: "POST",
        data: {
          category: this.testInputs[i].category,
          num_images: this.testInputs[i].num_images,
          num_inference_steps: this.testInputs[i].num_inference_steps,
          engine: "test",
          prompt: this.testInputs[i].positive_prompt,
        },
        auth: false,
      });

      logoResp.push(result);
    }

    this.testResult = logoResp;
  };

  getIdentity = async (isDesktop: boolean) => {
    if (!this.inputData.positive_prompt) {
      floatingToast("Please enter the prompt.", "failed", isDesktop);

      return;
    }

    this.isEngineBusy = true;
    this.inputData.positive_prompt = this.inputData.positive_prompt.replace(
      /'/g,
      "",
    );
    this.inputData.negative_prompt = this.inputData.negative_prompt.replace(
      /'/g,
      "",
    );

    let logoResp: LogoResponseType[] = [];

    if (this.inputData.category === "All") {
      logoResp = await Promise.all([
        new Promise<LogoResponseType>((res) => {
          EngineGateway({
            query: "logo/v1",
            method: "POST",
            data: {
              category: "Stable-Diffusion-v1.5",
              num_images: this.inputData.num_images,
              num_inference_steps: this.inputData.num_inference_steps,
              engine: "test_v2",
              prompt: `${this.inputData.positive_prompt}\n${this.inputData.negative_prompt}`,
              pixel_resolution: this.inputData.pixel_resolution,
              compression_format: this.inputData.compression_format,
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
              num_images: this.inputData.num_images,
              num_inference_steps: this.inputData.num_inference_steps,
              engine: "test_v2",
              prompt: `${this.inputData.positive_prompt}\n${this.inputData.negative_prompt}`,
              pixel_resolution: this.inputData.pixel_resolution,
              compression_format: this.inputData.compression_format,
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
              num_images: this.inputData.num_images,
              num_inference_steps: this.inputData.num_inference_steps,
              engine: "test_v2",
              prompt: `${this.inputData.positive_prompt}\n${this.inputData.negative_prompt}`,
              pixel_resolution: this.inputData.pixel_resolution,
              compression_format: this.inputData.compression_format,
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
              num_images: this.inputData.num_images,
              num_inference_steps: this.inputData.num_inference_steps,
              engine: "test_v2",
              prompt: `${this.inputData.positive_prompt}\n${this.inputData.negative_prompt}`,
              pixel_resolution: this.inputData.pixel_resolution,
              compression_format: this.inputData.compression_format,
            },
            auth: false,
          }).then((data) => res(data));
        }),
      ]);
    } else {
      const result = await new Promise<LogoResponseType>((res) => {
        EngineGateway({
          query: "logo/v1",
          method: "POST",
          data: {
            category: this.inputData.category,
            num_images: this.inputData.num_images,
            num_inference_steps: this.inputData.num_inference_steps,
            engine: "test_v2",
            prompt: `${this.inputData.positive_prompt}\n${this.inputData.negative_prompt}`,
            pixel_resolution: this.inputData.pixel_resolution,
            compression_format: this.inputData.compression_format,
          },
          auth: false,
        }).then((data) => res(data));
      });

      logoResp.push(result);
    }

    runInAction(() => {
      this.testResult = logoResp;
    });

    await APIGateway(
      {
        query: "beta",
        method: "POST",
        data: {
          email: "Data from /test",
          data: JSON.stringify({
            slogan: [],
            coreValue: [],
            logo: logoResp,

            etc: null,
          }),
        },

        auth: false,
      },
      false,
    );

    this.isEngineBusy = false;
  };
}
