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

export default function Page6(): JSX.Element {
  const theme = useTheme();

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box sx={{}}>
        <Container
          sx={{
            display: "flex",
            flexDirection: commonStore.isDesktop ? "column" : "column-reverse",
            alignItems: "center",
            justifyContent: commonStore.isDesktop ? "center" : "center",
            position: "relative",

            // mb: 10,
          }}
          maxWidth="lg"
        >
          <Box
            sx={{
              position: "absolute",
              top: 0 - 130,
              left: -40,

              height: 253,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderLeft: "3px solid #8265ff",
                height: "100%",
              }}
            ></div>

            <div
              style={{
                background: "white",
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "5px solid #8265ff",
              }}
            ></div>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          ></Box>

          <Box
            sx={{
              bgcolor: "#f1f1f1",
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",

              borderLeft: 1,
              borderRight: 1,
              borderBottom: 1,
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
                    <span style={{ fontSize: 64, fontWeight: "bold" }}>03</span>
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
                        <span style={{ fontWeight: "bold" }}>나만의 로고</span>{" "}
                        커스텀
                      </>
                    ) : (
                      <>
                        <span style={{ fontWeight: "bold" }}>Customize</span>{" "}
                        Logo
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
                        도출된 결과물을 자유롭게 수정하기,
                        <br />
                        전문가 버전으로 나만의 {"'"}프롬프트{"'"}값을
                        <br />
                        입력하여 특별한 로고를 만들어 보세요!
                      </>
                    ) : (
                      <>
                        Feel free to modify the resulting output,
                        <br />
                        Create a special logo by entering your own {"'"}prompt
                        {"'"} value in the professional version!
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
                        # 결과물 수정
                        <br />
                        # 전문가 서비스
                        <br /># 브랜드 아이덴티티 제공
                      </>
                    ) : (
                      <>
                        # Correction of results
                        <br />
                        # Professional Services
                        <br /># Provide brand identity
                      </>
                    )}
                  </Typography>
                </Box>
              </Grid>

              <Grid
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
                      <source src="/resources/step3.mp4" type="video/mp4" />
                    </video>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: commonStore.isDesktop ? 150 : 100,
                        height: commonStore.isDesktop ? 150 : 100,

                        transform: "translate(+48%, +42%)",
                      }}
                    >
                      <img src="/resources/spray.svg" />
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
