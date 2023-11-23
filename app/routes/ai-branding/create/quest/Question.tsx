import * as React from "react";
import Image from "../../../../common/Image.js";
import LogoSaveModal from "../../../../layout/modal/LogoSaveModal.js";

import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Refresh,
} from "@mui/icons-material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { floatingToast } from "../../../../common/FloatingToast.js";
import { usePageEffect } from "../../../../core/page.js";
import { wordList } from "../../../../data/words.js";
import { TipPopOver } from "../../../../layout/popover/TipPopOver.js";
import { AppContext } from "../../../../stores/index.js";
import QuestCategory from "./Category.js";
import QuestLogo from "./Logo.js";
import QuestName from "./Name.js";
import QuestSymbol from "./Symbol.js";
import QuestWork from "./Work.js";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {},
  [`& .${linearProgressClasses.bar}`]: {},
}));

export default function Question(): JSX.Element {
  const navigate = useNavigate();
  const theme = useTheme();
  const tipRef = React.useRef(null);

  const { commonStore, engineDataStore, engineStore } =
    React.useContext(AppContext);

  usePageEffect({
    title: wordList["새 브랜드 만들기"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    engineDataStore.setBrandingType("quest");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = [
    "",
    wordList["브랜드명 입력하기"][commonStore.appInfo.language],
    wordList["브랜드 심볼 만들기"][commonStore.appInfo.language],
    wordList["브랜드 업종 입력하기"][commonStore.appInfo.language],
    wordList["브랜드 스타일 정하기"][commonStore.appInfo.language],
    wordList["브랜드 완성하기"][commonStore.appInfo.language],
  ];

  const onPrevious = () => {
    if (engineStore.step === 1) {
      navigate("/ai-branding/create");

      return;
    }

    engineStore.setStep(engineStore.step - 1);
  };

  const onNext = async () => {
    switch (engineStore.step) {
      case 0: {
        if (!engineDataStore.brandingType) {
          floatingToast(
            "브랜딩 방법을 선택해주세요.",
            "failed",
            commonStore.isDesktop,
          );

          return;
        }

        break;
      }

      case 1: {
        if (
          !engineDataStore.brandInfo.disableName &&
          !engineDataStore.brandInfo.name
        ) {
          floatingToast(
            commonStore.appInfo.language === "ko"
              ? `${engineDataStore.brandInfo.identity} 이름이 입력되지 않았습니다.`
              : `No ${engineDataStore.brandInfo.identity} Name entered.`,
            "failed",
            commonStore.isDesktop,
          );

          return;
        }

        break;
      }

      case 2: {
        engineStore.setSymbolSettingModal(true);

        return;
      }

      case 3: {
        if (!engineDataStore.brandInfo.industry["Industry"]) {
          floatingToast(
            commonStore.appInfo.language === "ko"
              ? `${engineDataStore.brandInfo.identity} 업종이 입력되지 않았습니다.`
              : `${engineDataStore.brandInfo.identity} Industry has not been entered.`,
            "failed",
            commonStore.isDesktop,
          );

          return;
        }

        break;
      }

      case 4: {
        if (
          (engineDataStore.brandInfo.workOwn &&
            !engineDataStore.brandInfo.description) ||
          (!engineDataStore.brandInfo.workOwn &&
            !engineDataStore.brandInfo.special.name)
        ) {
          floatingToast(
            commonStore.appInfo.language === "ko"
              ? `${engineDataStore.brandInfo.identity} 특징이 입력되지 않았습니다.`
              : `No ${engineDataStore.brandInfo.identity} Features entered.`,
            "failed",
            commonStore.isDesktop,
          );

          return;
        }

        const response = await engineDataStore.getIdentity(
          null,
          false,
          "all",
          true,
        );

        if (!response) {
          return;
        }

        engineStore.setFloatingTips(true);
        engineStore.setLogoStep(0);

        break;
      }

      default:
        break;
    }

    engineStore.setKeypadOpen(false);
    engineStore.setStep(engineStore.step + 1);
  };

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: engineDataStore.isEngineBusy ? "none" : "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: commonStore.baseInfo.height,
          }}
        >
          {engineDataStore.isEngineBusy ? null : (
            <>
              <Box
                sx={{
                  width: "100%",
                  height: commonStore.isDesktop
                    ? commonStore.baseInfo.height - 110
                    : commonStore.baseInfo.height -
                      (engineStore.isKeypadOpen ? 0 : 110),
                  position: "relative",
                }}
              >
                {engineStore.step === 1 ? <QuestName /> : null}
                {engineStore.step === 2 ? <QuestSymbol /> : null}
                {engineStore.step === 3 ? <QuestCategory /> : null}
                {engineStore.step === 4 ? <QuestWork /> : null}
                {engineStore.step === 5 ? <QuestLogo /> : null}
              </Box>

              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  width: "100%",
                  height: 110,
                  animation: commonStore.isDesktop
                    ? "unset"
                    : engineStore.isKeypadOpen
                    ? "exit-reverse 0.5s ease 0s 1 normal forwards"
                    : "entrance-reverse 0.5s ease 0s 1 normal forwards",
                }}
              >
                <Box
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    // boxShadow: `0 -4px 18px 0 ${
                    //   theme.palette.mode === "light"
                    //     ? "rgba(0,0,0,.1)"
                    //     : "rgba(255,255,255,.1)"
                    // }`,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    width: "100%",
                    height: "100%",

                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: commonStore.isDesktop ? "40%" : "40%",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "left",
                    }}
                  >
                    {engineStore.step > 0 ? (
                      <Button
                        disabled={engineStore.step < 1}
                        color="inherit"
                        sx={{
                          fontSize: commonStore.isDesktop ? 18 : 12,
                          width: commonStore.isDesktop
                            ? 180
                            : commonStore.device === "tablet"
                            ? 150
                            : 50,
                          height: commonStore.isDesktop ? 60 : 40,
                          m: 0.5,
                          p: 0,
                        }}
                        onClick={onPrevious}
                        startIcon={<KeyboardArrowLeft />}
                      >
                        {commonStore.appInfo.language === "ko"
                          ? "이전"
                          : "Previous"}
                      </Button>
                    ) : null}
                  </Box>

                  <Box
                    sx={{
                      width: commonStore.isDesktop ? "20%" : "20%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {engineStore.step > 0 ? (
                      <Typography
                        sx={{
                          fontSize: commonStore.isDesktop ? 16 : 12,
                          p: 1,
                        }}
                      >
                        {engineStore.step} / {steps.length - 1}
                      </Typography>
                    ) : null}
                  </Box>

                  <Box
                    sx={{
                      width: commonStore.isDesktop ? "40%" : "40%",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "right",
                    }}
                  >
                    {engineStore.step < steps.length - 1 ? (
                      <Button
                        disabled={engineDataStore.isEngineBusy}
                        color="secondary"
                        sx={{
                          fontSize: commonStore.isDesktop ? 18 : 12,
                          width: commonStore.isDesktop
                            ? 180
                            : commonStore.device === "tablet"
                            ? 150
                            : 50,
                          height: commonStore.isDesktop ? 60 : 40,
                          m: 0.5,
                          p: 0,
                        }}
                        onClick={onNext}
                        endIcon={<KeyboardArrowRight />}
                      >
                        {engineDataStore.isEngineBusy ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress
                              color="secondary"
                              size={commonStore.isDesktop ? "1.5rem" : "1rem"}
                            />
                          </Box>
                        ) : engineStore.step === steps.length - 2 ? (
                          commonStore.appInfo.language === "ko" ? (
                            "생성하기"
                          ) : (
                            "Generate"
                          )
                        ) : engineStore.step > 0 ? (
                          commonStore.appInfo.language === "ko" ? (
                            "다음"
                          ) : (
                            "Next"
                          )
                        ) : (
                          "START"
                        )}
                      </Button>
                    ) : (
                      <Button
                        color="inherit"
                        onClick={async () => {
                          const response = await engineDataStore.getIdentity(
                            null,
                            false,
                            "all",
                            true,
                          );

                          if (!response) {
                            return;
                          }

                          engineStore.setFloatingTips(true);
                          engineStore.setLogoStep(0);
                        }}
                        sx={{
                          width: 180,
                          height: 60,

                          fontSize: 18,
                        }}
                        endIcon={<Refresh />}
                      >
                        재생성
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {engineDataStore.isEngineBusy ? (
        <>
          <Box
            sx={{
              position: "fixed",
              left: "50%",
              top: "50%",
              width: commonStore.isDesktop ? "50%" : "100%",
              // height: 110,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

              transform: "translate(0%, -50%)",
            }}
          >
            <Image
              id="loading-test"
              src="/resources/loading.gif"
              height={commonStore.isDesktop ? 400 : 300}
              alt="로딩이미지"
            />

            <Typography
              sx={{
                mb: 3,
                fontSize: 24,
                fontWeight: "bold",
              }}
              align="center"
            >
              {engineDataStore.engineProcessed > 90
                ? "조금만 더 기다려주세요."
                : "브랜드 아이덴티티를 만들고 있어요."}
            </Typography>

            <BorderLinearProgress
              color="secondary"
              variant="determinate"
              value={engineDataStore.engineProcessed}
              sx={{
                width: commonStore.isDesktop ? 300 : 150,
                height: 30,

                borderRadius: "1rem",
              }}
            />
          </Box>
        </>
      ) : null}

      <LogoSaveModal />
      <TipPopOver tipRef={tipRef} />
    </>
  ));
}
