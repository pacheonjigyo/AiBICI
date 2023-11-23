import * as React from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { ParallaxText } from "../../../../common/AutoScroll.js";
import { Language } from "../../../../common/Language.js";
import { AppContext } from "../../../../stores/index.js";

export default function Opening(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const { commonStore, workDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          backgroundImage: `url("/resources/pictures/materials/3D Blender1.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "0% 50%",
          py: 5,
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Box>
              <Container maxWidth="lg">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        lineHeight: 1.4,
                        mb: 3,
                      }}
                      fontSize={24}
                    >
                      <Language label="AiBICI만의 AI 브랜딩으로 당신의 브랜드를 만들어보세요." />
                    </Typography>

                    <Typography
                      color="secondary"
                      sx={{
                        lineHeight: 1.2,

                        mb: 3,
                      }}
                    >
                      <Language label="아래 버튼을 클릭하여 튜토리얼을 수행하세요." />
                    </Typography>

                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        borderRadius: 10,
                        fontSize: 18,
                        minWidth: 200,
                        height: 60,
                      }}
                      onClick={async () => {
                        const url = "/ai-branding/create";

                        const result = await commonStore.syncAppInfo(
                          commonStore.appInfo.isAdmin,
                          true,
                          url,
                        );

                        if (!result) {
                          return;
                        }

                        navigate(url);
                      }}
                    >
                      <Language label="AI 브랜딩 시작하기" />
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: commonStore.isDesktop ? "100%" : "100%",
                overflowX: "hidden",
              }}
            >
              <section>
                <ParallaxText
                  baseVelocity={-1}
                  direction={1}
                  endOffset={-49.5}
                  length={2}
                  scrollRef={null}
                >
                  {workDataStore.openEngineData?.pagination.map((v, i) => {
                    return (
                      <>
                        <Box
                          key={i}
                          sx={{
                            background: "white",
                            // borderRadius: "10px",
                            boxShadow: `0px 3px 7px 0px ${
                              theme.palette.mode === "light"
                                ? "rgba(0,0,0,.1)"
                                : "rgba(255,255,255,.1)"
                            }`,
                            width: commonStore.isDesktop ? 150 : 100,
                            height: commonStore.isDesktop ? 150 : 100,
                            mr: 1,
                          }}
                        >
                          <img
                            src={
                              v.logoAiSelect[0].predictions[
                                v.logoAiSelect[0].selectPredictions
                              ]
                            }
                            style={{
                              // borderRadius: "10px",
                              width: commonStore.isDesktop ? 150 : 100,
                              height: commonStore.isDesktop ? 150 : 100,
                            }}
                            alt={`브랜드이미지${i}`}
                          />
                        </Box>
                      </>
                    );
                  })}
                </ParallaxText>
              </section>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  ));
}
