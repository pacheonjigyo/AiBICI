import * as React from "react";

import { Box, Paper, useTheme } from "@mui/material";

import { useObserver } from "mobx-react";
import { floatingToast } from "../../../../common/FloatingToast.js";
import { usePageEffect } from "../../../../core/page.js";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";
import Preview from "./Preview.js";

export default function QuestLogo(): JSX.Element {
  const { commonStore, engineStore, engineDataStore } =
    React.useContext(AppContext);

  const theme = useTheme();

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  const stepCreate = ["브랜드 심볼을 완성해주세요."];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      switch (prevActiveStep) {
        case 0: {
          if (engineDataStore.brandInfo.selected.logo < 0) {
            floatingToast(
              commonStore.appInfo.language === "ko"
                ? `${engineDataStore.brandInfo.identity} 로고가 선택되지 않았습니다.`
                : `No ${engineDataStore.brandInfo.identity} Logo selected.`,
              "failed",
              commonStore.isDesktop,
            );

            return prevActiveStep;
          }

          break;
        }

        case 1: {
          if (!engineDataStore.brandInfo.name) {
            floatingToast(
              commonStore.appInfo.language === "ko"
                ? `${engineDataStore.brandInfo.identity} 이름이 입력되지 않았습니다.`
                : `No ${engineDataStore.brandInfo.identity} Name entered.`,
              "failed",
              commonStore.isDesktop,
            );

            return prevActiveStep;
          }

          break;
        }

        case 2: {
          engineStore.setLogoSaveModal(true);
          break;
        }
      }

      if (prevActiveStep < 2) {
        return prevActiveStep + 1;
      } else {
        return prevActiveStep;
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      switch (prevActiveStep) {
        case 1: {
          break;
        }

        default:
          break;
      }

      return prevActiveStep - 1;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: commonStore.baseInfo.height - 110,
          }}
        >
          <Box
            sx={{
              height: commonStore.baseInfo.height - 110,
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: commonStore.isDesktop ? "100%" : "100%",
                  height: commonStore.baseInfo.height,
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Paper
                  sx={{
                    display: engineDataStore.prompts.detailed ? "" : "none",
                    width: "100%",
                    height: commonStore.baseInfo.height,
                    overflowY: "auto",
                  }}
                >
                  <Box
                    sx={{
                      height: commonStore.baseInfo.height - 110,
                    }}
                  >
                    <Preview />
                  </Box>

                  {/* <Box
                    sx={{
                      borderTop: 1,
                      borderColor: "divider",

                      height: 110,

                      p: 3,
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          color="inherit"
                          variant="contained"
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
                        >
                          재생성
                        </Button>

                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                engineStore.setLogoSaveModal(true);
                              }}
                              sx={{
                                width: 180,
                                height: 60,

                                fontSize: 18,
                              }}
                            >
                              저장하기
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box> */}
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  ));
}
