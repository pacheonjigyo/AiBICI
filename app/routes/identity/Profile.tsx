import * as React from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";
import { BrandingMenu } from "./detail/BrandingMenu.js";

import { BorderLinearProgress } from "../../common/BorderLinearProgress.js";
import { Language } from "../../common/Language.js";
import BenchmarkDifference from "./detail/BenchmarkDifference.js";
import BenchmarkInspire from "./detail/BenchmarkInspire.js";
import BenchmarkMain from "./detail/BenchmarkMain.js";
import BenchmarkRoleModel from "./detail/BenchmarkRoleModel.js";
import BenchmarkThree from "./detail/BenchmarkThree.js";
import ColorMain from "./detail/ColorMain.js";
import CoreValueAttitude from "./detail/CoreValueAttitude.js";
import CoreValueMain from "./detail/CoreValueMain.js";
import EssenseMain from "./detail/EssenseMain.js";
import EssenseReason from "./detail/EssenseReason.js";
import FontMain from "./detail/FontMain.js";
import InteriorMain from "./detail/InteriorMain.js";
import IntroForm from "./detail/IntroForm.js";
import IntroImage from "./detail/IntroImage.js";
import IntroIndustry from "./detail/IntroIndustry.js";
import IntroMain from "./detail/IntroMain.js";
import IntroMemory from "./detail/IntroMemory.js";
import IntroMission from "./detail/IntroMission.js";
import IntroProduce from "./detail/IntroProduce.js";
import IntroSpecial from "./detail/IntroSpecial.js";
import LogoAuto from "./detail/LogoAuto.js";
import LogoMain from "./detail/LogoMain.js";
import LogoSketch from "./detail/LogoSketch.js";
import LogoUpload from "./detail/LogoUpload.js";
import MarketingCampaign from "./detail/MarketingCampaign.js";
import MarketingMain from "./detail/MarketingMain.js";
import MissionGoals from "./detail/MissionGoals.js";
import MissionMain from "./detail/MissionMain.js";
import MissionNeeds from "./detail/MissionNeeds.js";
import MissionStory from "./detail/MissionStory.js";
import NamingCreate from "./detail/NamingCreate.js";
import NamingMain from "./detail/NamingMain.js";
import NamingMethodNumber from "./detail/NamingMethodNumber.js";
import NamingWordList from "./detail/NamingWordList.js";
import PackageMain from "./detail/PackageMain.js";
import PersonaMain from "./detail/PersonaMain.js";
import SloganMain from "./detail/SloganMain.js";
import SloganValue from "./detail/SloganValue.js";
import StoryCreate from "./detail/StoryCreate.js";
import StoryDetail from "./detail/StoryDetail.js";
import StoryFormula from "./detail/StoryFormula.js";
import StoryIdentity from "./detail/StoryIdentity.js";
import StoryMain from "./detail/StoryMain.js";
import StorySolution from "./detail/StorySolution.js";
import StoryThree from "./detail/StoryThree.js";
import VisionCreate from "./detail/VisionCreate.js";
import VisionIdeal from "./detail/VisionIdeal.js";
import VisionMain from "./detail/VisionMain.js";
import VisionTour from "./detail/VisionTour.js";
import "./prezi.css";

declare let impress: any;

