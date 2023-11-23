import * as React from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { AppContext } from "../../../../stores/index.js";

export default function Page4(): JSX.Element {
  const theme = useTheme();

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={
          {
            // background: "#f1f1f1",
            // mt: 10,
          }
        }
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: commonStore.isDesktop ? "column" : "column-reverse",
            // alignItems: "center",
            justifyContent: commonStore.isDesktop ? "center" : "center",
            position: "relative",
          }}
          maxWidth="lg"
        >
          {/* <Typography
            sx={{
              lineHeight: 1.2,
              zIndex: 10,
              mb: 3,
            }}
            align="center"
            fontSize={commonStore.isDesktop ? 40 : 20}
            fontWeight="bold"
          >
            브랜드를 완성하고 성장시켜보세요.
          </Typography> */}

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: -40,

              height: 635 - 215,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "4px solid #8265ff",
              }}
            ></div>

            <div
              style={{
                borderLeft: "3px solid #8265ff",
                height: "100%",
              }}
            ></div>
          </Box>

          <Box
            sx={{
              background: "#f1f1f1",

              borderLeft: 1,
              borderRight: 1,
              borderColor: "divider",

              // border: 1,
              // borderColor: "divider",

              px: 10,
              py: 5,
            }}
          >
            <Grid container>
              <Grid
                item
                xs={commonStore.device === "mobile" ? 12 : 6}
                sx={{
                  m: "auto",
                }}
              >
                <Box
                  sx={{
                    textAlign: commonStore.isDesktop ? "left" : "center",
                    paddingBottom: commonStore.isDesktop ? 0 : "10px",
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "42px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    color="secondary"
                    fontSize={18}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    <span style={{ fontWeight: "bold" }}>STEP</span>{" "}
                    <span style={{ fontSize: 64, fontWeight: "bold" }}>01</span>
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: 1.2,
                      mb: "34px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    fontSize={commonStore.isDesktop ? 40 : 40}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        <span style={{ fontWeight: "bold" }}>브랜드 이름</span>{" "}
                        입력
                      </>
                    ) : (
                      <>
                        Enter{" "}
                        <span style={{ fontWeight: "bold" }}>Brand Name</span>
                      </>
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#8f8f8f",
                      lineHeight: 1.4,
                      mb: "24px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    fontSize={commonStore.isDesktop ? 20 : 16}
                    fontWeight={400}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        나만의 브랜드의 이름을 입력하고
                        <br />
                        Ai를 통해 무료로 특별한 로고를 생성하세요.
                      </>
                    ) : (
                      <>
                        Enter the name of your own brand and
                        <br />
                        create a special logo for free through Ai.
                      </>
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      lineHeight: 1.4,
                      mb: "42px",
                    }}
                    align={commonStore.isDesktop ? "left" : "center"}
                    color="#8265FF"
                    fontSize={commonStore.isDesktop ? 16 : 14}
                    fontWeight={500}
                    data-aos="fade"
                    data-aos-duration={1000}
                  >
                    {commonStore.appInfo.language === "ko" ? (
                      <>
                        # 네이밍 변경가능
                        <br />
                        # 무료 서비스
                        <br /># 간소화 서비스
                      </>
                    ) : (
                      <>
                        # Naming can be changed
                        <br />
                        # Free service
                        <br /># Simplified Services
                      </>
                    )}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={commonStore.device === "mobile" ? 12 : 6}
                sx={{
                  m: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      commonStore.device === "mobile" ? "center" : "right",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    p: 3,
                  }}
                  data-aos="fade-up"
                  data-aos-duration={1000}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      width: "90%",
                      p: 3,
                      borderRadius: "1rem",
                      boxShadow: `0px 3px 7px 0px ${
                        theme.palette.mode === "light"
                          ? "rgba(0,0,0,.1)"
                          : "rgba(255,255,255,.1)"
                      }`,
                      position: "relative",
                    }}
                  >
                    <video autoPlay loop muted playsInline width={"100%"}>
                      <source src="/resources/step1.mp4" type="video/mp4" />
                    </video>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: commonStore.isDesktop ? 150 : 100,
                        height: commonStore.isDesktop ? 150 : 100,

                        transform: "translate(-50%, 20%)",
                      }}
                    >
                      <img src="/resources/filament.svg" />
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  ));
}