export default function BrandProfile(): JSX.Element {
  // const navigate = useNavigate();
  const { commonStore, engineDataStore, identityDataStore } =
    React.useContext(AppContext);

  const [expanded, setExpanded] = React.useState(true);

  usePageEffect({
    title: wordList["프로필"][commonStore.appInfo.language],
  });

  let test = 0;

  React.useEffect(() => {
    if (test > 0) {
      return;
    }

    test++;

    impress().init();

    engineDataStore.saveIdentityInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          // backgroundImage: `url("https://i.pinimg.com/originals/f9/37/47/f937475edd3a9ccb864184731e461e92.jpg")`,

          // background: "linear-gradient(118deg, #fadc65 0%, #8265ff 50%)",
          // bgcolor: "black",
          width: commonStore.baseInfo.width,
          height: commonStore.baseInfo.height,
          position: "fixed",
          left: 0,
          top: 0,
        }}
      ></Box>

      <div
        id="impress"
        data-transition-duration={1000}
        data-width={commonStore.baseInfo.width}
        data-height={commonStore.baseInfo.height}
        data-max-scale={3}
        data-min-scale={0}
        data-perspective={1000}
        // data-autoplay={7}
        style={{
          position: "absolute",
          transformOrigin: "left top",
          transition: "all 1000ms ease-in-out 0ms",
          transformStyle: "preserve-3d",
          top: "50%",
          left: "50%",
          perspective: "4052.77px",
          transform: "scale(0.246745)",
        }}
      >
        <div
          style={{
            position: "absolute",
            transformOrigin: "left top",
            transition: "all 1000ms ease-in-out 500ms",
            transformStyle: "preserve-3d",
            transform:
              "rotateZ(0deg) rotateY(0deg) rotateX(0deg) translate3d(0px, 0px, 0px)",
          }}
        >
          <div
            id="intro-main"
            className="step  present"
            data-x={-3000}
            data-y={2500}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box
              className="box"
              sx={
                {
                  // animation: "rotate 10s ease 1s infinite normal forwards",
                }
              }
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={64} fontWeight="bold">
                    {Math.round((engineDataStore.getCount() * 100) / 7)}%
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="방향" />
              </Typography>
            </Box>
          </div>

          <div
            id="intro-form"
            className="step present"
            data-x={-4000}
            data-y={1200}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",

                    color: "#333333",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    <Language
                      label={
                        engineDataStore.brandInfo.type === "Product"
                          ? "제품"
                          : engineDataStore.brandInfo.type === "Service"
                          ? "서비스"
                          : ""
                      }
                    />
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                제공 형태
              </Typography> */}
            </Box>
          </div>

          <div
            id="intro-produce"
            className="step present"
            data-x={-4400}
            data-y={1900}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",

                    color: "#333333",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.form}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography fontSize={64} fontWeight="bold">
                제품/서비스 종류
              </Typography> */}
            </Box>
          </div>

          <div
            id="intro-special"
            className="step present"
            data-x={-4500}
            data-y={2600}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",

                    color: "#333333",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.description}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography fontSize={64} fontWeight="bold">
                특장점
              </Typography> */}
            </Box>
          </div>

          <div
            id="intro-mission"
            className="step present"
            data-x={-4200}
            data-y={3300}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",

                    color: "#333333",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.dream}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography fontSize={64} fontWeight="bold">
                목표
              </Typography> */}
            </Box>
          </div>

          <div
            id="intro-memory"
            className="step present"
            data-x={-1900}
            data-y={3300}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",

                    color: "#333333",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.symbols}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                이미지
              </Typography> */}
            </Box>
          </div>

          <div
            id="intro-image"
            className="step present"
            data-x={-1600}
            data-y={2600}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",

                    color: "#333333",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.keyword}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                키워드
              </Typography> */}
            </Box>
          </div>

          <div
            id="intro-industry"
            className="step present"
            data-x={-1700}
            data-y={1750}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",

                    color: "#333333",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.industry["Industry Ko"]}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                업종
              </Typography> */}
            </Box>
          </div>

          <div
            id="naming-main"
            className="step present"
            data-x={400}
            data-y={-500}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(4)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    // display: window.location.href.includes(
                    //   "/ai-branding/create#/naming-main",
                    // )
                    //   ? ""
                    //   : "none",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.name}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="네이밍" />
              </Typography>
            </Box>
          </div>

          <div
            id="naming-create"
            className="step present"
            data-x={-1000}
            data-y={-2000}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                네이밍 작성 가이드
              </Typography> */}
            </Box>
          </div>

          <div
            id="naming-method-number"
            className="step present"
            data-x={-700}
            data-y={-2200}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                숫자 활용하기
              </Typography> */}
            </Box>
          </div>

          <div
            id="naming-wordlist"
            className="step present"
            data-x={-1200}
            data-y={-1200}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                단어장
              </Typography> */}
            </Box>
          </div>

          <div
            id="vision-main"
            className="step present"
            data-x={4000}
            data-y={500}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.vision}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="비전" />
              </Typography>
            </Box>
          </div>

          <div
            id="vision-create"
            className="step present"
            data-x={2800}
            data-y={400}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {/* <Typography fontSize={48} fontWeight="bold"></Typography> */}
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                비전 작성 가이드
              </Typography> */}
            </Box>
          </div>

          <div
            id="vision-ideal"
            className="step present"
            data-x={2400}
            data-y={400}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                이상향
              </Typography> */}
            </Box>
          </div>

          <div
            id="vision-tour"
            className="step present"
            data-x={2900}
            data-y={1100}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                둘러보기
              </Typography> */}
            </Box>
          </div>

          <div
            id="mission-main"
            className="step present"
            data-x={7800}
            data-y={1500}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.mission}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="미션" />
              </Typography>
            </Box>
          </div>

          <div
            id="mission-goals"
            className="step present"
            data-x={6400}
            data-y={1500}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                중·장기목표
              </Typography> */}
            </Box>
          </div>

          <div
            id="mission-needs"
            className="step present"
            data-x={6200}
            data-y={1200}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                존재이유
              </Typography> */}
            </Box>
          </div>

          <div
            id="mission-story"
            className="step present"
            data-x={6100}
            data-y={1400}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                탄생배경
              </Typography> */}
            </Box>
          </div>

          <div
            id="story-main"
            className="step present"
            data-x={7000}
            data-y={-3000}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                {engineDataStore.brandInfo.story ? (
                  <Typography fontSize={36} fontWeight="bold">
                    {engineDataStore.brandInfo.story}
                  </Typography>
                ) : (
                  <img
                    src="/resources/hexagon.svg"
                    style={{
                      animation: "rotate 10s ease 1s infinite normal forwards",
                    }}
                  />
                )}
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="스토리" />
              </Typography>
            </Box>
          </div>

          <div
            id="story-create"
            className="step present"
            data-x={7900}
            data-y={-4700}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                스토리 작성 가이드
              </Typography> */}
            </Box>
          </div>

          <div
            id="story-identity"
            className="step present"
            data-x={8350}
            data-y={-4950}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                브랜드 아이덴티티
              </Typography> */}
            </Box>
          </div>

          <div
            id="story-three"
            className="step present"
            data-x={8400}
            data-y={-4800}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                스토리 구성요소
              </Typography> */}
            </Box>
          </div>

          <div
            id="story-formula"
            className="step present"
            data-x={8300}
            data-y={-4700}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                스토리텔링 공식
              </Typography> */}
            </Box>
          </div>

          <div
            id="story-solution"
            className="step present"
            data-x={8400}
            data-y={-4600}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                결핍과 해결구조
              </Typography> */}
            </Box>
          </div>

          <div
            id="story-detail"
            className="step present"
            data-x={8350}
            data-y={-4450}
            data-z={0}
            data-scale={0.2}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                사연
              </Typography> */}
            </Box>
          </div>

          <div
            id="essense-main"
            className="step present"
            data-x={11000}
            data-y={-1500}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box
              className="box"
              sx={
                {
                  // animation: "rotate 10s ease 0s infinite normal forwards",
                }
              }
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.essense}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="에센스" />
              </Typography>
            </Box>
          </div>

          <div
            id="essense-reason"
            className="step present"
            data-x={12500}
            data-y={-1500}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {/* <Typography fontSize={48} fontWeight="bold"></Typography> */}
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                존재이유
              </Typography> */}
            </Box>
          </div>

          <div
            id="slogan-main"
            className="step present"
            data-x={12500}
            data-y={2500}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: 600,
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.slogan}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="슬로건" />
              </Typography>
            </Box>
          </div>

          <div
            id="slogan-value"
            className="step present"
            data-x={14000}
            data-y={1500}
            data-z={0}
            data-scale={0.8}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                제품을 통해 얻는 것
              </Typography> */}
            </Box>
          </div>

          <div
            id="corevalue-main"
            className="step present"
            data-x={17000}
            data-y={0}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: 600,
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold">
                    {engineDataStore.brandInfo.coreValue}
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="핵심가치" />
              </Typography>
            </Box>
          </div>

          <div
            id="corevalue-attitude"
            className="step present"
            data-x={18500}
            data-y={0}
            data-z={0}
            data-scale={0.8}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                제품이 가지는 마음가짐
              </Typography> */}
            </Box>
          </div>

          <div
            id="color-main"
            className="step present"
            data-x={18500}
            data-y={4000}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: 600,
                    textAlign: "center",

                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      bgcolor: engineDataStore.brandInfo.color.main.hex,
                      width: 80,
                      height: 80,
                    }}
                  ></Box>

                  <Box
                    sx={{
                      ml: 3,

                      borderRadius: "50%",
                      bgcolor: engineDataStore.brandInfo.color.sub.hex,
                      width: 80,
                      height: 80,
                    }}
                  ></Box>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="색상" />
              </Typography>
            </Box>
          </div>

          <div
            id="font-main"
            className="step  present"
            data-x={2500}
            data-y={4000}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box
              className="box"
              sx={
                {
                  // animation: "rotate 10s ease 1s infinite normal forwards",
                }
              }
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    fontSize={64}
                    fontWeight="bold"
                    fontFamily={engineDataStore.brandInfo.fontFamily}
                  >
                    ABC
                  </Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 1s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                // fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                <Language label="서체" />
              </Typography>
            </Box>
          </div>

          <div
            id="logo-main"
            className="step present"
            data-x={-5000}
            data-y={-2000}
            data-z={0}
            data-scale={5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(4)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box
              className="box"
              sx={
                {
                  // animation: "rotate 10s ease 0s infinite normal forwards",
                }
              }
            >
              <img
                src={
                  engineDataStore.brandInfo.logo
                    ? engineDataStore.brandInfo.logo
                    : "/resources/hexagon.svg"
                }
                style={{
                  animation: "rotate 10s ease 0s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                sx={{
                  mt: 3,
                }}
              >
                <Language label="로고" />
              </Typography>
            </Box>
          </div>

          <div
            id="logo-auto"
            className="step present"
            data-x={-3700}
            data-y={-3200}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                자동 생성
              </Typography> */}
            </Box>
          </div>

          <div
            id="logo-sketch"
            className="step present"
            data-x={-3500}
            data-y={-2300}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                스케치기반 생성
              </Typography> */}
            </Box>
          </div>

          <div
            id="logo-upload"
            className="step present"
            data-x={-3800}
            data-y={-1400}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              {/* <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                이미지기반 생성
              </Typography> */}
            </Box>
          </div>

          {/* <div
            id="benchmark-main"
            className="step present"
            data-x={15000}
            data-y={-3500}
            data-z={0}
            data-scale={3}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <img
                src="/resources/hexagon.svg"
                style={{
                  animation: "rotate 10s ease 0s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                벤치마킹
              </Typography>
            </Box>
          </div>

          <div
            id="benchmark-difference"
            className="step present"
            data-x={16200}
            data-y={-3100}
            data-z={0}
            data-scale={0.5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                차별화
              </Typography>
            </Box>
          </div>

          <div
            id="benchmark-three"
            className="step present"
            data-x={16400}
            data-y={-3500}
            data-z={0}
            data-scale={0.5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                경쟁사
              </Typography>
            </Box>
          </div>

          <div
            id="benchmark-rolemodel"
            className="step present"
            data-x={16200}
            data-y={-3900}
            data-z={0}
            data-scale={0.5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                롤모델
              </Typography>
            </Box>
          </div>

          <div
            id="benchmark-inspire"
            className="step present"
            data-x={16300}
            data-y={-4300}
            data-z={0}
            data-scale={0.5}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                영감 얻기
              </Typography>
            </Box>
          </div>

          <div
            id="persona-main"
            className="step present"
            data-x={2500}
            data-y={-4000}
            data-z={0}
            data-scale={3}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <img
                src="/resources/hexagon.svg"
                style={{
                  animation: "rotate 10s ease 1s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                페르소나
              </Typography>
            </Box>
          </div>

          <div
            id="interior-main"
            className="step present"
            data-x={-4500}
            data-y={5500}
            data-z={0}
            data-scale={3}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <img
                src="/resources/hexagon.svg"
                style={{
                  animation: "rotate 10s ease 0s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                인테리어
              </Typography>
            </Box>
          </div>

          <div
            id="package-main"
            className="step present"
            data-x={8500}
            data-y={4500}
            data-z={0}
            data-scale={3}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <img
                src="/resources/hexagon.svg"
                style={{
                  animation: "rotate 10s ease 1s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                패키지
              </Typography>
            </Box>
          </div>

          <div
            id="marketing-main"
            className="step present"
            data-x={13500}
            data-y={5500}
            data-z={0}
            data-scale={3}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <img
                src="/resources/hexagon.svg"
                style={{
                  animation: "rotate 10s ease 0s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                마케팅
              </Typography>
            </Box>
          </div>

          <div
            id="marketing-campaign"
            className="step present"
            data-x={12800}
            data-y={6000}
            data-z={0}
            data-scale={1}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,

                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize={48} fontWeight="bold"></Typography>
                </Box>

                <img
                  src="/resources/hexagon.svg"
                  style={{
                    animation: "rotate 10s ease 0s infinite normal forwards",
                  }}
                />
              </Box>

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 1,
                }}
              >
                캠페인
              </Typography>
            </Box>
          </div> */}

          {/* <div
            id="trade-main"
            className="step present"
            data-x={14000}
            data-y={-4000}
            data-z={0}
            data-scale={3}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3594/3594148.png"
                style={{
                  animation: "rotate 10s ease 1s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                거래소
              </Typography>
            </Box>
          </div>

          <div
            id="challenge-main"
            className="step present"
            data-x={18000}
            data-y={-2000}
            data-z={0}
            data-scale={3}
            style={{
              position: "absolute",
              transform:
                "translate(-50%, -50%) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(3)",
              transformStyle: "preserve-3d",
            }}
          >
            <Box className="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3594/3594114.png"
                style={{
                  animation: "rotate 10s ease 0s infinite normal forwards",
                }}
              />

              <Typography
                fontSize={64}
                fontWeight="bold"
                sx={{
                  mt: 3,
                }}
              >
                창업도전
              </Typography>
            </Box>
          </div> */}

          <div
            id="overview"
            className="step past prev"
            data-x={7000}
            data-y={1000}
            data-scale={20}
            data-z={0}
          ></div>
        </div>
      </div>

      <Box
        sx={{
          pointerEvents: "auto",

          color: "white",
        }}
      >
        <Box
          sx={{
            position: "fixed",

            left: 0,
            top: 0,

            p: 3,
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",

              borderRadius: 1,

              p: 1,

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              width: 300,
            }}
          >
            <Typography
              fontSize={14}
              fontWeight="bold"
              sx={{
                ml: 1,
              }}
            >
              <Language label="브랜드를 만들어볼까요?" />
            </Typography>

            <IconButton
              color="info"
              size="small"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>

          <Collapse in={expanded}>
            <Box
              sx={{
                mt: 1,
              }}
            >
              <BrandingMenu />
            </Box>
          </Collapse>
        </Box>

        <Box
          sx={{
            position: "fixed",

            left: 0,
            bottom: 0,

            p: 3,
          }}
        >
          <ButtonGroup
            color="primary"
            variant="contained"
            size="large"
            sx={{ mt: 1, width: 300, height: 50 }}
          >
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: 1,
              }}
              onClick={() => {
                window.location.href = "/ai-branding/create#/overview";
              }}
              fullWidth
            >
              <Language label="전체보기" />
            </Button>

            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: 1,
              }}
              onClick={() => {
                identityDataStore.updateServiceDataAll(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    name: engineDataStore.brandInfo.name,
                    color_m_rgb: engineDataStore.brandInfo.color.main.rgb,
                    color_m_hex: engineDataStore.brandInfo.color.main.rgb,
                    color_s_rgb: engineDataStore.brandInfo.color.sub.rgb,
                    color_s_hex: engineDataStore.brandInfo.color.sub.rgb,
                    font_family: engineDataStore.brandInfo.fontFamily,
                    logo: engineDataStore.brandInfo.logo,
                    slogan: engineDataStore.brandInfo.slogan,
                    core_value: engineDataStore.brandInfo.coreValue,
                    story: engineDataStore.brandInfo.story,
                    mission: engineDataStore.brandInfo.mission,
                    vision: engineDataStore.brandInfo.vision,

                    innerWebsite: "",
                    websiteUrl: "",
                    description:
                      engineDataStore.brandInfo.serviceMarketing.description,
                    copyrightType: "",
                    applyNo: "",
                    registerNo: "",
                    startDate: "",
                    expireDate: "",
                  },
                );
              }}
              fullWidth
            >
              <Language label="저장하기" />
            </Button>
          </ButtonGroup>
        </Box>

        <>
          <Box
            sx={{
              position: "fixed",

              left: "50%",
              bottom: 0,

              p: 3,

              transform: "translate(-50%, 0%)",
            }}
          >
            <Box
              sx={{
                width: 200,
                height: 50,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",

                fontSize: 14,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <BorderLinearProgress
                  color="secondary"
                  variant="determinate"
                  value={Math.round(
                    (engineDataStore.getPercentage() * 100) / 11,
                  )}
                  sx={{
                    width: "100%",
                    height: 15,

                    borderRadius: "1rem",
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography color="secondary">
                  {Math.round((engineDataStore.getPercentage() * 100) / 11)}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </>

        <Box
          sx={{
            position: "fixed",

            right: 0,
            bottom: 0,

            p: 3,
          }}
        >
          {window.location.href.includes("/ai-branding/create#/intro-main") && (
            <>
              <IntroMain />
            </>
          )}

          {window.location.href.includes("/ai-branding/create#/intro-form") && (
            <>
              <IntroForm />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/intro-produce",
          ) && (
            <>
              <IntroProduce />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/intro-special",
          ) && (
            <>
              <IntroSpecial />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/intro-mission",
          ) && (
            <>
              <IntroMission />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/intro-memory",
          ) && (
            <>
              <IntroMemory />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/intro-image",
          ) && (
            <>
              <IntroImage />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/intro-industry",
          ) && (
            <>
              <IntroIndustry />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/naming-main",
          ) && (
            <>
              <NamingMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/naming-create",
          ) && (
            <>
              <NamingCreate />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/naming-wordlist",
          ) && (
            <>
              <NamingWordList />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/naming-method-number",
          ) && (
            <>
              <NamingMethodNumber />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/vision-main",
          ) && (
            <>
              <VisionMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/vision-create",
          ) && (
            <>
              <VisionCreate />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/vision-ideal",
          ) && (
            <>
              <VisionIdeal />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/vision-tour",
          ) && (
            <>
              <VisionTour />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/mission-main",
          ) && (
            <>
              <MissionMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/mission-goals",
          ) && (
            <>
              <MissionGoals />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/mission-needs",
          ) && (
            <>
              <MissionNeeds />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/mission-story",
          ) && (
            <>
              <MissionStory />
            </>
          )}

          {window.location.href.includes("/ai-branding/create#/story-main") && (
            <>
              <StoryMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/story-create",
          ) && (
            <>
              <StoryCreate />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/story-identity",
          ) && (
            <>
              <StoryIdentity />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/story-three",
          ) && (
            <>
              <StoryThree />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/story-formula",
          ) && (
            <>
              <StoryFormula />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/story-solution",
          ) && (
            <>
              <StorySolution />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/story-detail",
          ) && (
            <>
              <StoryDetail />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/essense-main",
          ) && (
            <>
              <EssenseMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/essense-reason",
          ) && (
            <>
              <EssenseReason />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/slogan-main",
          ) && (
            <>
              <SloganMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/slogan-value",
          ) && (
            <>
              <SloganValue />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/corevalue-main",
          ) && (
            <>
              <CoreValueMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/corevalue-attitude",
          ) && (
            <>
              <CoreValueAttitude />
            </>
          )}

          {window.location.href.includes("/ai-branding/create#/color-main") && (
            <>
              <ColorMain />
            </>
          )}

          {window.location.href.includes("/ai-branding/create#/font-main") && (
            <>
              <FontMain />
            </>
          )}

          {window.location.href.includes("/ai-branding/create#/logo-main") && (
            <>
              <LogoMain />
            </>
          )}

          {window.location.href.includes("/ai-branding/create#/logo-auto") && (
            <>
              <LogoAuto />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/logo-sketch",
          ) && (
            <>
              <LogoSketch />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/logo-upload",
          ) && (
            <>
              <LogoUpload />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/benchmark-main",
          ) && (
            <>
              <BenchmarkMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/benchmark-difference",
          ) && (
            <>
              <BenchmarkDifference />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/benchmark-three",
          ) && (
            <>
              <BenchmarkThree />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/benchmark-rolemodel",
          ) && (
            <>
              <BenchmarkRoleModel />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/benchmark-inspire",
          ) && (
            <>
              <BenchmarkInspire />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/persona-main",
          ) && (
            <>
              <PersonaMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/interior-main",
          ) && (
            <>
              <InteriorMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/package-main",
          ) && (
            <>
              <PackageMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/marketing-main",
          ) && (
            <>
              <MarketingMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/marketing-campaign",
          ) && (
            <>
              <MarketingCampaign />
            </>
          )}

          {/* {window.location.href.includes("/ai-branding/create#/trade-main") && (
            <>
              <TradeMain />
            </>
          )}

          {window.location.href.includes(
            "/ai-branding/create#/challenge-main",
          ) && (
            <>
              <ChallengeMain />
            </>
          )} */}

          <ButtonGroup
            color="primary"
            variant="contained"
            size="large"
            sx={{ mt: 1, width: 300, height: 50 }}
          >
            {window.location.href.includes("/ai-branding/create#/overview") ? (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    impress().next();
                  }}
                  sx={{
                    borderRadius: 1,
                  }}
                  fullWidth
                >
                  <Language label="시작하기" />
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.href = `/creator/brand`;
                  }}
                  sx={{
                    borderRadius: 1,
                  }}
                  fullWidth
                >
                  <Language label="나가기" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    impress().prev();
                  }}
                  sx={{
                    borderRadius: 1,
                  }}
                  fullWidth
                >
                  <Language label="이전" />
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    impress().next();
                  }}
                  sx={{
                    borderRadius: 1,
                  }}
                  fullWidth
                >
                  <Language label="다음" />
                </Button>
              </>
            )}
          </ButtonGroup>
        </Box>
      </Box>
    </>
  ));
}
